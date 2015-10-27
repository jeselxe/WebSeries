'use strict';

module.exports = function(sequelize, DataTypes) {
	
	var Capitulo = sequelize.define('Temporada', {
		title: DataTypes.STRING
	}, 
	{
		name : {singular: 'Capitulo', plural: 'Capitulos'},
		classMethods : {
			associate: function(models) {
				Capitulo.belongsTo(models.Temporada);
			}
		}
	});
	
	return Capitulo;
}