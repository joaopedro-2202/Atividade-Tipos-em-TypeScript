
type Placa = string;
type Periodo = [entrada: number, saida: number];

// 1. Tipos dos veículos
type Carro = {
    readonly placa: Placa;
    tipo: "carro";
    portas: 2 | 4;
};

type Moto = {
    readonly placa: Placa;
    tipo: "moto";
    cilindradas: number;
};

type Caminhao = {
    readonly placa: Placa;
    tipo: "caminhao";
    eixos: number;
};

type Veiculo = Carro | Moto | Caminhao;

// 2. Situação do ticket
enum SituacaoTicket {
    Aberto = "ABERTO",
    Pago = "PAGO"
}

// 3. Objeto do ticket
type Ticket = {
    veiculo: Veiculo;
    periodo: Periodo;
    selo: boolean;
    situacao: SituacaoTicket;
    valor?: number;
};

// Função para erros que não retornam normalmente
function falhar(mensagem: string): never {
    throw new Error(mensagem);
}

// 4. Calcula a tarifa conforme o tipo e a quantidade de horas
function calcularTarifa(v: Veiculo, horas: number): number {
    // Todo veículo paga pelo menos uma hora.
    const horasCobradas = Math.max(1, Math.ceil(horas));

    switch (v.tipo) {
        case "carro":
            return 8 + (horasCobradas - 1) * 5;

        case "moto":
            return 4 + (horasCobradas - 1) * 2;

        case "caminhao":
            return 15 + (horasCobradas - 1) * 10;

        default: {
            // Se um novo tipo for adicionado à união e não for
            // tratado no switch, o TypeScript acusará um erro.
            const _naoTratado: never = v;
            return _naoTratado;
        }
    }
}

// 5. Fecha um ticket sem modificar o objeto original
function fecharTicket(t: Ticket): Ticket {
    const horas = Math.max(
        1,
        Math.ceil(t.periodo[1] - t.periodo[0])
    );

    let valor = calcularTarifa(t.veiculo, horas);

    // Aplica 50% de desconto para quem possui selo.
    if (t.selo) {
        valor *= 0.5;
    }

    // Spread cria um novo objeto.
    return {
        ...t,
        valor,
        situacao: SituacaoTicket.Pago
    };
}

// 6. Registra a mensagem no console
function registrar(msg: string): void {
    console.log(msg);
}

// Formata o ticket para o relatório
function formatarTicket(t: Ticket): string {
    const horas = Math.max(
        1,
        Math.ceil(t.periodo[1] - t.periodo[0])
    );

    const valor = t.valor ?? 0;
    const desconto = t.selo ? " (selo -50%)" : "";

    return (
        `[${t.situacao}] ${t.veiculo.placa} ` +
        `(${t.veiculo.tipo}) - ${horas}h - ` +
        `R$ ${valor.toFixed(2)}${desconto}`
    );
}

// 7. Validação dos dados externos
function ehObjeto(
    valor: unknown
): valor is Record<string, unknown> {
    return typeof valor === "object" && valor !== null;
}

function lerVeiculo(json: string): Veiculo {
    let dados: unknown;

    try {
        dados = JSON.parse(json);
    } catch {
        return falhar("JSON malformado");
    }

    if (!ehObjeto(dados)) {
        return falhar("objeto de veículo inválido");
    }

    if (typeof dados.placa !== "string") {
        return falhar('campo "placa" inválido');
    }

    if (typeof dados.tipo !== "string") {
        return falhar('campo "tipo" inválido');
    }

    switch (dados.tipo) {
        case "carro":
            if (dados.portas !== 2 && dados.portas !== 4) {
                return falhar('campo "portas" inválido');
            }

            return {
                placa: dados.placa,
                tipo: "carro",
                portas: dados.portas
            };

        case "moto":
            if (
                typeof dados.cilindradas !== "number" ||
                !Number.isFinite(dados.cilindradas) ||
                dados.cilindradas <= 0
            ) {
                return falhar('campo "cilindradas" inválido');
            }

            return {
                placa: dados.placa,
                tipo: "moto",
                cilindradas: dados.cilindradas
            };

        case "caminhao":
            if (
                typeof dados.eixos !== "number" ||
                !Number.isInteger(dados.eixos) ||
                dados.eixos <= 0
            ) {
                return falhar('campo "eixos" inválido');
            }

            return {
                placa: dados.placa,
                tipo: "caminhao",
                eixos: dados.eixos
            };

        default:
            return falhar(`tipo "${dados.tipo}" desconhecido`);
    }
}

// 8. Dados de teste
const tickets: Ticket[] = [
    {
        veiculo: {
            placa: "ABC1D23",
            tipo: "carro",
            portas: 4
        },
        periodo: [8, 11],
        selo: false,
        situacao: SituacaoTicket.Aberto
    },
    {
        veiculo: {
            placa: "MOT0A12",
            tipo: "moto",
            cilindradas: 160
        },
        periodo: [9, 10],
        selo: false,
        situacao: SituacaoTicket.Aberto
    },
    {
        veiculo: {
            placa: "CAM9Z99",
            tipo: "caminhao",
            eixos: 3
        },
        periodo: [7, 12],
        selo: false,
        situacao: SituacaoTicket.Aberto
    },
    {
        veiculo: {
            placa: "XYZ4E56",
            tipo: "carro",
            portas: 2
        },
        periodo: [14, 16],
        selo: true,
        situacao: SituacaoTicket.Aberto
    }
];

// Fecha todos os tickets usando map.
const ticketsFechados: Ticket[] = tickets.map(fecharTicket);

// Exibe cada ticket fechado.
ticketsFechados
    .filter(t => t.situacao === SituacaoTicket.Pago)
    .map(formatarTicket)
    .forEach(registrar);

// Calcula o faturamento com reduce.
const faturamento = ticketsFechados.reduce(
    (soma, ticket) => soma + (ticket.valor ?? 0),
    0
);

console.log(`Faturamento: R$ ${faturamento.toFixed(2)}`);

// Conta os veículos de cada tipo.
const entradas = ticketsFechados.reduce(
    (contagem, ticket) => {
        contagem[ticket.veiculo.tipo]++;
        return contagem;
    },
    { carro: 0, moto: 0, caminhao: 0 }
);

console.log(
    `Entradas: carro=${entradas.carro}, ` +
    `moto=${entradas.moto}, caminhao=${entradas.caminhao}`
);

// 9. Teste de leitura de veículo recebido como JSON.
try {
    const veiculo = lerVeiculo(
        '{"placa":"ABC1D23","tipo":"carro","portas":4}'
    );

    console.log("Veículo validado:", veiculo.placa);
} catch (erro: unknown) {
    if (erro instanceof Error) {
        console.log("Erro ao ler veículo:", erro.message);
    }
}

// Teste de um tipo desconhecido.
try {
    lerVeiculo('{"placa":"BIC1C23","tipo":"bicicleta"}');
} catch (erro: unknown) {
    if (erro instanceof Error) {
        console.log("Erro ao ler veículo:", erro.message);
    }
}

// 10. Teste da verificação exaustiva com never
// Experimente adicionar o tipo abaixo à união Veiculo:
//
// type Van = {
//     readonly placa: Placa;
//     tipo: "van";
//     lugares: number;
// };
//
// type Veiculo = Carro | Moto | Caminhao | Van;
//
// Se Van for adicionado à união, o switch de calcularTarifa
// acusará erro na atribuição: const _naoTratado: never = v;
// Isso acontece porque Van ainda não foi tratado.
// O never ajuda a detectar tipos que ficaram sem tratamento.
