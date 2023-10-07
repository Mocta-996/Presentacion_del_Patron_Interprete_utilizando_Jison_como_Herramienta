const { Return, Type } = require('./Return'); 

class Simbolo {
    constructor(valor, id, type) {
      this.valor = valor
      this.id = id.toLowerCase()
      this.type = type
    }
}

module.exports = Simbolo;