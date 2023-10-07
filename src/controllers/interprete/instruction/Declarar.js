const { Instruction } =  require("../abstract/Instruction");

class Declarar extends Instruction {

  constructor(id, tipo, line, column) {
    super(line, column)
    this.id = id
    this.tipo = tipo
  }

  execute(env) {
    env.guardar(this.id, null, this.tipo, this.line, this.column)
  }
}

module.exports.Declarar = Declarar;
