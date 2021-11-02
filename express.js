//*  Hola Juliana,
//*  En app.get("/productos") solo me muestra un objeto vacío cuando busco /productos en el servidor .
//*  En app.get("/productos-random") tengo serias dudas de lo que hice esta bien, 
//*  igual comente lo que quize hacer en el metodo, pienso esta bien pero cuando ingreso 
//*  a /productos-random en el servidor solamente me deja la pagina en blanco.

const express = require('express');
const contenedor = require('./contenedor');
const app = express();
const PORT = 8080;

app.get("/",(req, res)=>{
    
    let msj = "Desafío servidor Express"
    res.send(msj);
})

app.get("/productos",(req, res)=>{

    let products = contenedor.getAll();
    res.json(products);
})
app.get("/productos-random",(req, res)=>{
    let response = contenedor.randomId();
    res.json(response)
})

app.listen(PORT, () => {
    console.log(`Estamos conectados a la URL http://localhost:${PORT}`)
})
app.on("Error",err => console.log(`Falló la conexión al servidor`,err)); 