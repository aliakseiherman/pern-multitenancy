import UserService from "../services/user.service";

class UserSeed {
  public userService: UserService = new UserService();

  public async seed(): Promise<void> {
    [{ username: 'admin', password: '123qwe' }].forEach(async (input, i) => {
      let exists = await this.userService.exists(input.username);
      if (!exists) {
        await this.userService.create(input);
      }
    });
  }
}

export default UserSeed;