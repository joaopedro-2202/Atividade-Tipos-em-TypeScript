type Notificador = (
    destinatario: string,
    mensagem: string
) => void;

// 1. Notificação por e-mail
const porEmail: Notificador = (destinatario, mensagem) => {
    console.log(`[E-MAIL] para ${destinatario}: ${mensagem}`);
};

// 2. Notificação por SMS
const porSms: Notificador = (destinatario, mensagem) => {
    if (mensagem.length > 160) {
        console.log("SMS ignorado: mensagem longa");
        return;
    }

    console.log(`[SMS] para ${destinatario}: ${mensagem}`);
};

// 3. Notificação pelo aplicativo
const porApp: Notificador = (destinatario, mensagem) => {
    console.log(`[APP] para ${destinatario}: ${mensagem}`);
};

// 4. Envia a mesma mensagem a todos os destinatários
function notificarTodos(
    destinatarios: string[],
    mensagem: string,
    enviar: Notificador
): void {
    destinatarios.forEach(destinatario => {
        enviar(destinatario, mensagem);
    });
}

const mensagemReuniao = "Reunião de pais sexta às 19h";

notificarTodos(
    ["ana@escola.com", "responsavel2@escola.com"],
    mensagemReuniao,
    porEmail
);

notificarTodos(
    ["joao.resp"],
    mensagemReuniao,
    porApp
);

notificarTodos(
    ["(69) 99999-0000"],
    "A".repeat(161),
    porSms
);

// 5. Erro proposital:
// function teste(): void {
//     return 10;
// }
// Uma função declarada com retorno void não pode retornar
// explicitamente um valor como 10.

// 6. Reflexão sobre o retorno void
const contar: Notificador = (destinatario, mensagem) => {
    // O tipo void indica que quem chama não deve depender
    // do valor retornado pela função.
    // Uma função contextualizada como Notificador pode retornar
    // um valor, mas esse valor será ignorado pelo contrato void.
    return mensagem.length;
};
