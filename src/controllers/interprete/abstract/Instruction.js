const { Environment } = require("./Environment");

class Instruction {
  constructor(line, column) {
    this.line = line;
    this.column = column;
  }

  execute(environment) {
    // Implementa la lógica de execute aquí
  }

}

module.exports.Instruction = Instruction;