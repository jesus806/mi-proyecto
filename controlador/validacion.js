const { body } = require ('express-validator');

const valido=[
    body('email')
    .trim()
    .notEmpty().withMessage('El email es obligatorio.')
    .isEmail().withMessage('debe ser un email'),
    body('password')
    .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
    body('username')
    .trim()
    .notEmpty().withMessage ('El campo username no puede estar vacío')
    
       
]

const pararegistro=[
    body('email')
    .trim()
    .notEmpty().withMessage('El email es obligatorio.'),
    body('password')
    .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
]

module.exports={valido,pararegistro}