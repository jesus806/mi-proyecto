const {DataTypes, Association}=require('sequelize')
const {sequelize}=require('../conexion/conecting.js')

const ProducUser=sequelize.define('ProductUser',{
  venta:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  }
})


module.exports={ProducUser}