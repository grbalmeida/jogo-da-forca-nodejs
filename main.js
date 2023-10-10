const readline = require('readline');
const palavras = require('./palavras.json');
const keys = require('./dicas.json');
const jogo = require('./jogo');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function getAnswer (prompt) {
    const answer = await new Promise((resolve, reject) => {
        rl.question(`${prompt}\n`, (answer) => {
            resolve(answer);
	});
    });

    return answer;
}

const geraChaveAleatoria = () => {
    const chaves = Object.keys(palavras);
    const quantidadeChaves = chaves.length;
    const numeroAleatorio = Math.floor(Math.random() * quantidadeChaves);
    return chaves[numeroAleatorio];
}

const geraPalavraAleatoria = (chave) => {
    const numeroAleatorio = Math.floor(Math.random() * palavras[chave].length);
    return palavras[chave][numeroAleatorio];
}

const run = async() => {
    const chave = geraChaveAleatoria();
    const palavra = geraPalavraAleatoria(chave).toUpperCase();

    console.log(`DICA: ${keys[chave]}`);
    console.log(jogo.desenharForca());
    console.log(jogo.desenharLetrasAcertadas(palavra).display);

    while (jogo.numeroTentativas > 0) {
            
        const letra = await getAnswer('Digite uma letra');
        
        var retorno = jogo.joga(palavra, letra);

        if (retorno.erro) {
            console.log(retorno.erro);
            continue;
        }

        console.log(jogo.desenharForca());
        var display = jogo.desenharLetrasAcertadas(palavra);
        console.log(display.display);

        if (display.ganhou) {
            console.log('Parabéns, você acertou a palavra!');
            break;
        }
    }

    if (jogo.numeroTentativas === 0) {
        console.log(jogo.desenharForca());
        console.log(jogodesenharLetrasAcertadas(palavra).display);
        console.log('Número de tentativas máximas executadas!');
        console.log(`A palavra era ${palavra}`);
    }

    const desejaContinuar = await getAnswer('Quer jogar novamente (S/N)?');

    if (desejaContinuar.toUpperCase() === 'S') {
        jogo.reiniciar();
        run();
    } else {
        rl.close();
        console.log('Jogo encerrado!');
    }
}

run();
