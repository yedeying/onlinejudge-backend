import * as patterns from '$regexp';
import * as queries from '$queries';
import { ReqBody, ILoginInfo } from '$types';
import BaseValidator from '$lib/validator';

class Validator extends BaseValidator {
  username(username: string) {
    return this.assert(patterns.username.test(username), 'username invalid');
  }

  password(password: string) {
    return this.assert(patterns.password.test(password), 'password invalid');
  }

  email(email: string) {
    return this.assert(patterns.email.test(email), 'email format invalid');
  }

  uid(id: string) {
    return this.assert(patterns.uuid.test(id), 'user id invalid');
  }

  loginInfo(loginInfo: ReqBody): loginInfo is ILoginInfo {
    if (!loginInfo) {
      return false;
    }
    this.username(loginInfo.username);
    this.password(loginInfo.password);
    if (loginInfo.email) {
      this.email(loginInfo.email);
    }
    return true;
  }
}

export default class User {
  private validator = new Validator();

  static hashPassword(password: string, salt: string) {
    return password + salt;
  }

  login(loginInfo: ReqBody) {
    if (!this.validator.loginInfo(loginInfo)) {
      return {};
    }
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
