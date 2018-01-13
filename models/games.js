module.exports = function(sequelize, DataTypes){
	var Games = sequelize.define("Games", {
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
		creator: {
			type: DataTypes.STRING,
			allowNull: false
		},
		sport: {
			type: DataTypes.STRING,
			allowNull: false
		},
		location: {
			allowNull: false,
			type: DataTypes.STRING
		},
		day: {
			allowNull: true,
			type: DataTypes.DATEONLY
		},
		time: {
			allowNull: true,
			type: DataTypes.TIME,

		},
		totalplayers: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		currentplayers: {
			type: DataTypes.INTEGER,
			defaultValue: 1
		},
		usergame: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		},
		userplaying: {
			type: DataTypes.BOOLEAN,
			defaultValue: true

		},
		description: {
			allowNull: true,
			type: DataTypes.STRING
		}

	});

	Games.associate = function(models){
		Games.belongsTo(models.User);
		Games.hasOne(models.Results);
		Games.hasMany(models.Stats, {
			onDelete: "cascade"
		});
	}

	return Games;
}