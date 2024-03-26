const fs = require('fs/promises');
const path = require('path');



const listarPedidos = async (req,res) => {
    
    const pedidos = await fs.readFile(path.join(__dirname,'../db/pedidos.json'));
    const pedidosJson= JSON.parse(pedidos);

    res.json(pedidosJson);
} 

const crearPedido = async (req, res)=>{
    const nuevoPedido= req.body

    //consultar el ultimo id insertado en el json para seguir el consecutivo
    const pedidos = await fs.readFile(path.join(__dirname,'../db/pedidos.json'));
    const pedidosJson= JSON.parse(pedidos);

    //consultar el tañamo del json para saber si tiene elementos ya insertados
    let ultimoId = 0;
    if(pedidosJson.length > 0){
        //obtenemos la el producto q esta en al ultima posicion
        const ultimoPedido =pedidosJson[pedidosJson.length - 1];
        //obtenemos el id y le sumamos 1
        ultimoId = ultimoPedido.id+1; 
    }

    nuevoPedido.id = ultimoId;
    pedidosJson.push(nuevoPedido);

    await fs.writeFile(path.join(__dirname,'../db/pedidos.json'), JSON.stringify(pedidosJson, null, 2), {encoding: 'utf-8'})
    
    res.json({mensaje:"pedido creado"});
}

const actualizarEstadoPedido = async (req, res)=>{
    const {id} = req.params;
    const {estado} = req.body;

    const pedidos = await fs.readFile(path.join(__dirname,'../db/pedidos.json'));
    const pedidosJson= JSON.parse(pedidos);

    
    const pedido = pedidosJson.find(pedido => pedido.id == id);
    
    pedido.estado = estado;
    await fs.writeFile(path.join(__dirname,'../db/pedidos.json'), JSON.stringify(pedidosJson, null, 2), {encoding: 'utf-8'})
    res.json({mensaje:"pedido  actualizado"});

}


module.exports = {
    listarPedidos,
    crearPedido,
    actualizarEstadoPedido
}