var fs = require('fs');

module.exports = {
    numeroTentativas: 6,
    letrasInformadas: [],
    exibir: function(caractere, condicao) {
        return condicao ? caractere : '';
    },
    reiniciar: function() {
        this.numeroTentativas = 6;
        this.letrasInformadas = [];
    },
    desenharForca: function() {
        let personagem = '';
        try {  
            personagem = fs.readFileSync(`./personagens/tentativas_${this.numeroTentativas}.txt`, 'utf8');
        } catch(e) {
            console.log('Error:', e.stack);
        }

        return personagem;
    },
    normalizarString: function(str) {
        return str.toUpperCase().normalize('NFD').replace(/[\u0300-\u036F]/g, '')
    },
    desenharLetrasAcertadas: function(palavra) {
        /*
        A B C D E
        _ _ _ _ _
        */;

        let display = '';
        let numeroLetrasAcertadas = 0;

        const letrasDaPalavra = palavra.split('');
        const letrasDaPalavraSemEspaco = letrasDaPalavra.filter(caractere => Boolean(caractere.trim()));

        letrasDaPalavraSemEspaco.forEach(letra => {
            if (this.letrasInformadas.includes(this.normalizarString(letra))) {
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

        return {display, numeroLetrasAcertadas, ganhou: numeroLetrasAcertadas === letrasDaPalavraSemEspaco.length};
    },
    joga: function(palavra, letra) {
        const palavraNormalizada = palavra.split('').map(caractere => this.normalizarString(caractere));
        const letraNormalizada = this.normalizarString(letra);
        const letraExiste = palavraNormalizada.includes(letraNormalizada);
        const letraJaFoiInformada = this.letrasInformadas.includes(letraNormalizada);

        if (letraJaFoiInformada) {
            return {erro: 'Letra já foi informada!'};
        }

        if (!letraExiste) {
            this.numeroTentativas--;
        }

        this.letrasInformadas.push(letra.toUpperCase());

        return {erro: ''};
    }
};
