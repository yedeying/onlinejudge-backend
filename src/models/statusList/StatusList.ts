import { ISearchOption } from '$types';
import ValidatorBase from '$lib/validator';
import { statusList } from '$queries/status';

class Validator extends ValidatorBase {
  searchOption(searchOption: any): searchOption is ISearchOption {
    return this.assert(typeof searchOption === 'object', 'search option is invalid');
  }

  pageNum(pageNum: any): pageNum is number {
    return this.assert(
      typeof pageNum === 'number' && pageNum >= 0,
      'page number is invalid number'
    );
  }

  pageSize(pageSize: any): pageSize is number {
    return this.assert(
      typeof pageSize === 'number' && pageSize >= 5 && pageSize <= 100,
      'page size must in range 5, 100'
    );
  }
}

export default class StatusList {
  private validator = new Validator();

  async getStatusList(searchOption: any = {}, pageNum: any = 0, pageSize: any = 50) {
    if (
      !this.validator.searchOption(searchOption) ||
        !this.validator.pageNum(pageNum) ||
        !this.validator.pageSize(pageSize)
    ) {
      return [];
    }
    const list = await statusList(searchOption, pageNum, pageSize);
    return list;
  }
}
