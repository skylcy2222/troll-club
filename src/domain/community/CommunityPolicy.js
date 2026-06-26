class CommunityPolicy {
  validateName(name) {
    if (!name || String(name).trim().length < 2) {
      throw new Error("커뮤니티 이름이 너무 짧습니다.");
    }
  }

  validateDescription(description) {
    if (description != null && String(description).length > 200) {
      throw new Error("설명은 200자 이하로 입력하세요.");
    }
  }
}

module.exports = CommunityPolicy;