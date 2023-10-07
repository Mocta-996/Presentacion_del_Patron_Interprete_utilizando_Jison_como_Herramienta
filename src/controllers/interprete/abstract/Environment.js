const Simbolo  = require("./Symbol");
const { Type } = require("./Return");
const { listaImprimir } = require("../utils/ListaImprimir");

class Environment {
  constructor(anterior) {
    this.variables = new Map(); // mapa de variables
    this.anterior = anterior || null;
  }

  guardar(id, valor, tipo, linea, columna) {
    // verificar el ámbito
    let env = this;

    // verificar si la variable ya existe
    if (!env.variables.has(id.toLowerCase())) {
      // guardar la variable
      // guardar la variable en una tabla de símbolos para el reporte
      env.variables.set(id.toLowerCase(), new Simbolo(valor, id, tipo));
    } else {
      printlist.push(
        "Error, La variable " + id + " ya existe en el entorno, línea " + linea + " y columna " + columna
      );
    }
  }

  modificar(id, valor) {
    // verificar el ámbito
    let env = this;
    while (env !== null) {
      // verificar si la variable existe
      if (env.variables.has(id.toLowerCase())) {
        // modificar la variable
        env.variables.get(id.toLowerCase()).valor = valor;
        return;
      }
      // cambiar de ámbito
      env = env.anterior;
    }
  }

  getVar(id) {
    // verificar el ámbito
    let env = this;

    // buscar la variable
    while (env !== null) {
      // verificar si la variable existe
      if (env.variables.has(id.toLowerCase())) {
        // retornar la variable
        return env.variables.get(id.toLowerCase());
      }
      // cambiar de ámbito
      env = env.anterior;
    }

    // retornar null si no se encontró la variable
    return null;
  }


  getGlobal() {
    // verificar el ámbito
    let env = this;

    // buscar el ámbito global
    while (env.anterior !== null) {
      // cambiar de ámbito
      env = env.anterior;
    }

    // retornar el ámbito global
    return env;
  }
}

module.exports = Environment;
