const passport = require("passport");
const local = require("./localStrategy");
const kakao = require("./kakaoStrategy");

const User = require("../models/user");

module.exports = () => {
  passport.serializeUser((user, done) => {
    //user === exUser
    done(null, user.id); //user id만 추출: 유저 자체를 저장해버리면 메모리가 너무 커지기 떄문에
  });
  //세션 {123456:1} {세션쿠키:유저아이디} -> 메모리에 저장 된다.
  passport.deserializeUser((id, done) => {
    User.findOne({ where: { id } })
      .then((user) => done(null, user)) // req.user
      .catch((err) => done(err));
  });

  local();
  kakao();
};
