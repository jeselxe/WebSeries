'use strict';

module.exports = function(sequelize, DataTypes) {
		
	var Comentario = sequelize.define('Comentario', {
		comment: DataTypes.TEXT
	}, {
		name: {singular: 'Comentario', plural: 'Comentarios'},
		classMethods: {
			associate: function(models) {
				Comentario.belongsTo(models.Usuario);
				Comentario.belongsTo(models.Capitulo);
			}
		}
	});
	
	return Comentario;
}