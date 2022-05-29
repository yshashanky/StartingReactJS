module.exports = (sequelize, DataTypes) => {

    const posts = sequelize.define("posts", {   //define table
        title: {                                //define columns
            type: DataTypes.STRING,             //define column properties
            allowNull: false,
        },
        postText: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    posts.associate = (models) => {
        posts.hasMany(models.comments, {
            onDelete: "cascade",
        })
    };

    return posts;
};
