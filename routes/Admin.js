const express = require('express');
const router = express.Router();
const jsCompra  =require('../models/modelCompra');
const jsUsuario  =require('../models/modelUsuario');
const jsDirrecion  =require('../models/modelDirrecionEnvio');
const jsEstado  =require('../models/modelEstadoPago');
const jsPersona  =require('../models/modelPersona');
const jsTipoEstado  =require('../models/modelTipoEstado');
const jsComprasProducto  =require('../models/modelCompraProducto');
const jsProducto  =require('../models/modelProducto');

function ClassPedido() {
  var txtproducto;
  var cantidad;
  var precio;
}


function armarpedido(idcompra) {
 var Pedidos = [];

 compraXprodutc = jsComprasProducto.filter((pedido) => pedido.idcompra == idcompra);

 compraXprodutc.forEach((pedido)=>{  
   let armarpedido = new ClassPedido();
   armarpedido.cantidad = pedido.cantidad;
  
   let aux_pedido = jsProducto.find((productos) => {
    return productos.idproducto == pedido.idproducto;
  });

   armarpedido.txtproducto =aux_pedido.txtproducto;
   armarpedido.precio =aux_pedido.precio;
   Pedidos.push(armarpedido)
 });

   return Pedidos;
}


function ClassCompraXuser() {
  var idcompra;
  var idusuario;
  var txtusuario;
} 

function ArmaArray() {
  var aux_compraXuser = [];   
      
  jsCompra.forEach((compra) => {
      let aux_arrCXu = new ClassCompraXuser();
      aux_arrCXu.idcompra = compra.idcompra;
      aux_arrCXu.idusuario = compra.idusuario;     
     
      let nameuser = jsUsuario.find((user) => {
        return user.idUsusario == compra.idusuario;        
      });
      aux_arrCXu.txtusuario = nameuser.User;   
      aux_compraXuser.push(aux_arrCXu);
    });
      return aux_compraXuser;
}


const listCompra = (req, res) =>{
  auxcompra = ArmaArray(); 
  res.render("Compras", { CompraXuser : auxcompra });
}


const single = (req, res) =>{     
   const {idcompra} = req.params;
   const idComp = jsCompra.find((idComp) => idComp.idcompra == idcompra);
   const usuario = jsUsuario.find((iduser) => iduser.idUsusario == idComp.idusuario);
   const persona = jsPersona.find((persona) => persona.idpersona == usuario.IdPersona);
   const dirrecion = jsDirrecion.find((iddir) => iddir.idirrecion == idComp.iddirrecion);
   const codestado = jsEstado.find((estado) => estado.idEstadoPago == idComp.idestadopago);
   const estado = jsTipoEstado.find((testado) => testado.codestado == codestado.codestado);
   const pedidoCompleto = armarpedido(idcompra)
  
   res.render("Compra", {idComp,usuario, dirrecion,estado,persona, pedidoCompleto});
}

router.get("/compras", listCompra); 
router.get("/compras/:idcompra", single);

module.exports = router;