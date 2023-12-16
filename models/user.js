const Sequelize = require('sequelize');

class User extends Sequelize.Model {
    static initiate(sequelize) {

        User.init({
            email: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            username: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
            },
        }, { sequelize });
    }
    static associate(db) {
        db.User.hasMany(db.Post);
        db.User.hasMany(db.Comment);
    }
}

module.exports = User