const {DataTypes, Association}=require('sequelize')
const {sequelize}=require('../conexion/conecting.js')

const Categoria =sequelize.define( 'categoria',{
  categoria_id:{
    type:DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey:true
  },
  Nombre_categori:{
    type:DataTypes.STRING,
  }

  },
  {
    timestamps:false
  })


  
  module.exports={Categoria}