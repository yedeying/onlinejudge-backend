import BaseValidator from '$lib/validator';
import { IProblemPage, IProblemListItem } from '$types';
import { allVolumes, problemListByPage } from '$queries';
import * as utils from './utils';

class Validator extends BaseValidator {
  pageNo(pageNo: string) {
    this.assert(/^[A-Z]{1,2}$/.test(pageNo), 'expect pageNo to be a string');
  }
}

export default class ProblemList {
  private validator = new Validator();

  async getPageList(): Promise<IProblemPage[]> {
    const volumes = await allVolumes();
    return volumes.map(volume => {
      const page = utils.numToAlpha(volume);
      return {
        id: page,
        text: page
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
