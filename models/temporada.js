'use strict';

module.exports = function(sequelize, DataTypes) {
	
	var Temporada = sequelize.define('Temporada', {
		season: DataTypes.INTEGER
	}, 
	{
		name : {singular: 'Temporada', plural: 'Temporadas'},
		classMethods : {
			associate: function(models) {
				Temporada.belongsTo(models.Serie);
				Temporada.hasMany(models.Capitulo);
			}
		}
	});
	
	return Temporada;
}