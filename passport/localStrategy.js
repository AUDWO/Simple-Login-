const passport = require("passport");
const { Strategy: localStrategy } = require("passport-local");
const bcrypt = require("bcrypt");
const User = require("../models/user");

module.exports = () => {
  passport.use(
    new localStrategy(
      {
        usernameField: "email", //req.body.email
        passwordField: "password", //req.body.password
        passReqToCallback: false,
      },
      async (email, password, done) => {
        //done(서버실패:DB에서 데이터 받아오는 것을 실패 or 문법이 틀렸거나, 성공유저, 로직실패:비밀번호가 일치하지 않는 경우, 가입되지 않은 회원인 경우)
        try {
          const exUser = await User.findOne({ where: { email } });
          if (exUser) {
            //bcrpyt.hash-> 서명, bcrypt.compare 암호비교 (password:사용자가 입력한 비밀번호 exUser.password:DB에 저장되어있는 비밀번호)
            const result = await bcrypt.compare(password, exUser.password);
            if (result) {
              done(null, exUser);
            } else {
              done(null, false, { message: "비밀번호가 일치하지 않습니다." });
            }
          } else {
            //사용자가 없는 경우 (exUser가 존재하지 않는경우)
            done(null, false, { message: "가입되지 않은 회원입니다." });
          }
        } catch (err) {
          console.error(err);
          done(err); //서버 실패를 전달
        }
      }
    )
  );
};

//done 함수가 호출이 되면 controllers에 있는 auth파일에 있는
//passport.authenticate메소드 내에 있는 콜백으로 데이터가 이동한다.
