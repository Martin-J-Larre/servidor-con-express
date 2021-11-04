const express = require('express');
const contenedor = require('./contenedor');
const app = express();
const PORT = 8080;

app.get("/",(req, res)=>{
    
    let msj = "Desafío servidor Express"
    res.send(msj);
})

app.get("/productos", async (req, res)=>{

    let products = await contenedor.getAll();
    res.json(products);
});

app.get("/productos-random", async(req, res)=>{
    contenedor
    .getAll()
    .then((data) => {
      res.send(data[Math.floor(Math.random() * data.length)]);
    })
    .catch((error) => console.log(error));
})

app.listen(PORT, () => {
    console.log(`Estamos conectados a la URL http://localhost:${PORT}`)
})
app.on("Error",err => console.log(`Falló la conexión al servidor`,err)); 