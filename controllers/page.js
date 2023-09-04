//서비스를 호출하는 코드
exports.renderProfile = (req, res, next) => {
  //{title}이 객체도 front로 넘어간다.
  res.render("profile", { title: "내 정보 - NodeBird" });
};
exports.renderJoin = (req, res, next) => {
  res.render("join", { title: "회원 가입 - NodeBird" });
};
exports.renderMain = (req, res, next) => {
  res.render("main", { title: "NodeBird", twits: [] });
};

//라우터 -> 컨트롤러(요청, 응답을 안다)-> 서비스(요청, 응답 모른다.)  : 계층적 호출
