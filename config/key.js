if (process.env.NODE_ENV === "production") { // 개발환경이 production : 배포를 하는 상황 아마존에서 돌아갔을 때 이 모듈은 prod를 export / 아니면 로컬환경일 경우 dev.js export한다
    module.exports = require("./prod");
  } else {
    module.exports = require("./dev");
  }

  // key 보호