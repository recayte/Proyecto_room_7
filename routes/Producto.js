const express = require('express');
const router = express.Router();
const jsProducto  =require('../models/modelProducto');
const jsCategoria  =require('../models/modelCategoria');
const jsCategoriaProducto  =require('../models/modelCategoriaProducto');
const jsProductoImagen  =require('../models/modelProductoImagen');


function ClassProdxCat() {
  var idcategoria;
  var txtcategoria;
  var ArrProductos = [];
}

function ArmaArray() {
  var ProdxCat = [];

  jsCategoriahabilitadas = jsCategoria.filter((pedido) => pedido.snhabilitado == 1);

  jsCategoriahabilitadas.forEach((categoria) => {
    let aux_prodxcat = new ClassProdxCat();

    aux_prodxcat.idcategoria = categoria.idcategoria;
    aux_prodxcat.txtcategoria = categoria.txtcategoria;

    let aux_cat_prod = jsCategoriaProducto.filter((cat_prod) => {
      return cat_prod.idcategoria == categoria.idcategoria;
    });

    let aux_prods = [];
    aux_cat_prod.forEach((cateprod) => {
      let prods = jsProducto.find((productos) => {
        return productos.idproducto == cateprod.idproducto;
      });
      aux_prods.push(prods);
    });
    aux_prodxcat.ArrProductos = aux_prods;
    ProdxCat.push(aux_prodxcat);
  });
 
  return ProdxCat;

}

 
const listproducto = (req, res) =>{
  jsCategoriaXproducto = ArmaArray();
  res.render("Producto", { CatxProd : jsCategoriaXproducto   });
}



const single = (req, res) =>{
    
    const {idproducto} = req.params;
    const idProd = jsProducto.find((idProd) => idProd.idproducto == idproducto);
    const idImag = jsProductoImagen.find((idImag) => idImag.idProducto == idproducto);
    res.render("Productos", {idProd,idImag});
}

/*
const filter = (req, res) => {
    // tarea -> console.log(req.query);
  };
 */
// query
router.get("/list", listproducto); 
router.get("/single/:idproducto", single); // 1 2 pure
//router.get("/list/filter", filter);
// router.get("/list/paginate/:start/:end", paginate);

module.exports = router;