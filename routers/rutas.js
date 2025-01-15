const express = require ('express')
const router=express.Router()
const {inicio,regitro,validarCodigo,autorizacion,desconexio,Login}=require('../controlador/controler.js')
const {valido,pararegistro}=require('../controlador/validacion.js')

router.get('/inicio',autorizacion,inicio);
router.post('/Registro',valido,regitro);
router.post('/Registro/verificacion',validarCodigo);
router.get('/Desconexion',desconexio);
router.post('/Login',pararegistro,Login);




module.exports=router