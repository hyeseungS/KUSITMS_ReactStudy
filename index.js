const express = require("express");
// js 서버
const path = require("path");
// dir 상대경로 쉽게
const cors = require("cors");
// server : 5000
// client : 3000(리액트)
// 3000번에서 온거를 5000번포트가 받아야함 이를 위해 cors 사용
const mongoose = require("mongoose");
// mongoose 사용위해 불러옴

const app = express(); // app 으로 서버 만들수 있음 express는 생산자여서 express 인스턴스를 만듦
const http = require("http").createServer(app); // http를 통해 createserver를 만듦 app에 들어가는 것은 express 서버임
const config = require("./config/key");
// 위가 기본 구조

// 몇가지 설정

app.use(express.urlencoded({ extended: true })); // body-parser를 썼어야했는데 body-parser가 express로 들어오면서 이렇게 바뀜
app.use(express.json()); // json 데이터형 다루기 위해 사전에 설정
app.use(cors()); 

//user 관련 요청 들어오면 필요해 (require) /api/user뒤 /빠져야됨
app.use("/api/user", require("./routes/user.js"));

const PORT = 5000;

app.use(express.static(path.join(__dirname, "client/build"))) // react는 cra로 하나의 html 파일 렌더링, index.html을 서버에서 열어줌, client의 build를 static하게 사용해야겠다 앱에 알려줌
// path.join 는 상대경로 쉽게, dirname = index.js위치한 경로가 상대경로로 들어감 이 뒤에 우리가쓸경로 입력

// mogodb connection --> 그냥 하나의 문법으로 외우기
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    http.listen(PORT, () => {
        console.log("listening on ", PORT); // port로 서버를 열었다 찍는다
    }); // http로 열었던 서버 연다 -> 열 서버의 포트번호, 서버 연 후의 동작 함수
}).catch((err) => console.log(err));
// then은 mongoose가 db랑 연결 되면 http로 포트 열어준다. catch는 error처리
// url = application code (<password> -> 실제 비밀번호 넣기, myFirstDatabase --> db이름(Kuketcurly))

// 위까지 하면 http를 통해 서버를 열었음


/* 서버 역할
    첫번째, 경로에 따른 페이지 렌더링 (ROUTE) --> 사용자가 어떤 경로 들어왔을 때 어떤 페이지 보여줄 것인가
    두번째, DB 통신
    세번째, DB 통신 값 client로
*/

// 1st

// url 통신에는 get방식 : 데이터가 url에 표면적으로 들어남(ex) naver 서칭 후 들어감, post방식 : 데이터 숨겨짐
app.get("/", (req, res) => {
    console.log(req);
    res.sendFile(path.join(__dirname, "/client/build/index.html")); // 이렇게 되면 사용자에게 index.html 파일을 띄움
});

// /는 기본 url, 요청 : client->server데이터 보냄 요청에 담김, 응답 : servre->client데이터를 응답에 담음 
// 지금은 쓸모있는 데이터가요청에 없음 사용자가 접속만한것임 (url 정보가 담겨있을 것)

app.get("*", (req, res) => {
    console.log(req);
    res.sendFile(path.join(__dirname, "/client/build/index.html")); // react route 사용 위해 모든 경로에 대해서 index.html 파일 열어 주겠다. index.html은 react의 route 규칙에 따라 다른 component를 열어줌
});

// react에서 express 열기 위한 기본 세팅

// 이제 앞으로 user관련 액션은 user.js에서 해 알려주자


/*
디비 : mogodb, nosql, mongoose
1. 디비를 만들고 디비랑 서버를 연동
2. 요청.body 내용을 디비에 저장
3. 저장에 성공하면 클라이언트에 성공했다고 말해주고, 실패하면 실패했다고 말해줌
4. 프록시 설정
*/