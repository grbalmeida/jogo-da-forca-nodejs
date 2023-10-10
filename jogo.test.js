const jogo = require('./jogo');

test('TEST - exibir - Deve exibir caractere se condição for true', () => {
    let tentativas = 5;
    expect(jogo.exibir('O', tentativas < 6)).toBe('O');

    tentativas = 4;
    expect(jogo.exibir('|', tentativas < 5)).toBe('|');
});

test('TEST - exibir - Não deve exibir caractere se condição for false', () => {
    expect(jogo.exibir('X', false)).toBe('');
    expect(jogo.exibir('Z', false)).toBe('');
});

test('TEST - reiniciar - Deve reiniciar o jogo', () => {
    jogo.numeroTentativas = 0;
    jogo.reiniciar();
    expect(jogo.numeroTentativas).toBe(6);
    expect(jogo.letrasInformadas.length).toBe(0);

    jogo.numeroTentativas = 3;
    jogo.reiniciar();
    expect(jogo.numeroTentativas).toBe(6);
    expect(jogo.letrasInformadas.length).toBe(0);
});

test('TEST - desenharForca - Deve desenhar a forca sem personagem', () => {
    jogo.reiniciar();
    expect((jogo.desenharForca().match(/O/g) || []).length).toBe(0);
    expect((jogo.desenharForca().match(/\|/g) || []).length).toBe(8);
    expect((jogo.desenharForca().match(/\//g) || []).length).toBe(0);
    expect((jogo.desenharForca().match(/[\\]/g) || []).length).toBe(0);
});

test('TEST - desenharForca - Deve desenhar a forca com a cabeça', () => {
    jogo.reiniciar();
    let palavra = 'ARROZ';
    jogo.joga(palavra, 'Q');
    expect((jogo.desenharForca().match(/O/g) || []).length).toBe(1);
    expect((jogo.desenharForca().match(/\|/g) || []).length).toBe(8); // valor inicial, só tem 8 pipes porque a forca esta vazia
    expect((jogo.desenharForca().match(/\//g) || []).length).toBe(0);
    expect((jogo.desenharForca().match(/[\\]/g) || []).length).toBe(0);
});

test('TEST - desenharForca - Deve desenhar a forca com o tronco', () => {
    jogo.reiniciar();
    let palavra = 'ARROZ';
    jogo.joga(palavra, 'Q');
    jogo.joga(palavra, 'W');
    expect((jogo.desenharForca().match(/O/g) || []).length).toBe(1);
    expect((jogo.desenharForca().match(/\|/g) || []).length).toBe(11); // valor inicial + 3 pipes do tronco
    expect((jogo.desenharForca().match(/\//g) || []).length).toBe(0);
    expect((jogo.desenharForca().match(/[\\]/g) || []).length).toBe(0);
});

test('TEST - desenharForca - Deve desenhar a forca com o braço direito', () => {
    jogo.reiniciar();
    let palavra = 'ARROZ';
    jogo.joga(palavra, 'Q');
    jogo.joga(palavra, 'W');
    jogo.joga(palavra, 'Y');
    expect((jogo.desenharForca().match(/O/g) || []).length).toBe(1);
    expect((jogo.desenharForca().match(/\|/g) || []).length).toBe(11);
    expect((jogo.desenharForca().match(/\//g) || []).length).toBe(1);
    expect((jogo.desenharForca().match(/[\\]/g) || []).length).toBe(0);
});

test('TEST - desenharForca - Deve desenhar a forca com o braço esquerdo', () => {
    jogo.reiniciar();
    let palavra = 'ARROZ';
    jogo.joga(palavra, 'Q');
    jogo.joga(palavra, 'W');
    jogo.joga(palavra, 'Y');
    jogo.joga(palavra, 'C');
    expect((jogo.desenharForca().match(/O/g) || []).length).toBe(1);
    expect((jogo.desenharForca().match(/\|/g) || []).length).toBe(11);
    expect((jogo.desenharForca().match(/\//g) || []).length).toBe(1);
    expect((jogo.desenharForca().match(/[\\]/g) || []).length).toBe(1);
});

test('TEST - desenharForca - Deve desenhar a forca com a perna direita', () => {
    jogo.reiniciar();
    let palavra = 'ARROZ';
    jogo.joga(palavra, 'Q');
    jogo.joga(palavra, 'W');
    jogo.joga(palavra, 'Y');
    jogo.joga(palavra, 'C');
    jogo.joga(palavra, 'L');
    expect((jogo.desenharForca().match(/O/g) || []).length).toBe(1);
    expect((jogo.desenharForca().match(/\|/g) || []).length).toBe(11);
    expect((jogo.desenharForca().match(/\//g) || []).length).toBe(2);
    expect((jogo.desenharForca().match(/[\\]/g) || []).length).toBe(1);
});

test('TEST - desenharForca - Deve desenhar a forca com a perna esquerda', () => {
    jogo.reiniciar();
    let palavra = 'ARROZ';
    jogo.joga(palavra, 'Q');
    jogo.joga(palavra, 'W');
    jogo.joga(palavra, 'Y');
    jogo.joga(palavra, 'C');
    jogo.joga(palavra, 'L');
    jogo.joga(palavra, 'E');
    expect((jogo.desenharForca().match(/O/g) || []).length).toBe(1);
    expect((jogo.desenharForca().match(/\|/g) || []).length).toBe(11);
    expect((jogo.desenharForca().match(/\//g) || []).length).toBe(2);
    expect((jogo.desenharForca().match(/[\\]/g) || []).length).toBe(2);
});

test('TEST - desenharLetrasAcertadas - Deve retornar o display e a quantidade de letras acertadas para uma palavra sem espaço e sem acento', () => {
    let palavra = 'CAJU';
    jogo.reiniciar();

    var display = jogo.desenharLetrasAcertadas(palavra);

    expect((display.display.match(/_/g) || []).length).toBe(4);
    expect(display.numeroLetrasAcertadas).toBe(0);

    jogo.joga(palavra, 'C');
    display = jogo.desenharLetrasAcertadas(palavra);
    expect((display.display.match(/_/g) || []).length).toBe(4);
    expect(display.numeroLetrasAcertadas).toBe(1);

    jogo.joga(palavra, 'A');
    display = jogo.desenharLetrasAcertadas(palavra);
    expect((display.display.match(/_/g) || []).length).toBe(4);
    expect(display.numeroLetrasAcertadas).toBe(2);

    jogo.joga(palavra, 'J');
    display = jogo.desenharLetrasAcertadas(palavra);
    expect((display.display.match(/_/g) || []).length).toBe(4);
    expect(display.numeroLetrasAcertadas).toBe(3);

    jogo.joga(palavra, 'U');
    display = jogo.desenharLetrasAcertadas(palavra);
    expect((display.display.match(/_/g) || []).length).toBe(4);
    expect(display.numeroLetrasAcertadas).toBe(4);
});

test('TEST - desenharLetrasAcertadas - Deve retornar o display e a quantidade de letras acertadas para uma palavra sem espaço e com acento', () => {
    let palavra = 'ÁRVORE';
    jogo.reiniciar();

    var display = jogo.desenharLetrasAcertadas(palavra);
    expect((display.display.match(/_/g) || []).length).toBe(6);
    expect(display.numeroLetrasAcertadas).toBe(0);

    jogo.joga(palavra, 'A')
    display = jogo.desenharLetrasAcertadas(palavra);
    expect((display.display.match(/_/g) || []).length).toBe(6);
    expect(display.numeroLetrasAcertadas).toBe(1);

    jogo.joga(palavra, 'R');
    display = jogo.desenharLetrasAcertadas(palavra);
    expect((display.display.match(/_/g) || []).length).toBe(6);
    expect(display.numeroLetrasAcertadas).toBe(3);
});

test('TEST - desenharLetrasAcertadas - Deve retornar o display e a quantidade de letras acertadas para uma palavra com acento e espaço', () => {
    let palavra = 'SÃO PAULO';
    jogo.reiniciar();
    jogo.joga(palavra, 'A');

    var display = jogo.desenharLetrasAcertadas(palavra);

    expect((display.display.match(/_/g) || []).length).toBe(9);
    expect(display.numeroLetrasAcertadas).toBe(2);
});

test('TEST - desenharLetrasAcertadas.ganhou - Deve retornar true se usuário ganhou o jogo', () => {
    let palavra = 'SÃO PAULO';
    jogo.reiniciar();
    jogo.joga(palavra, 'S');
    jogo.joga(palavra, 'A');
    jogo.joga(palavra, 'O');
    jogo.joga(palavra, 'P');
    jogo.joga(palavra, 'U');
    jogo.joga(palavra, 'L');

    var display = jogo.desenharLetrasAcertadas(palavra);

    expect((display.display.match(/_/g) || []).length).toBe(9);
    expect(display.numeroLetrasAcertadas).toBe(8);
    expect(display.ganhou).toBe(true);
});

test('TEST - joga - Deve decrementar número de tentativas se palpite for errado', () => {
    let palavra = 'SÃO PAULO';
    jogo.reiniciar();
    jogo.joga(palavra, 'X');

    expect(jogo.letrasInformadas).toContain('X');
    expect(jogo.numeroTentativas).toBe(5);

    jogo.joga(palavra, 'Z');
    expect(jogo.letrasInformadas).toContain('Z');
    expect(jogo.numeroTentativas).toBe(4);
});

test('TEST - joga - Não deve decrementar número de tentativas se palpite for correto', () => {
    let palavra = 'SÃO';
    jogo.reiniciar();
    
    jogo.joga(palavra, 'A');
    expect(jogo.letrasInformadas).toContain('A');
    expect(jogo.numeroTentativas).toBe(6);

    jogo.joga(palavra, 'S');
    expect(jogo.letrasInformadas).toContain('S');
    expect(jogo.numeroTentativas).toBe(6);

    jogo.joga(palavra, 'O');
    expect(jogo.letrasInformadas).toContain('O');
    expect(jogo.numeroTentativas).toBe(6);
});

test('TEST - jogo - Não deve adicionar na lista de letras informadas se palpite for duplicado', () => {
    let palavra = 'ARARAQUARA';
    jogo.reiniciar();

    jogo.joga(palavra, 'A');
    expect(jogo.letrasInformadas.length).toBe(1);

    jogo.joga(palavra, 'A');
    jogo.joga(palavra, 'A');
    var retorno = jogo.joga(palavra, 'A');
    
    expect(jogo.letrasInformadas.length).toBe(1);
    expect(retorno.erro).toBe('Letra já foi informada!');
});