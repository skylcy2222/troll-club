class PasswordPolicy {
  validate(password) {
    if (typeof password !== "string" || password.length < 8) {
      throw new Error("비밀번호는 8자 이상이어야 합니다.");
    }

    if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) {
      throw new Error("비밀번호에는 영문자와 숫자가 모두 필요합니다.");
    }
  }
}

module.exports = PasswordPolicy;