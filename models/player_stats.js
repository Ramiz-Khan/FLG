module.exports = function(sequelize, DataTypes){
    var Player_stats = sequelize.define("Player_stats", {
        id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false
		},
		user_id:{
			type: DataTypes.UUID,
			allowNull: false
        },
        game_id:{
            type: DataTypes.UUID,
			allowNull: false
        },
        points:{
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true
        }, 
        outcome: {
            type: DataTypes.STRING,
            defaultValue: "",
            allowNull: true
        }
    });

    Player_stats.associate = function(models) {

        Player_stats.belongsTo(models.Games);
        Player_stats.belongsTo(models.User);

    };

    return Player_stats;
}