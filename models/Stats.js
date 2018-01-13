module.exports = function(sequelize, DataTypes){
    var Stats = sequelize.define("Stats", {
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

    Stats.associate = function(models) {

        Stats.belongsTo(models.Games);
        Stats.belongsTo(models.User);
        Stats.hasMany(models.Results);

    };

    return Stats;
}