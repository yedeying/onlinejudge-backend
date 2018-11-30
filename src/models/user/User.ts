import * as patterns from '$regexp';
import * as queries from '$queries';
import { ReqBody, ILoginInfo, IRegisterInfo } from '$types';
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
    return true;
  }

  registerInfo(registerInfo: ReqBody): registerInfo is IRegisterInfo {
    if (!registerInfo) {
      return false;
    }
    this.username(registerInfo.username);
    this.password(registerInfo.password);
    if (registerInfo.email) {
      this.email(registerInfo.email);
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

  register(registerInfo: ReqBody) {
    if (!this.validator.registerInfo(registerInfo)) {
      return {};
    }
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
