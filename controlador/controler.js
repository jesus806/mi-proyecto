const {sequelize} = require('../conexion/conecting.js')
const { body, validationResult } = require ('express-validator');
const dotenv=require('dotenv')
const {Sequelize}=require('sequelize')
const express =require('express')
const{ User}=require('../modelos/user.js')
const{ Servicios}=require('../modelos/servicios.js')
const nodemailer= require ('nodemailer');
const jwt=require('jsonwebtoken')
const bcryptjs = require('bcryptjs');
const ClaveSecreta=process.env.ClaveSecreta


function autorizacion(req,res,next){
  const token=req.cookies.token
  console.log(token)
  if(token){
    jwt.verify(token,ClaveSecreta,(error,decoded)=>{
      if(error) return res.status(400).json({mensaje:"ERRor"})
       req.userid=decoded.id
      next() 
    })
  }else{
    res.status(401).json({mensaje:"SIN autorizacion"})
  }
}

function Nodemail(numero,email) {
  const transporte=nodemailer.createTransport({
    host:'smtp.gmail.com',
    port:465,
    secure:true,
    auth:{
      user:process.env.Email,
      pass:process.env.PASS,
    }
  })

 const mailOption={
  from:'ferreteria@gmail.com',
  to:email,
  subjet:'Confirma registro su codigo es:',
  text:`${numero}`
 }

  transporte.sendMail(mailOption,(error,info)=>{
    if (error) {
      console.log(error)
    } else {
      console.log(info.response)
    }
  })
}

async function conect() {
    try {
      
        await sequelize.authenticate();
        await Servicios.sync()
        await User.sync()
        

        console.log('conecting')
        
    } catch (error) {
        console.error(error)
        process.exit(1);
    }
    
}

conect()

const inicio = async(req, res) => {
   const nombre=req.cookies['name']
   console.log(nombre)
   res.status(200).send(`Bienvenido, ${nombre}!`);
}


const regitro= async (req,res)=>{
  try {
     
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const{username,password,email}=req.body
      const exist=await User.findOne({
        where:{email}
      })
      if (exist) {
        return res.status(400).json({mensaje:"El correo que intentas usar ya esta registrado"})
       }
    
    
    const numero=parseInt(Math.floor(Math.random()*1000000))

    Nodemail(numero,email)

    req.session.verification = {
      username,
      email,
      numero,
      expirationTime: Date.now() + 5 * 60 * 1000 
    };

   const usuario = await User.create({
      username,
      password,
      email
   })
   
   
    res.redirect(302,'/Registro/Verificacion')
  } catch (error) {
    console.log(error)
  }
}


const validarCodigo=async(req,res)=>{
  try {
    const {codigo} = req.body
    
    if (req.session.verification) {
      const { email, numero, expirationTime } =req.session.verification;
      if(Date.now()<expirationTime){
        if(parseInt(codigo)===numero){
          const verdadero= await User.findOne({where:{email}})
          verdadero.validado=true;
          verdadero.save()
          const token = jwt.sign(
            { email },ClaveSecreta,{ expiresIn: '1h' })
            res.cookie('token', token, { httpOnly: true, secure: false })
            console.log(token)
          return  res.redirect(303,'/inicio')
          
        }else{
          return res.status(400).json({mesnaje:"codigo invalido"})
        }
      }}
     else{
      return res.status(400).json({mesnaje:"El codigo a expirado"})
    }

  } catch (error) {
    console.log(error)
  }
}

const Login=async(req,res)=>{
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
    const{email,password}=req.body

    const usuario= await User.findOne({where:{email}})
    console.log(usuario.password)
    if (!usuario) {
    return  res.status(400).json({mensaje:"El usuario o la contraseña son invalidos"})
    }
   if(usuario.validado==0){
    
    const numero=parseInt(Math.floor(Math.random()*1000000))
    Nodemail(numero,email)

    req.session.verification = {
      email,
      numero,
      expirationTime: Date.now() + 5 * 60 * 1000 
    };
    return res.redirect(301,'/Registro/Verificacion')
   }
   const compare=await bcryptjs.compare(password,usuario.password)
   if(!compare){
    return res.status(400).json({mensaje:"El usuario o la contraseña son invalidos"})
   }
   const token = jwt.sign(
    { email },ClaveSecreta,{ expiresIn: '1h' })
    res.cookie('token', token, { httpOnly: true, secure: false })
    res.cookie('name', usuario.username, { httpOnly: true, secure: false })
    return res.redirect(303,'/inicio')
  } catch (error) {
    return res.status(500).json({ mensaje: "Error interno del servidor" })
  }
}

const desconexio=async(req,res)=>{
  try {
      const user=req.cookies.token
    console.log(user)
     if (user) {
      res.clearCookie('token')
      res.send("Desconectado")
      
    } else {
      res.redirect(301,'/Login')
    }
  } catch (error) {
    console.log(error)
  }
  
}

const servicio=async(req,res)=>{
  try {
    const servicio=await Servicios.findAll()
    if (!servicio) {
      return res.status(400).json({mensaje:'error al encontrar los servicio'})
    }
    res.json(servicio)
  } catch (error) {
    res.status(500).json({mensaje:'error del servidor'})
  }
}

const crearServico=async(req,res)=>{
  const{servicio,precio,stock,descripcion,imagen}=req.body
  const servico=await Servicios.create({
    servicio,
    precio,
    stock,
    descripcion,
    imagen
  });
  if (!servicio) {
    return res.status(400).json({mensaje:'error al crear el servicio'})
  }
  res.json(servico)
}

module.exports={inicio,regitro,validarCodigo,autorizacion,desconexio,Login,servicio,crearServico}


