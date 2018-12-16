import { IStatus, ISearchOption } from '$types';
import { tables } from '$config/db';
import { queryAll } from './utils';
import { fetchUserByName } from './user';
import { EMPTY_RESULT } from '$constants';
import { problemIdFromNo } from './problem';
import { alphaToNum } from '$models/problemList/utils';

export const statusList = queryAll<IStatus, [ISearchOption, number, number]>(
  async (searchOption, page = 0, pageSize = 50) => {
    const { username, status, problemNo } = searchOption;
    const where: { key: string, value: string | number }[] = [];
    if (username) {
      const user = await fetchUserByName(username);
      if (!user) {
        return EMPTY_RESULT;
      }
      where.push({
        key: 'userId',
        value: user.id
      });
    }
    if (status) {
      where.push({
        key: 'status',
        value: status
      });
    }
    if (problemNo) {
      const volume = alphaToNum(problemNo.slice(0, -2));
      const number = parseInt(problemNo.slice(2), 10);
      const problemId = await problemIdFromNo(volume, number);
      if (!problemId) {
        return EMPTY_RESULT;
      }
      where.push({
        key: 'problemId',
        value: problemId
      });
    }

    const whereSql = where.length ? where.map(cond => `${cond.key} = ?`).join(' and ') : '';
    return {
      sql: `select * from ?? ${whereSql} order by createdAt desc limit ?, ?`,
      params: [tables.status, ...where.map(cond => cond.value), page * pageSize, pageSize]
    };
  }
);
