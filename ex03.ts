let Paciente1:{
    readonly cpf:String;
    nome:string;
    idade:Number;
    plano:boolean;
    alergias?:string[];
    
    // objeto telefone de contato
    contatoEmergencia?:{
        nome:String;
        telefone:String; 
    }    
} = {
  cpf: "123.456.789-00",
  nome: "João Silva",
  idade: 30,
  plano: true,
  alergias: ["Poeira", "Penicilina"],
  contatoEmergencia: {
    nome: "Maria Silva",
    telefone: "(11) 99999-9999"
  }
};

const Paciente2:{
    readonly cpf:String;
    nome:string;
    idade:Number;
    plano:boolean;
    alergias?:string[];
    
    // objeto telefone de contato
    contatoEmergencia?:{
        nome:String;
        telefone:String; 
    }    
} = {
  cpf: "143.436.239-00",
  nome: "Carlos Maia",
  idade: 30,
  plano: true
};

// erros
Paciente1.cpf = "aaaaaaaaa"; //não vai porque é só leitura
Paciente1.peso; //não existe esse tipo


let dados: object = Paciente1;

// O erro ocorre aqui:
// @ts-expect-error: Property 'nome' does not exist on type 'object'.
let x:{}=10, y: object = 10;
console.log(y.nome); 
/*
    O tipo 'object' no TypeScript é um tipo generico diferente dos tipos primitivos. 
    Como o tipo 'object' é abstrato e não tem nenhuma propriedade declarada na sua estrutura, o TypeStruct não sabe que a propriedade 
  'nome' existe nele, mesmo que o objeto real atribuído ('paciente') a tenha.

*/

function mostrar_informacoes_paciente(paciente:{
    readonly cpf:String;
    nome:string;
    idade:Number;
    plano:boolean;
    alergias?:string[];
    
    // objeto telefone de contato
    contatoEmergencia?:{
        nome:String;
        telefone:String; 
    }}
){
    console.log(paciente.nome+", "+paciente.idade+" anos. "+ "Alergias: "+String(paciente.alergias?paciente.alergias:" Sem alergias registradas"));
}

mostrar_informacoes_paciente(Paciente1);
mostrar_informacoes_paciente(Paciente2);
