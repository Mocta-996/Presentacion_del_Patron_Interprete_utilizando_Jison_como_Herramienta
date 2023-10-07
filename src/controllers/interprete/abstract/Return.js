const Type = {
    NUMERO: 0,
    BOOLEANO: 1,
    CADENA: 2
  }
  
const Return = {
    value: null,
    type: Type // Usamos typeof para referenciar la enumeración Type
  };
  
  module.exports.Return = Return;
  module.exports.Type = Type; 