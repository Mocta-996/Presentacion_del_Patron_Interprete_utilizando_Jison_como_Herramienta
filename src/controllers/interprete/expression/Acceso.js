const { Expression } =require("../abstract/Expression");

class Acceso extends Expression {
    constructor(id, line, column) {
      super(line, column)
      this.id = id
    }
  
    // ejecuar el objeto
    // retorna un valor primivito
  
    execute(env) {
      const value = env.getVar(this.id)
      console.log("desde acceso:", value.valor)
      return { value: value.valor, type: value.type }
    }
  
}

module.exports.Acceso = Acceso;