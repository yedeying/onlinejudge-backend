import { initDb } from '../../lib/db';
import Validator from '../../lib/validator';
import { tables } from '../../config/db';
import * as utils from './utils';

type UUID = string;

export interface Problem {
  id: UUID;
  no: string;
  title: string;
  description: string;
  timeLimit: number;
  memoryLimit: number;
  judger: UUID;
  volume: number;
  tags: string[];
  dataSet: UUID;
  createAt: Date;
  updatedAt: Date;
}

export default class ProblemList {
  private db = initDb();

  private validator = new Validator();

  async getNoList() {
    const volumes: { volume: number }[] = await this.db.query(
      'select distinct volume from ?? order by volume', [tables.problem]
    );
    return volumes.map(({ volume }) => {
      const no = utils.numToAlpha(volume);
      return {
        id: no,
        title: no
      };
    });
  }

  async getProblemListByPage(pageId: string) {
    this.validator.pageId(pageId);
    const volume = utils.alphaToNum(pageId);
    const res = await this.db.query('select * from ?? where volume = ?', [tables.problem, volume]);
    const problems = res.map(row => ({
      ...row,
      no: utils.formatNo(row.volume, row.number),
      tags: row.tags.split(',').filter((x: string) => x)
    }));
    return problems;
  }
}
