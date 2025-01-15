const {DataTypes, Association}=require('sequelize')
const {sequelize}=require('../conexion/conecting.js')

const Producto = sequelize.define('producto',{
  ProductId:{
    type:DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey:true

  },
  Produc_Name:{
    type:DataTypes.STRING,
    allowNull:false,
  },
  precio:{
    type:DataTypes.DECIMAL,
    allowNull:false
  },
  stock:{
    type:DataTypes.INTEGER,
    allowNull:false
  },

},{
  timestamps:false
});


module.exports={Producto}