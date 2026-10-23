
enum StatusPedido {
    Recebido = 1,
    EmPreparo,
    SaiuParaEntrega,
    Entregue,
    Cancelado
}

// Enum de strings
enum FormaPagamento {
    PIX = "PIX",
    CARTAO = "CARTAO",
    DINHEIRO = "DINHEIRO"
}

// 1. Mensagem conforme o status
function mensagem(status: StatusPedido): string {
    switch (status) {
        case StatusPedido.Recebido:
            return "Recebemos seu pedido!";

        case StatusPedido.EmPreparo:
            return "Seu pedido está sendo preparado 🍳";

        case StatusPedido.SaiuParaEntrega:
            return "O entregador está a caminho 🛵";

        case StatusPedido.Entregue:
            return "Pedido entregue. Bom apetite!";

        case StatusPedido.Cancelado:
            return "Seu pedido foi cancelado.";

        default:
            return "Status desconhecido.";
    }
}

// 2. Avança para a próxima etapa
function avancar(status: StatusPedido): StatusPedido {
    switch (status) {
        case StatusPedido.Recebido:
            return StatusPedido.EmPreparo;

        case StatusPedido.EmPreparo:
            return StatusPedido.SaiuParaEntrega;

        case StatusPedido.SaiuParaEntrega:
            return StatusPedido.Entregue;

        case StatusPedido.Entregue:
        case StatusPedido.Cancelado:
            return status;
    }
}

// 3. Mapeamento reverso do enum numérico
console.log(StatusPedido[2]); // EmPreparo

// 4. Simulação do pedido
let status: StatusPedido = StatusPedido.Recebido;

while (true) {
    console.log(
        `[${status} - ${StatusPedido[status]}] ${mensagem(status)}`
    );

    if (
        status === StatusPedido.Entregue ||
        status === StatusPedido.Cancelado
    ) {
        break;
    }

    status = avancar(status);
}

// 5. Forma de pagamento
const pagamento: FormaPagamento = FormaPagamento.PIX;

console.log("Pagamento:", pagamento);

// Erro proposital:
// const pagamentoErrado: FormaPagamento = "PIX";
// O enum de strings exige um membro do próprio enum.
// Use FormaPagamento.PIX.
