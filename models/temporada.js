'use strict';

module.exports = function(sequelize, DataTypes) {
	
	var Temporada = sequelize.define('Temporada', {
		season: DataTypes.Integer
	}, 
	{
		name : {singular: 'Temporada', plural: 'Temporadas'},
		classMethods : {
			associate: function(models) {
				Temporada.belongsTo(models.Serie);
			}
		}
	});
	
	return Temporada;
}