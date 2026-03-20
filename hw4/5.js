const contact = {
  name: "Leo",
  email: "leo@test.com",
  updateEmail(newEmail) {
    if (newEmail.includes("@")) {
      this.email = newEmail;
      console.log("Email 更新成功");
    } else {
      console.error("無效的 Email 格式");
    }
  }
};
contact.updateEmail("new_leo@example.com");