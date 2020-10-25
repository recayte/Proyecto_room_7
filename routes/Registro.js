const express = require("express");
const router = express.Router();


const showView = (req, res) => res.render("registro");

const create = async (req, res) => {
  try {
    const { body: usuario } = req;
    const { mail, nombre, apellido } = usuario;
     
    res.render("index", { nombre , apellido });
   
  } catch (e) {
    console.log(e);
  }
};


router.get("/", showView);
router.post("/create", create);
module.exports = router;
