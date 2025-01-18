const {DataTypes, Association}=require('sequelize')
const {sequelize}=require('../conexion/conecting.js')

const Servicios = sequelize.define('servicio',{
  servico_Id:{
    type:DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey:true

  },
  servicio:{
    type:DataTypes.TEXT,
    allowNull:false
  },
  precio:{
    type:DataTypes.DECIMAL,
    allowNull:false
  },
  stock:{
    type:DataTypes.INTEGER,
    allowNull:false
  },
  descripcion:{
    type:DataTypes.TEXT,
    allowNull:false
  },
  imagen:{
    type:DataTypes.STRING,
    allowNull:false
  },

},{
  timestamps:false
});


module.exports={Servicios}