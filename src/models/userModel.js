const bcrypt = require('bcryptjs');

class User {
  constructor(data) {
    this.fullName = data.fullName;
    this.dateOfBirth = data.dateOfBirth;
    this.email = data.email;
    this.password = data.password;
    this.role = data.role || 'user';
    this.status = data.status || true;
  }
  // функция хэширует пароль
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}

module.exports = User;
