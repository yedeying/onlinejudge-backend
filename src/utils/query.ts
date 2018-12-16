export const parseSql = (sql: string) => {
  return sql.replace(/ +/g, ' ');
};
