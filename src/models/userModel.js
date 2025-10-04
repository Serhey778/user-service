const bcrypt = require('bcryptjs');

class User {
  constructor(data) {
    this.fullName = data.fullName || 'fullName';
    this.dateOfBirth = data.dateOfBirth || 'dateOfBirth';
    this.email = data.email;
    this.password = data.password;
    this.isActive = data.status || true;
    this.role = data.role || 'user';
  }
  // функция хэширует пароль
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}

module.exports = User;
