
let nomeProduto1:string = 'pão francês', precoUnitario1:number = 0.75, quantidade1:number = 12;
let nomeProduto2:string = 'bolo de cenoura', precoUnitario2:number = 18.5, quantidade2:number = 2;
let quantidade_paes_venderia_ano:Number = 1_250_000;
let aberto = true; //tipo boleano
let categoria:number = 0x1A;

let subtotal1 = 0, subtotal2 = 0, total = 0;

subtotal1 = precoUnitario1*quantidade1;
subtotal2 = precoUnitario2*quantidade2;
total = subtotal1+subtotal2;

console.log('Pão francês: '+quantidade1+' preço: '+precoUnitario1+' total: '+subtotal1);
console.log('Bolo de cenouras: '+quantidade2+' preço: '+precoUnitario2+' total: '+subtotal2);
console.log('Total: '+total);
console.log('Padaria aberta?: '+ aberto);
console.log('Pães vendidos no ano: '+quantidade_paes_venderia_ano);
console.log('Categoria: '+categoria);
