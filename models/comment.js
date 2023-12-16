
const Sequelize = require('sequelize');

class Comment extends Sequelize.Model {
    static initiate(sequelize) {

        Comment.init({
            content: {
                type: Sequelize.STRING,
                allowNull: false,
            },
        }, { sequelize });
    }
    static associate(db) {
        db.Comment.belongsTo(db.Post);
        db.Comment.belongsTo(db.User);
    }
}

module.exports = Comment