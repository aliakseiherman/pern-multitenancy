import UserService from "../services/user.service";

class UserSeed {
  public userService: UserService = new UserService();

  public async seed(): Promise<void> {

    const users = [{ username: 'admin', password: '123qwe' }];

    for (let user of users) {
      let exists = await this.userService.exists(user.username);
      if (!exists) {
        await this.userService.create(user);
      }
    }
  }
}

export default UserSeed;