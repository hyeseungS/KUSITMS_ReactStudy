const mongoose = require("mongoose");
// mongoose 불러오기

// Schema는 model의 어떠한 key-value 들어가는지 정의
const userSchema = mongoose.Schema(
  {
    email: { // key 들어가는 값 규칙(type : Number 될 수 있다)
      type: String,
      trim: true, // 공백 없을때 없어도됨
      index: true, // 무시 가능 없어도됨
      unique: true, // mogodb collection에서 email은 혼자 unique해야함 중복있으면 안됨
      required: true, // 이 값이 바뀔 수 있어야한다. ID/PW안적으면 에러나도록
    },
    password: {
      type: String,
      index: true,
      required: true,
    },
    name: {
      type: String,
      index: true,
      required: true,
    },
  },
  { collection: "User" } // 위 doc가 User라는 collection에 저장할거다!
);

// 위 Schema 가지고 model 만들기
const User = mongoose.model("User", userSchema);
module.exports = { User }; // user를 다른데서도 쓸수있도록 하기 위해 index.js에서 사용