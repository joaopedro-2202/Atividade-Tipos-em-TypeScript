type Item = {
    nome: string;
    preco: number;
    quantidade: number;
};

// 1. Criando a lista de compras
const itens: Item[] = [
    { nome: "Arroz 5kg", preco: 28.90, quantidade: 1 },
    { nome: "Feijão 1kg", preco: 8.49, quantidade: 2 },
    { nome: "Leite 1L", preco: 4.99, quantidade: 6 },
    { nome: "Café 500g", preco: 17.90, quantidade: 1 },
    { nome: "Sabão em pó", preco: 12.50, quantidade: 1 }
];

// 2. Obtendo os nomes com map
const nomes: string[] = itens.map(item => item.nome);

// Filtrando os itens com preço unitário maior que R$ 10
const caros: Item[] = itens.filter(item => item.preco > 10);

// Calculando o valor total com reduce
const total: number = itens.reduce(
    (soma, item) => soma + item.preco * item.quantidade,
    0
);

console.log("Itens:", nomes.join(", "));
console.log("Acima de R$ 10:", caros.map(item => item.nome).join(", "));
console.log("Total da compra: R$", total.toFixed(2));

// 3. Array somente para leitura
const categorias: readonly string[] = [
    "Mercearia",
    "Laticínios",
    "Limpeza"
];

// 4. Matriz com as quantidades das prateleiras
const prateleiras: number[][] = [
    [2, 0, 1],
    [4, 4],
    [1]
];

// Soma todos os números de todas as prateleiras
const totalGuardado: number = prateleiras.reduce(
    (total, prateleira) =>
        total + prateleira.reduce((soma, quantidade) => soma + quantidade, 0),
    0
);

console.log("Itens na despensa:", totalGuardado);

// 5. Desestruturação
const [primeiro, segundo] = itens;

console.log("Primeiro item:", primeiro.nome);
console.log("Segundo item:", segundo.nome);

// Spread cria uma nova lista sem modificar a original
const novaLista: Item[] = [
    ...itens,
    { nome: "Açúcar 1kg", preco: 5.50, quantidade: 1 }
];

console.log("Quantidade original:", itens.length);
console.log("Quantidade na nova lista:", novaLista.length);
