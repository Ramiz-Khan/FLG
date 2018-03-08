module.exports = function(sequelize, DataTypes){
	var User = sequelize.define("User", {
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false
		},
		firstname: {
			type: DataTypes.STRING,
			allowNull: false
		},
		lastname: {
			type: DataTypes.STRING,
			allowNull: false
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		},
		bio: {
			type: DataTypes.STRING,
			allowNull: true
		},
		email: {
			type: DataTypes.STRING,
			isEmail: true,
			allowNull: false
		}, 
		img: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		createdAt: {
			type: DataTypes.TIMESTAMP,
			allowNull: false			
		}
	});

	User.associate = function(models){
		User.hasMany(models.Games, {
			onDelete: "cascade"
		});
		User.hasMany(models.Results, {
			onDelete: "cascade"
		});
		User.hasMany(models.Stats, {
			onDelete: "cascade"
		});
	};

	return User;
}