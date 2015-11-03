'use strict';

module.exports = function(sequelize, DataTypes) {
	
	var Capitulo = sequelize.define('Capitulo', {
		title: DataTypes.STRING
	}, 
	{
		name : {singular: 'Capitulo', plural: 'Capitulos'},
		classMethods : {
			associate: function(models) {
				Capitulo.belongsTo(models.Temporada);
				Capitulo.hasMany(models.Comentario);
			}
		}
	});
	
	return Capitulo;
}