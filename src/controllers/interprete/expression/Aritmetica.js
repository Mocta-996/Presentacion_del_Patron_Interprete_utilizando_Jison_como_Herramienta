const { Expression } =require("../abstract/Expression");
const { Type } = require ("../abstract/Return");

class Aritmetica extends Expression {
  constructor(izquierdo, derecho, tipoOperacion, line, column) {
    super(line, column)
    this.izquierdo = izquierdo   
    this.derecho = derecho
    this.tipoOperacion = tipoOperacion
  }

  execute(env) {
    // verificar el tipo de operacion
    if (this.tipoOperacion =="+") {
      // obtener los valores de  los operandos
      const op1 = this.izquierdo.execute(env) // expresion
      const op2 = this.derecho.execute(env)
      // obtener el tipo de dato de los operandos
      return { value: op1.value + op2.value, type: Type.NUMERO }
    } //  RESTA
    else if (this.tipoOperacion == "-") {
      // obtener los valores de  los operandos
      const op1 = this.izquierdo.execute(env)
      const op2 = this.derecho.execute(env)
      return { value: op1.value - op2.value, type: Type.NUMERO }
    } //  UNARIO
    else if (this.tipoOperacion == "unario") {
      // obtener los valores de  los operandos
      const op2 = this.izquierdo.execute(env)
        return { value: -1 * op2.value, type: Type.NUMERO }
     
    }// multiplicacion
    else if (this.tipoOperacion == "*"){
        const op1 = this.izquierdo.execute(env)
        const op2 = this.derecho.execute(env)
        return { value: op1.value * op2.value, type: Type.NUMERO }
    }// division
    else if(this.tipoOperacion == "/"){
        const op1 = this.izquierdo.execute(env)
        const op2 = this.derecho.execute(env)
        return { value: op1.value / op2.value, type: Type.NUMERO }
    }
    
  }

  
}

module.exports.Aritmetica = Aritmetica;