const { Instruction } =  require("../abstract/Instruction");

class Asignar extends Instruction {

  constructor(id, valor, line, column) {
    super(line, column)
    this.id = id
    this.valor = valor
  }

  execute(env) {
    // obtener el valor de la expresión
    let val = this.valor.execute(env)
    env.modificar(this.id,val.value)
  }
}

module.exports.Asignar = Asignar;
