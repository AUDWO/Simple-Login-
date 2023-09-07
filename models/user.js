const Sequelize = require("sequelize");

class User extends Sequelize.Model {
  static initiate(sequelize) {
    User.init(
      {
        email: {
          type: Sequelize.STRING(40),
          allowNull: true,
          unique: true,
        },
        nick: {
          type: Sequelize.STRING(15),
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        provider: {
          type: Sequelize.ENUM("local", "kakao"),
          allowNull: false,
          defaultValue: "local",
        },
        snsId: {
          type: Sequelize.STRING(30),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true, //createdAt, updatedAt
        underscored: false,
        modalName: "User",
        tableName: "users",
        paranoid: true, //deletedAt
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.User.hasMany(db.Post);
    db.User.belongsToMany(db.User, {
      //팔로워 :특정 사람의 특정 팔로워 찾기
      foreignKey: "followingId", //유명 연예인의 id를 알고 있어야 한다. -> 그래야 그 유명 연예인의 팔로워들을 찾을 수 있다,(그중에 내가 있는지)
      as: "Followers",
      through: "Follow",
    });
    db.User.belongsToMany(db.User, {
      //팔로잉 : 특정 사람의 팔로잉 찾기
      foreignKey: "followerId", // 내 id를 알고 있어여한다. -> 그래서 내가 팔로잉 하고 있는 사람을 찾을 수 있다. (내가 팔로잉 한 사람들 중에 특정 사람이 있는지 확인하기 위해서)
      as: "Followings",
      through: "Follow",
    });
  }
}

module.exports = User;
