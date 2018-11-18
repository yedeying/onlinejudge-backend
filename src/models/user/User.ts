import * as patterns from '../../common/regexp';
import * as queries from '../../common/queries';
import BaseValidator from '../../lib/validator';

class Validator extends BaseValidator {
  username(username: string) {
    return this.assert(patterns.username.test(username), 'username invalid');
  }

  uid(id: string) {
    return this.assert(patterns.uuid.test(id), 'user id invalid');
  }
}

export default class User {
  private validator = new Validator();

  static hashPassword(password: string, salt: string) {
    return password + salt;
  }

  login() {
    return {};
  }

  register() {
    return {};
  }

  async getUserByName(username: string) {
    this.validator.username(username);
    const user = await queries.fetchUserByName(username);
    return user;
  }

  async getUserById(id: string) {
    this.validator.uid(id);
    const user = await queries.fetchUserById(id);
    return user;
  }
}
