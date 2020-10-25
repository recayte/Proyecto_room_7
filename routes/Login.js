const express = require("express");
const router = express.Router();
const jsUsuario  =require('../models/modelUsuario');


 

const showView = (req, res) => res.render("login");


const ingreso =(req, res) =>{
const usuario = jsUsuario.find((iduser) => iduser.snAdmin == 1);
const admusuario = req.body.usuario
const admpass = req.body.password

if (usuario.User == admusuario && usuario.Password == admpass){
    res.render("index", { admusuario , mensaje: "administrador" });
};
    res.render("index", { admusuario });
};
  

module.exports = router;

router.get("/", showView);
router.post("/ingreso", ingreso);