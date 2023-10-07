const { Expression } = require("../abstract/Expression");
const { Type } = require("../abstract/Return");

class Relacional extends Expression {
    constructor(izquierdo, derecho, tipoOperacion, line, column) {
        super(line, column);
        this.izquierdo = izquierdo;
        this.derecho = derecho;
        this.tipoOperacion = tipoOperacion;
    }

    execute(env) {
        // menor igual
        if (this.tipoOperacion == "<=") {
            // obtener los valores de  los operandos
            const op1 = this.izquierdo.execute(env);
            const op2 = this.derecho.execute(env);
            // obtener el tipo de dato de los operandos
            return { value: op1.value <= op2.value, type: Type.BOOLEANO };
        } //  Mayor igual
        else if (this.tipoOperacion == ">=") {
            // obtener los valores de  los operandos
            const op1 = this.izquierdo.execute(env);
            const op2 = this.derecho.execute(env);
            return { value: op1.value >= op2.value, type: Type.BOOLEANO };
        } //  UNARIO
        else if (this.tipoOperacion == "!") {
            // obtener los valores de  los operandos
            const op2 = this.izquierdo.execute(env);
            return { value: !op2.value, type: Type.BOOLEANO };
        } // igual
        else if (this.tipoOperacion == "==") {
            const op1 = this.izquierdo.execute(env);
            const op2 = this.derecho.execute(env);
            return { value: op1.value == op2.value, type: Type.BOOLEANO };
        } //
        else if (this.tipoOperacion == "!=") {
            const op1 = this.izquierdo.execute(env);
            const op2 = this.derecho.execute(env);
            return { value: op1.value != op2.value, type: Type.BOOLEANO };
        } //mayor
        else if (this.tipoOperacion == ">") {
            const op1 = this.izquierdo.execute(env);
            const op2 = this.derecho.execute(env);
            return { value: op1.value > op2.value, type: Type.BOOLEANO };
        } // menor
        else if (this.tipoOperacion == "<") {
            const op1 = this.izquierdo.execute(env);
            const op2 = this.derecho.execute(env);
            return { value: op1.value < op2.value, type: Type.BOOLEANO };
        }
    }
}

module.exports.Relacional = Relacional;
