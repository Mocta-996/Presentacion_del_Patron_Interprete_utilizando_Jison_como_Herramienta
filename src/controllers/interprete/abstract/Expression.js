const { Return } = require('./Return');
const { Environment } = require('./Environment');

class Expression {
  constructor(line, column) {
    this.line = line;
    this.column = column;
  }

  execute(environment) {
    // Implementa la lógica de execute aquí
  }

}
module.exports.Expression = Expression;

