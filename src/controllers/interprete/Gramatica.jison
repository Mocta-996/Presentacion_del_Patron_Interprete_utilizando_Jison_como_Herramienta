/**
 * Presentacion del Patron Interprete utilizando Jison como Herramienta 
 */

/* Definición Léxica */
%lex

%options case-insensitive

%%
\n                 		                     // salto
\s+											// se ignoran espacios en blanco
"//".*										// comentario simple línea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]			// comentario multiple líneas

"imprimir"			return 'TK_IMPRIMIR';
"numero"			return 'TK_NUMERO';
"cadena"			return 'TK_CADENA';
"si"				return 'TK_SI';
"else"				return 'TK_ELSE';

":"					return 'TK_DOSPUNTOS';
";"					return 'TK_PTCOMA';
"{"					return 'TK_LLAVIZQ';
"}"					return 'TK_LLAVDER';
"("					return 'TK_PARIZQ';
")"					return 'TK_PARDER';

"+"				return 'TK_MAS';
"-"				return 'TK_MENOS';
"*"				return 'TK_POR';
"/"				return 'TK_DIVIDIDO';

"<="				return 'TK_MENIGUAL';
">="				return 'TK_MAYIGUAL';
"=="				return 'TK_DOBLEIGUAL';
"!="				return 'TK_NOIGUAL';

"<"					return 'TK_MENQUE';
">"					return 'TK_MAYQUE';
"="					return 'TK_IGUAL';

"!"					return 'TK_NOT';

\"[^\"]*\"				{ yytext = yytext.substr(1,yyleng-2); return 'CADENA'; }
[0-9]+\b				return 'ENTERO';
([a-zA-Z])[a-zA-Z0-9_]*	return 'IDENTIFICADOR';


<<EOF>>				return 'EOF';
.					{ console.error('Error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }

/lex


%{
    const {Type} = require('./abstract/Return');
    const {Imprimir} = require('./instruction/Imprimir');
	const {Declarar} = require('./instruction/Declarar');
	const {Asignar} = require('./instruction/Asignar');
	const {Primitivo}   = require('./expression/Primitivo');
	const {Acceso} = require('./expression/Acceso');
	const {Aritmetica} = require('./expression/Aritmetica');
	const {Relacional} = require('./expression/Relacional');
%}


/* Asociación de operadores y precedencia */
%left 'TK_DOBLEIGUAL'  'TK_NOIGUAL'
%left 'TK_MAYQUE' 'TK_MENQUE' 'TK_MAYIGUAL' 'TK_MENIGUAL'
%left 'TK_MAS' 'TK_MENOS'
%left 'TK_POR' 'TK_DIVIDIDO'
%right UMENOS 'TK_NOT'

%start ini

%% /* Definición de la gramática */

ini
	: instrucciones EOF {
		// cuado se haya reconocido la entrada completa retornamos el AST
		return $1;
	}
;

instrucciones
	: instrucciones instruccion 	{ $1.push($2); $$ = $1; }
	| instruccion					{ $$ = [$1]; }
;

instruccion
	: imprimir	{ $$ = $1; }
	| declarar	{ $$ = $1; }
	| asingar	{ $$ = $1; }
	| error { console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); }
;

imprimir 
	: TK_IMPRIMIR TK_PARIZQ expresion TK_PARDER TK_PTCOMA	{ $$ = new Imprimir(@1.first_line, @1.first_column,$3); }
;

declarar
	: tipos IDENTIFICADOR TK_PTCOMA	{ $$ = new Declarar($2,$1,@1.first_line, @1.first_column);}
;

asingar
	: IDENTIFICADOR TK_IGUAL expresion TK_PTCOMA	{ $$ = new Asignar($1,$3,@1.first_line, @1.first_column);}

;



expresion
    :primitivos     { $$ = $1; }
	|acceso        { $$ = $1; }
	|expresion_aritmetica    { $$ = $1; }
	|expresion_relacional    { $$ = $1; }
;


expresion_aritmetica 
	: TK_MENOS expresion %prec UMENOS { $$ = new Aritmetica($2,null,"unario",@2.first_line, @2.first_column); }
	| expresion TK_MAS expresion { $$ = new Aritmetica($1,$3,"+",@2.first_line, @2.first_column); }
	| expresion TK_MENOS expresion { $$ = new Aritmetica($1,$3,"-",@2.first_line, @2.first_column); }
	| expresion TK_POR expresion { $$ = new Aritmetica($1,$3,"*",@2.first_line, @2.first_column); }
	| expresion TK_DIVIDIDO expresion { $$ = new Aritmetica($1,$3,"/",@2.first_line, @2.first_column); }
;


expresion_relacional
	: expresion TK_MAYIGUAL expresion		{ $$ = new Relacional($1,$3,">=",@2.first_line, @2.first_column); }
	| expresion TK_MENIGUAL expresion		{ $$ = new Relacional($1,$3,"<=",@2.first_line, @2.first_column); }
	| expresion TK_MAYQUE expresion		{ $$ = new Relacional($1,$3,">",@2.first_line, @2.first_column); }
	| expresion TK_MENQUE expresion		{ $$ = new Relacional($1,$3,"<",@2.first_line, @2.first_column); }
	| expresion TK_DOBLEIGUAL expresion	{ $$ = new Relacional($1,$3,"==",@2.first_line, @2.first_column); }
	| expresion TK_NOIGUAL expresion		{ $$ = new Relacional($1,$3,"!=",@2.first_line, @2.first_column); }
	| TK_NOT expresion 		{ $$ = new Relacional($1,null,"!",@2.first_line, @2.first_column); }
;
acceso
	: IDENTIFICADOR { $$ = new Acceso($1,@1.first_line, @1.first_column); }
;
primitivos
    : ENTERO	{ $$ = new Primitivo(@1.first_line, @1.first_column,$1,Type.NUMERO); }
	| CADENA	{ $$ = new Primitivo(@1.first_line, @1.first_column,$1,Type.CADENA); }
;

tipos
	:TK_NUMERO { $$ = Type.NUMERO; }
	|TK_CADENA { $$ = Type.CADENA; }
;


