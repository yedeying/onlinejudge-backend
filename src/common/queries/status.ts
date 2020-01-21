import { IStatus, ISearchOption, IQueryParams } from '$types';
import { tables } from '$config/db';
import { queryAll } from './utils';
import { omit } from 'lodash-es';
import { formatNo, alphaToNum } from '$models/problemList/utils';
import { fetchUserByName } from './user';
import { EMPTY_RESULT } from '$constants';
import { problemIdFromNo } from './problem';

export const statusList = queryAll<IStatus, [ISearchOption, number, number]>(
  async (searchOption, page = 0, pageSize = 50) => {
    const { username, status, problemNo } = searchOption;
    const where: { key: string; value: string | number }[] = [];
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
    const res: IQueryParams<IStatus> = {
      sql: [
        `select {fields} from ?? ${whereSql} a`,
        'left join ?? b on a.userId = b.id',
        'left join ?? c on a.problemId = c.id',
        'order by a.createdAt desc, a.id * 1 desc limit ?, ?'
      ].join(' '),
      fields: [
        'a.id',
        'userId',
        'username',
        'volume',
        'number',
        'title',
        'status',
        'usedTime',
        'usedMemory',
        'language',
        'ip',
        'a.createdAt',
        'a.updatedAt',
        'judgedAt'
      ],
      params: [
        tables.status,
        tables.user,
        tables.problem,
        ...where.map(cond => cond.value),
        page * pageSize, pageSize
      ],
      mapper: row => ({
        ...omit(row, ['volume', 'number']) as any,
        problemNo: formatNo(row.volume, row.number)
      })
    };
    return res;
  }
);
