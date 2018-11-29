import { parseProblemId } from './utils';
import BaseValidator from '$lib/validator';
import * as patterns from '$regexp';
import * as queries from '$queries';
import { IProblem, IProblemNo, IProblemId } from '$types';
import { FakeError, ErrorCode, StatusCode } from '$constants';

class Validator extends BaseValidator {
  problemNo(problemNo: string): problemNo is IProblemNo {
    return this.assert(patterns.problemNo.test(problemNo), 'problemId should looks like A00');
  }

  problemId(problemId: IProblemId | null): problemId is IProblemId {
    return this.assert(Boolean(problemId), 'problemId could not fould', {
      code: ErrorCode.OK, statusCode: StatusCode.OK
    });
  }

  problemDetail(problemDetail: IProblem | null): problemDetail is IProblem {
    return this.assert(Boolean(problemDetail), 'could not fould problem');
  }
}

export default class ProblemDetail {
  private validator = new Validator();

  async getProblemDetail(problemNo: string): Promise<IProblem> {
    this.validator.problemNo(problemNo);
    const problemId = await parseProblemId(problemNo);
    if (!this.validator.problemId(problemId)) {
      throw FakeError;
    }
    const problemDetail = await queries.problemDetail(problemId);
    if (!this.validator.problemDetail(problemDetail)) {
      throw FakeError;
    }
    return problemDetail;
  }
}
