const Sequelize = require('sequelize');

class Post extends Sequelize.Model {
    static initiate(sequelize) {

        Post.init({
            title: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            content: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            location: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            image: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            lat: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            lng: {
                type: Sequelize.STRING,
                allowNull: false,
            },
        }, { sequelize });
    }
    static associate(db) {
        db.Post.belongsTo(db.User);
        db.Post.hasMany(db.Comment);
    }
}

module.exports = Post