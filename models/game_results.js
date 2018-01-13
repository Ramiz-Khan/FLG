module.exports = function(sequelize, DataTypes){
	var Results = sequelize.define("Results", {
        id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false
        },
        game_id: {
            type: DataTypes.UUID,
			allowNull: false
        },
        winner_score: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        loser_score: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        winning_team: {
            type: DataTypes.STRING,
            alowNull: true, 
            defaultValue: 0
        }, 
        losing_team: {
            type: DataTypes.STRING,
            alowNull: true, 
            defaultValue: 0
        }
    })


Results.associate = function(models) {

    Results.belongsTo(models.Games);

};

return Results;

};