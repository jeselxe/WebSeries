'use strict';

module.exports = function(sequelize, DataTypes) {
	// El tercer parametro es opcional y es para asignar el nombre de la tabla en plural manualmente
	var Usuario = sequelize.define('Usuario', {
		nickname: DataTypes.STRING,
		password: DataTypes.STRING
	}, {
		name: {singular: 'Usuario', plural: 'Usuarios'},
		classMethods: {
			associate: function(models){
				Usuario.hasMany(models.Serie)
			}
		}
	});

	return Usuario;
}