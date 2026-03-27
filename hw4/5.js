class Contact {
  constructor(name, email, phone = "") {
    this.name = name;
    this._email = "";
    this._phone = "";
    this.setEmail(email);
    this.setPhone(phone);
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  static validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static validatePhone(phone) {
    const phoneRegex = /^[\d\s\-+()]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 8;
  }

  setEmail(email) {
    if (Contact.validateEmail(email)) {
      this._email = email;
      this.updatedAt = new Date();
      return true;
    }
    return false;
  }

  setPhone(phone) {
    if (phone === "" || Contact.validatePhone(phone)) {
      this._phone = phone;
      this.updatedAt = new Date();
      return true;
    }
    return false;
  }

  getEmail() {
    return this._email;
  }

  getPhone() {
    return this._phone;
  }

  updateEmail(newEmail) {
    if (this.setEmail(newEmail)) {
      console.log(`✓ Email 更新成功: ${this._email}`);
    } else {
      console.error("✗ 無效的 Email 格式");
    }
  }

  toObject() {
    return {
      name: this.name,
      email: this._email,
      phone: this._phone,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString()
    };
  }
}

const contact = new Contact("Leo", "leo@test.com", "0912345678");
console.log("初始資料:", contact.toObject());
contact.updateEmail("new_leo@example.com");
contact.updateEmail("invalid-email");
contact.setPhone("0988-123-456");
console.log("更新後資料:", contact.toObject());