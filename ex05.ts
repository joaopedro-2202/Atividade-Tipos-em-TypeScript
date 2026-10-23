type Leitura = [cidade: string, temperatura: number];

// 1. Array de tuplas
const leituras: Leitura[] = [
    ["Porto Velho", 34],
    ["Curitiba", 12],
    ["Manaus", 31],
    ["Porto Alegre", 9],
    ["Natal", 29]
];

// 2. Retorna a temperatura mínima e máxima
function extremos(temps: number[]): [number, number] {
    return [
        Math.min(...temps),
        Math.max(...temps)
    ];
}

const temperaturas: number[] = leituras.map(
    ([cidade, temperatura]) => temperatura
);

const [minima, maxima] = extremos(temperaturas);

// 3. Percorrendo as tuplas com for...of
for (const [cidade, temp] of leituras) {
    console.log(`${cidade}: ${temp}°C`);
}

console.log(`Mínima: ${minima}°C | Máxima: ${maxima}°C`);

// 4. Tupla com e-mail opcional
type ContatoImprensa = [
    nome: string,
    telefone: string,
    email?: string
];

const contatoComEmail: ContatoImprensa = [
    "Ana",
    "(69) 99999-0000",
    "ana@exemplo.com"
];

const contatoSemEmail: ContatoImprensa = [
    "João",
    "(69) 98888-0000"
];

// 5. Tupla com rest: cidade seguida de temperaturas
// type Historico = [cidade: string, ...temperaturas: number[]];
type Historico = [...temperaturas: number[]];

const historico: Historico = [
    30,
    32,
    34,
    28,
    31
];

const valoresHistorico = historico;

const media: number = Number(valoresHistorico.reduce(
    (soma, temp) => soma + temp,
    0
)) / valoresHistorico.length;

console.log(`Média: ${media.toFixed(1)}°C`);

// 6. Tupla readonly
const capitalOficial: readonly [string, string] = [
    "RO",
    "Porto Velho"
];

// Erro proposital:
// capitalOficial[1] = "Ji-Paraná";
// A tupla readonly não permite alterar suas posições.
