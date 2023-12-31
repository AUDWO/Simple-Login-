const Sequelize = require("sequelize");
const fs = require("fs");
const path = require("path");

//const User = require("./user");
//const Post = require("./post");
//const Hashtag = require("./hashtag");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
/*
db.User = User;
db.Post = Post;
db.Hashtag = Hashtag;
User.initiate(sequelize);
Post.initiate(sequelize);
Hashtag.initiate(sequelize);
User.associate(db);
Post.associate(db);
Hashtag.associate(db);
*/

const basename = path.basename(__filename);

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file));
    db[model.name] = model;
    //initiate먼저 하고 associate를 설정할 수 있다.
    model.initiate(sequelize);
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName.associate]) {
    db[modelName].associate(db);
  }
});
module.exports = db;
