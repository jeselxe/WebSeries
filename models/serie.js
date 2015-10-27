'use strict';

module.exports = function(sequelize, DataTypes) {
		
	var Serie = sequelize.define('Serie', {
		title: DataTypes.STRING,
		description: DataTypes.TEXT
	}, {
		classMethods: {
			associate: function(models) {
				Serie.belongsTo(models.Usuario);
				Serie.hasMany(models.Temporada);
			}
		}
	});
	
	return Serie;
}