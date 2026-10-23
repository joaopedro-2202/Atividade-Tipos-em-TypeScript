function formataNome(nome:string){
    const conectivos = ['da', 'de', 'do', 'das', 'dos', 'e'];
    return nome
    .trim()
    .replace(/\s+/g, " ")
    .toLocaleLowerCase()
    .split(" ")
    .map(
        palavra =>{
            if(conectivos.includes(palavra)){
                return palavra.toLocaleLowerCase();
            }
            return palavra.charAt(0).toUpperCase() + palavra.slice(1);
        }
    ).join(" ");
}

let nome:string = formataNome(' maria    da   silva');
let precoLido = Number('12.40'), quantidadeLido = parseInt('3un'), subtotal:Number = precoLido*quantidadeLido;
let porcentagem_desconto:Number = 5; let descontar:Number =  Number(subtotal) * (Number(porcentagem_desconto)/100);
let total:Number = Number(subtotal)-Number(descontar);
let numero_cupom:Number = 142;

let clienteFidelidade:boolean = true;

let template: string = 
    "CUPOM N° "+numero_cupom.toString().padStart(6, "0")+"\n"+
    "cliente: "+nome+"\n"+
    "subtotal: "+subtotal.toFixed(2)+"\n"+
    "item: "+quantidadeLido.toFixed(0)+" X "+precoLido.toFixed(2)+"\n"+
    "desconto: "+descontar.toFixed(2)+"\n"+
    "total: "+total.toFixed(2)+"\n"
;

console.log(template);
