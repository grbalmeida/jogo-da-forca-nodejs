const readline = require('readline');
const palavras = require('./palavras.json');

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

const exibir = (caractere, condicao) => {
    return condicao ? caractere : '';
}

const desenharForca = (numeroTentativas) => {
    return `
_______
|     |
|     ${exibir('O', numeroTentativas < 6)}
|     ${exibir('|', numeroTentativas < 5)}
|    ${exibir('/', numeroTentativas < 4)}${exibir(' ', numeroTentativas == 4)}${exibir('|', numeroTentativas < 5)}${exibir("\\", numeroTentativas < 3)}
|     ${exibir('|', numeroTentativas < 5)}
|    ${exibir("\/", numeroTentativas < 2)} ${exibir("\\", numeroTentativas < 1)}
|
_
`;
};

const desenharLetrasAcertadas = (letrasInformadas, palavra) => {
/*
A B C D E
_ _ _ _ _
*/;

    let display = '';
    let numeroLetrasAcertadas = 0;

    const letrasDaPalavra = palavra.split('');

    letrasDaPalavra.forEach(letra => {
        if (letrasInformadas.includes(letra.toUpperCase())) {
            display += `${letra.toUpperCase()} `;
	    numeroLetrasAcertadas++;
	} else {
            display += ' ';
	}
    });

    display += '\n';

    for (let i = 0; i < letrasDaPalavra.length; i++) {
        display += `_ `;
    }

    return {display, numeroLetrasAcertadas};
};

const keys = {
    frutas: "É uma fruta",
    paises: "É um país",
    estados_brasileiros: "É um estado brasileiro"
};

const run = async() => {
    let numeroTentativas = 6;
    const chave = geraChaveAleatoria();
    const palavra = geraPalavraAleatoria(chave).toUpperCase();
    const letrasInformadas = [];

    console.log(`DICA: ${keys[chave]}`);
    console.log(desenharForca(numeroTentativas));
    console.log(desenharLetrasAcertadas(letrasInformadas, palavra).display);

    while (numeroTentativas > 0) {
         
	const letra = await getAnswer('Digite uma letra');
	letrasInformadas.push(letra.toUpperCase());

	if (!palavra.includes(letra)) {
            numeroTentativas--;
	}

        console.log(desenharForca(numeroTentativas));
	var display = desenharLetrasAcertadas(letrasInformadas, palavra);
        console.log(display.display);

	if (display.numeroLetrasAcertadas === palavra.length) {
            console.log('Parabéns, você acertou a palavra!');
	    break;
	}
    }
   

    if (numeroTentativas === 0) {
	console.log(desenharForca(numeroTentativas));
	console.log(desenharLetrasAcertadas(letrasInformadas, palavra).display);
        console.log('Número de tentativas máximas executadas!');
	console.log(`A palavra era ${palavra}`);
    }

    const desejaContinuar = await getAnswer('Quer jogar novamente (S/N)?');

    if (desejaContinuar.toUpperCase() === 'S') {
        run();
    } else {
        rl.close();
	console.log('Jogo encerrado!');
    }
}

run();
