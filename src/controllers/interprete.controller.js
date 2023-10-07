// importar librerias
//const { Request, Response } = require("express");
/*import { printlist } from "./interpreter/Reports/PrintList";
import { Environment } from "./interpreter/abstract/Environment";
import { Funcion } from "./interpreter/instruction/Funcion";
import { Exec } from "./interpreter/instruction/Exec";*/
// creando una clase controlador
const Environment  = require("./interprete/abstract/Environment");
const {listaImprimir}  = require("./interprete/utils/ListaImprimir");
const pong = async (req, res) => {
    res.send("Pong Mi interprete LFP");
};

const interpretar = async(req, res) => {
  // variable parser
  var parser = require("./interprete/Gramatica");

  // variable codigo fuente
  const text = req.body.code;
  console.log("Codigo de entrada:  " + text);

  try {
    // parsear el codigo fuente
    const ast = parser.parse(text); //ast es el arbol de sintaxis abstracta
    try {
      listaImprimir.splice(0, listaImprimir);
      //console.log("AST: " + ast);
      // crear el entorno global
      const globalEnv = new Environment(null);
      
      // recorrer instrucciones
      for (const inst of ast){
        inst.execute(globalEnv);
      }

      res.json({ consola:listaImprimir.join("\n")});

    } catch (error) {
      console.log(error);
      res.json({
        consola: error,
        errores: error,
      });
    }
  } catch (err) {
    console.log(err);
    res.json({
      consola: err,
      errores: err,
    });
  }
}



module.exports.pong = pong;
module.exports.interpretar = interpretar;