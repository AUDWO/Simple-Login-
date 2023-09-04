//passport랑 관련없느 코드 그냥 단순히 회원정보를 DB에 넣어주는 역할을 하는 코드

const User = require("../models/user");
const passport = require("passport");
const bcrypt = require("bcrypt");

exports.join = async (req, res, next) => {
  const { email, nick, password } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      return res.redirect("/join?error=exist");
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      email,
      nick,
      password: hash,
    });
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    next(error);
  }
};

//POST /auth/login
exports.login = (req, res, next) => {
  passport.authenticate(
    "local",
    (authError, user, info) => {
      if (authError /*서버실패 */) {
        console.error(authError);
        return next(authError);
      }
      if (!user /*로직 실패 */) {
        return res.redirect(`/?loginError=${info.message}`);
      }
      return req.login(user, (loginError) => {
        //로그인 성공
        if (loginError) {
          console.error(loginError);
          return next(loginError);
        }
        return res.redirect("/");
      });
    }
    //이 함수가 (authError,user, info를 인수로 가지는 함수) done이 된다.
  )(req, res, next);
};

exports.logout = (req, res, next) => {
  req.logout(() => {
    res.redirect("/");
  });
};
