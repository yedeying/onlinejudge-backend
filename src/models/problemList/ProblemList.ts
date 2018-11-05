import query from '../../lib/db';
import Validator from '../../lib/validator';
import { tables } from '../../config/db';
import * as utils from './utils';

type UUID = string;

export interface ProblemListItem {
  id: UUID;
  no: string;
  title: string;
  volume: number;
  number: number;
  tags: string[];
  createAt: Date;
  updatedAt: Date;
}

export interface ProblemDetail {
  description: string;
  timeLimit: number;
  memoryLimit: number;
  judger: UUID;
  dataSet: UUID;
}

export interface ProblemPage {
  id: string;
  title: string;
}

export interface Problem extends ProblemListItem, ProblemDetail {}

export default class ProblemList {
  private validator = new Validator();

  async getNoList(): Promise<ProblemPage[]> {
    const volumes: { volume: number }[] = await query(
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

  async getProblemListByPage(pageId: string): Promise<ProblemListItem[]> {
    this.validator.pageId(pageId);
    const volume = utils.alphaToNum(pageId);
    const fields: (keyof ProblemListItem)[] = ['id', 'title', 'volume', 'number', 'tags'];
    const res = await query(`select ${fields.join(', ')} from ?? where volume = ?`, [tables.problem, volume]);
    return res.map(row => ({
      ...row,
      no: utils.formatNo(row.volume, row.number),
      tags: row.tags.split(',').filter((x: string) => x)
    }));
  }
}
