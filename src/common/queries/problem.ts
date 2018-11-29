import { IProblemId, IVolume, IProblemOrder, IProblem, IProblemListItem } from '$types';
import { tables } from '$config/db';
import { formatNo } from '$models/problemList/utils';
import { queryAll, queryOne } from './utils';

export const allVolumes = queryAll<IVolume>(() => ({
  sql: 'select distinct volume from ?? order by volume',
  params: [tables.problem],
  pick: 'volume'
}));

export const problemListByPage = queryAll<IProblemListItem, [IVolume]>(volume => ({
  sql: 'select {fields} from ?? where volume = ? order by number',
  params: [tables.problem, volume],
  fields: ['id', 'title', 'volume', 'number', 'tags'],
  mapper: row => ({
    ...row,
    no: formatNo(row.volume, row.number),
    tags: row.tags.split(',').filter((x: string) => x)
  })
}));

export const problemIdFromNo = queryOne<IProblemId, [IVolume, IProblemOrder]>((volume, no) => ({
  sql: 'select * from ?? where volume = ? and number = ?',
  params: [tables.problem, volume, no],
  pick: 'id'
}));

export const problemDetail = queryOne<IProblem, [IProblemId]>(problemId => ({
  sql: 'select * from ?? where id = ?',
  params: [tables.problem, problemId],
  mapper: row => ({
    ...row,
    no: formatNo(row.volume, row.number),
    tags: row.tags.split(',').filter((x: string) => x)
  })
}));
