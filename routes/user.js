var router = require("express").Router(); // app 그대로 쓰면 안됨 express에서 서버에 routing을 분리하는 작업

const { User } = require("../model/User.js"); // 모델 import 

router.post("/register", (req, res) => { // /api/user 이거 빼면 알아서 index.js에서 붙여줌
    let temp = req.body; // 임시 변수 만들기
    const NewUser = new User(temp); // 위 import한 model 객체, user의 값은 temp에 --> create
    NewUser.save().then((userData) => { // 성공한 userData save된 useData doc가 들어감
        return res.status(200).send({
            success: true,
            userInfo: userData,
        });
    }).catch((err) => { 
        return res.status(400).send({
            success: false,
            err,
        }); // 서버 깨진 코드 json 대신 send해도됨
    }) // mongodb에 저장
});

router.post("/login", (req, res) => {
    let userInputEmail = req.body.email;
    let userInputPassword = req.body.password;
    // 1. 사용자가 입력한 이메일이 우리 DB에 저장되어 있는가?
    User.findOne({email: userInputEmail}).exec().then((doc) => { // 같은 거 찾아서 출력 다르면 null 값 나옴
        // 인자로 쿼리문을 통해 찾고자 하는 것 넣는다.
        let message="";
        if(doc === null) {
            message = "회원가입된 ID가 없습니다.";
            return res.status(200).send({ // 400 번 코드 보내면 바로 클라이언트 다운됨 유저에게 어떤 정보가 잘못됐늕 알려주기 위해 400대신 200으로
                success: false,
                message: message,
            });
        } else if(doc.password != userInputPassword) {
            // 2. 저장되어 있다면, 사용자가 입력한 비밀번호가 DB에 저장된 비밀번호랑 똑같은가?
            message = "비밀번호가 일치하지 않습니다.";
            return res.status(200).send({
                success: false,
                message: message,
            });
        } else {
            return res.status(200).send({
                success: true,
                userInfo: doc,
            });
        }
    }).catch((err) => { // 서버 터지는 경우
        return res.status(400).send({
            success: false,
            err,
        });
    });
});
module.exports = router;