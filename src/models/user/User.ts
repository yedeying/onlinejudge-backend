import * as patterns from '$regexp';
import * as queries from '$queries';
import * as uuid from 'uuid/v4';
import { ReqBody, IUser, IRegisterInfo } from '$types';
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

  user(user: IUser | null): user is null {
    return this.assert(!user, 'username has been registered');
  }

  registerInfo(registerInfo: ReqBody): registerInfo is Omit<IRegisterInfo, 'salt'> {
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

  async register(registerInfo: ReqBody, login: (user: IUser) => Promise<void>) {
    if (!this.validator.registerInfo(registerInfo)) {
      return {};
    }
    const { username, password, email } = registerInfo;
    const user = await this.getUserByName(username);
    this.validator.user(user);

    const salt = uuid();
    const hashedPassword = User.hashPassword(password, salt);
    const res = await queries.addUser({
      username,
      password: hashedPassword,
      email,
      salt
    });
    const { data } = res;
    const insertId = data.id as string;
    if (insertId) {
      const user = await this.getUserById(insertId);
      if (user) {
        await login(user);
      }
    }
    return 'Register successfully';
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
