const { Expression } =require("../abstract/Expression");
const { Type } = require ("../abstract/Return");

class Primitivo extends Expression {
  constructor(line, column, value, tipo) {
    super(line, column)
    this.value = value
    this.tipo = tipo
  }

  // ejecuar el objeto
  // retorna un valor primivito

  execute(env) {
    switch (this.tipo) {
      case Type.NUMERO:
        return { value: parseInt(this.value), type: Type.NUMERO }
      case Type.BOOLEANO:
        if (this.value.toString().toLowerCase() === "true") {
          return { value: true, type: Type.BOOLEANO }
        }
        return { value: false, type: Type.BOOLEANO }
      case Type.CADENA:
        return { value: this.value, type: Type.CADENA }
    }
  }
}

module.exports.Primitivo = Primitivo;