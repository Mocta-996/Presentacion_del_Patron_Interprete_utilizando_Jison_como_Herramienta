const { Instruction } =  require("../abstract/Instruction");
const {listaImprimir}  = require("../utils/ListaImprimir");

class Imprimir extends Instruction {
  constructor(line, column, expression) {
    super(line, column)
    this.expression = expression
  }
  
  execute(env) {
    const value = this.expression.execute(env) // value and type
    listaImprimir.push(value.value)
    console.log("desde consola:", value.value)
  }
}

module.exports.Imprimir = Imprimir;
