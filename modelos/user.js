
const bcryptjs = require('bcryptjs');
const {DataTypes, Association}=require('sequelize')
const {sequelize}=require('../conexion/conecting.js')



const User = sequelize.define('user', {
    UserId:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true,

    },
    username:{ 
      type:DataTypes.STRING,
      allowNull:false
    },
     password: {
      type: DataTypes.STRING,
      set(value) {
        const hashedPassword = bcryptjs.hashSync(value, 10)
        this.setDataValue('password',hashedPassword);
      },
      allowNull:false
    },
    email:{
      type:DataTypes.STRING,
      unique:true,
      allowNull:false
    },
    validado:{
      type:DataTypes.BOOLEAN,
      defaultValue:false
    }
    
  });


module.exports={User}