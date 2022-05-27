const express = require("express")
const app = express();
const PORT = 8080;
const Contenedor = require('./file');

const file = new Contenedor("productos");

app.get('/productos', async(req, res) => {
    const productos = await file.getAll();
    res.status(200).json(productos)
})

app.get('/productoRandom', async (req, res) => {
    const productos = await file.getAll();
    const randomProduct = productos[Math.floor(Math.random() * productos.length)]
    res.status(200).json(randomProduct)
})

app.listen(PORT, () => {
    console.log(`Server listen on port ${PORT}`)
})


