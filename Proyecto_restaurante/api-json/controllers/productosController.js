const fs = require('fs/promises');
const path = require('path');


const listarProductos = async (req,res) => {
    
    const productos = await fs.readFile(path.join(__dirname,'../db/productos.json'));
    const productosJson= JSON.parse(productos);

    res.json(productosJson);
} 

const crearProducto = async (req, res)=>{
    const nuevoProducto= req.body

    //consultar el ultimo id insertado en el json para seguir el consecutivo
    const productos = await fs.readFile(path.join(__dirname,'../db/productos.json'));
    const productosJson= JSON.parse(productos);

    //consultar el tañamo del json para saber si tiene elementos ya insertados
    let ultimoId = 0;
    if(productosJson.length > 0){
        //obtenemos la el producto q esta en al ultima posicion
        const ultimoProducto =productosJson[productosJson.length - 1];
        //obtenemos el id y le sumamos 1
        ultimoId = ultimoProducto.id+1; 
    }

    nuevoProducto.id = ultimoId;

    //insertar el nuevo producto en el arreglo de productos
    productosJson.push(nuevoProducto);

    //escribir el archivo json con los nuevos productos actualizado
    await fs.writeFile(path.join(__dirname,'../db/productos.json'), JSON.stringify(productosJson, null, 2), {encoding: 'utf-8'})
    
    res.json({mensaje:"producto creado"});
}

const actualizarProducto = async (req, res)=>{
    const {id} = req.params;
    const nuevosDatosProducto = req.body;

    const productos = await fs.readFile(path.join(__dirname,'../db/productos.json'));
    const productosJson= JSON.parse(productos);

    //Buscar y obtener en que posicion se encuentra el producto que se va a actualizar
    const indiceProducto = productosJson.findIndex(producto => producto.id == id);
    
    // si el indice es diferente de -1 quiere decir que encontro el producto
    if(indiceProducto != -1 ){
        productosJson[indiceProducto] = {...productosJson[indiceProducto], ...nuevosDatosProducto};

        //escribir el archivo json con los nuevos productos actualizado
        await fs.writeFile(path.join(__dirname,'../db/productos.json'), JSON.stringify(productosJson, null, 2), {encoding: 'utf-8'})
        res.json({mensaje:"producto  actualizado"});
    }else{
        res.json({mensaje:"no se ha encontrado elproducto"});
    }
}

const eliminarProducto = async (req, res) => {
    const { id } = req.params;

    const productos = await fs.readFile(path.join(__dirname, '../db/productos.json'));
    let productosJson = JSON.parse(productos);

    // Buscar y eliminar el producto con el ID proporcionado
    const indiceProducto = productosJson.findIndex(producto => producto.id == id);
    
    if (indiceProducto !== -1) {
        productosJson.splice(indiceProducto, 1); // Eliminar el producto del arreglo
        // Escribir el archivo JSON con los productos actualizados
        await fs.writeFile(path.join(__dirname, '../db/productos.json'), JSON.stringify(productosJson, null, 2), { encoding: 'utf-8' });
        res.json({ mensaje: "Producto eliminado correctamente" });
    } else {
        res.json({ mensaje: "No se ha encontrado el producto" });
    }
};


module.exports = {
    crearProducto,
    actualizarProducto,
    eliminarProducto,
    listarProductos
}