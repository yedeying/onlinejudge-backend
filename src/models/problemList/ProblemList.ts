import BaseValidator from '../../lib/validator';
import { IProblemPage, IProblemListItem } from '../../common/types';
import { allVolumes, problemListByPage } from '../../common/queries';
import * as utils from './utils';

class Validator extends BaseValidator {
  pageNo(pageNo: string) {
    this.assert(/^[A-Z]{1,2}$/.test(pageNo), 'expect pageNo to be a string');
  }
}

export default class ProblemList {
  private validator = new Validator();

  async getNoList(): Promise<IProblemPage[]> {
    const volumes = await allVolumes();
    return volumes.map(volume => {
      const no = utils.numToAlpha(volume);
      return {
        id: no,
        title: no
      };
    });
  }

  async getProblemListByPage(pageNo: string): Promise<IProblemListItem[]> {
    this.validator.pageNo(pageNo);
    const volume = utils.alphaToNum(pageNo);
    const problemList = await problemListByPage(volume);
    return problemList;
  }
}
