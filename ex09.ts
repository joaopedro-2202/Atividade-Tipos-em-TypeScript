const respostaOk =
    '{"cidade":"Porto Velho","temperatura":34,"umidade":0.62}';

const respostaQuebrada =
    '{"cidade":"Porto Velho","temperatura":"quente"}';

const respostaInvalida =
    '{ cidade: Porto Velho ';

// 1. Versão insegura usando any
function lerComAny(json: string): void {
    const dados: any = JSON.parse(json);

    console.log(dados.temperatura.toFixed(1));

    // Com respostaQuebrada, ocorre um erro em tempo de execução:
    // temperatura é uma string e não possui o método toFixed().
}

// 2. Função que não retorna porque sempre lança um erro
function falhar(mensagem: string): never {
    throw new Error(mensagem);
}

// Verifica se o valor é um objeto não nulo
function ehObjeto(
    valor: unknown
): valor is Record<string, unknown> {
    return typeof valor === "object" && valor !== null;
}

// 3. Versão segura usando unknown
function lerClima(
    json: string
): { cidade: string; temperatura: number } {
    let dados: unknown;

    try {
        dados = JSON.parse(json);
    } catch (erro: unknown) {
        if (erro instanceof SyntaxError) {
            return falhar("JSON malformado");
        }

        return falhar(
            erro instanceof Error ? erro.message : "Erro desconhecido"
        );
    }

    if (
        !ehObjeto(dados) ||
        !("cidade" in dados) ||
        !("temperatura" in dados)
    ) {
        return falhar("campos obrigatórios ausentes");
    }

    if (typeof dados.cidade !== "string") {
        return falhar('campo "cidade" inválido');
    }

    if (typeof dados.temperatura !== "number") {
        return falhar('campo "temperatura" inválido');
    }

    return {
        cidade: dados.cidade,
        temperatura: dados.temperatura
    };
}

// 4. Testa as três respostas
function testarClima(json: string): void {
    try {
        const clima = lerClima(json);
        console.log(
            `${clima.cidade}: ${clima.temperatura.toFixed(1)}°C`
        );
    } catch (erro: unknown) {
        if (erro instanceof Error) {
            console.log(`Erro: ${erro.message}`);
        } else {
            console.log("Erro desconhecido");
        }
    }
}

testarClima(respostaOk);
testarClima(respostaQuebrada);
testarClima(respostaInvalida);
