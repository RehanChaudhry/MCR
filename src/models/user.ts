class User {
  firstName?: string;
  lastName?: string;
  roleTitle?: string;
  profilePicture?: null;

  constructor(user: User) {
    Object.assign(this, user);
  }
}

export default User;
