
const port=process.env.PORT || 3001
const express = require('express')
const app = express()
const rutes =require('./routers/rutas.js')
const cors=require('cors')
const CookieParser=require('cookie-parser')
const session=require('express-session')

app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(CookieParser())

app.use(
  session({
    secret:process.env.ClaveSecreta,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 5 * 60 * 1000 },
  })
)


const optioncors={
  origin:'http://localhost:5500',
  optionsSuccessStatus:200,
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}

app.use(express.json())
app.use(cors(optioncors))

app.get('/inicio',rutes)
app.get('/servicio',rutes)
app.post('/servicio',rutes)
app.post('/Registro',rutes)
app.post('/Registro/verificacion',rutes)
app.post('/Login',rutes)
app.get('/Desconexion',rutes)


app.use((req,res)=>{
    res.status(400).json({mensaje:"Error 400"})
})

app.listen(port, () => {
  console.log('puerto open')
})






