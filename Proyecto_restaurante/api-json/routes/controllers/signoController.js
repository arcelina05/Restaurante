const fs = require('fs/promises');
const path = require('path');

const crearProducto = async (req, res)=>{
    const nuevoProdructo= req.body
    await fs.writeFile(path.join(__dirname,'../../db/productos.json'), JSON.stringify(nuevoProdructo, null, 2), {encoding: 'utf-8'})
    res.json({mensaje:"producto creado"});
}

const ActualizarProducto = async (req, res)=>{
    const Producto = await fs.readFile(path.join(__dirname,'../../db/productos.json'));
    const ProductoJson= JSON.parse(Producto);
    const {nameProducto, precioProducto}= req.body
    const actualizar= usuariosJson.find(producto=> producto.nombre== nameProducto && user.precio == precioProducto)
    await fs.writeFile(path.join(__dirname,'../../db/productos.json'), JSON.stringify(nameProducto, null, 2), {encoding: 'utf-8'})
    res.json({mensaje:"producto  actualizado"});
}

const getOneSigno = async (req, res)=>{
    const oneSigno = req.params.signo;
    const allSignos = await fs.readFile(path.join(__dirname,'../../db/signos.json'));
    const objSignos = JSON.parse(allSignos);
    const result = objSignos[oneSigno];
    res.json(result)
}

const updateSigno = async (req, res)=>{
    const signoEditar = req.params.signoEditar;
    const {textoEditar} = req.body;
    const allSignos = await fs.readFile(path.join(__dirname,'../../db/signos.json'));
    const objSignos = JSON.parse(allSignos);

    const objUpdate = {
        ...objSignos,
        [signoEditar]: textoEditar
    }

    // console.log(objUpdate);
    await fs.writeFile(path.join(__dirname,'../../db/signos.json'), JSON.stringify(objUpdate, null, 2), {encoding: 'utf-8'})

    res.json({
        message: "Updated"
    })
}

const login = async (req, res)=>{
    const {body} = req;
    const {username,password} = body;
    const usuarios = await fs.readFile(path.join(__dirname,'../../db/usuarios.json'));
    const usuariosJson = JSON.parse(usuarios)
    const usuario= usuariosJson.find(user=> user.nombre==username && user.password == password)
    res.json(usuario)
}
module.exports = {
    getAllSignos,
    getOneSigno,
    updateSigno,
    login
}