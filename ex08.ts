type Codigo = number | string;

// 1. Formata o código do cliente
function formatarCodigo(c: Codigo): string {
    // Se for texto, remove o prefixo CLI-, caso exista.
    const numeroTexto = typeof c === "string"
        ? c.replace(/^CLI-/, "")
        : String(c);

    return `CLI-${numeroTexto.padStart(4, "0")}`;
}

const codigo: Codigo = 42;

// 2. Tipo literal para camiseta
type TamanhoCamiseta = "P" | "M" | "G" | "GG";

const camiseta: TamanhoCamiseta = "M";

// Erro proposital:
// const tamanhoInvalido: TamanhoCamiseta = "XG";
// XG não pertence às opções definidas no tipo.

// 3. Calcula o frete pela região
type Regiao =
    | "norte"
    | "nordeste"
    | "centro-oeste"
    | "sudeste"
    | "sul";

function calcularFrete(regiao: Regiao): number {
    switch (regiao) {
        case "norte": return 25;
        case "nordeste": return 20;
        case "centro-oeste": return 18;
        case "sudeste": return 12;
        case "sul": return 15;
    }
}

// 4. Complemento opcional representado por null
const complemento: string | null = null;

const textoComplemento: string =
    complemento === null ? "(sem complemento)" : complemento;

// 5. Remove todos os caracteres que não são dígitos
function limparTelefone(tel: string | number): string {
    return String(tel).replace(/\D/g, "");
}

// 6. Inferência de literais
const r = "sul";
// const mantém o literal "sul", então pode ser usado como Regiao.
console.log("Frete:", calcularFrete(r));

let r2 = "sul";
// let r2 = "sul" infere string, que pode receber outros textos.
// Por isso, não pode ser passado diretamente como Regiao.

// Corrigido com as const:
const r3 = r2 as Regiao;
console.log("Frete corrigido:", calcularFrete(r3));

// Exemplo de cadastro
console.log(`Cliente: ${formatarCodigo(codigo)} | Camiseta: ${camiseta}`);
console.log(`Entrega: Rua das Flores, 100 - ${textoComplemento}`);
console.log(`Frete para o sul: R$ ${calcularFrete("sul").toFixed(2)}`);
console.log("Telefone:", limparTelefone("(69) 99999-0000"));
console.log("Telefone numérico:", limparTelefone(69999990000));
