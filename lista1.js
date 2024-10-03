/* 1. Escreva uma função que calcule e retorne o fatorial de um número. */
function calcularFatorial(numero) {
  if (numero < 0) {
    throw new Error("O fatorial não é definido para números negativos.");
  }

  if (numero === 0 || numero === 1) {
    return 1;
  }

  return numero * calcularFatorial(numero - 1);
}


/* 2. Escreva uma função que retorne uma String contendo uma sequência de
N mensagens do texto informado pelo usuário. O valor de N e a mensagem são
informados por parâmetro. */
function gerarMensagens(mensagem, n) {
  if (n <= 0) {
    throw new Error("O valor de N deve ser maior que zero.");
  }

  let resultado = "";
  for (let i = 0; i < n; i++) {
    resultado += mensagem + " ";
  }

  return resultado
}


/* 3. Escreva uma função que receba 2 valores e uma operação básica: adição, subtração,
multiplicação e divisão e retorne o resultado da operação.
Observação: Faça a validação para prevenir a divisão por 0 e também para garantir que
a operação informada é válida. Retorne nulo para os casos de erro. */
function calcularOperacao(valor1, valor2, operacao) {
  const operacoes = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => b !== 0 ? a / b : null
  };

  if (!operacoes.hasOwnProperty(operacao)) {
    return null;
  }

  return operacoes[operacao](valor1, valor2);
}


/* 4. Escreva uma função que retorne um vetor contendo o resultado da tabuada de um
número recebido por parâmetro. Cada resultado na respectiva posição do índice. */
function gerarTabuada(numero) {
  const tabuada = [];
  for (let i = 1; i <= 10; i++) {
    tabuada[i - 1] = numero * i;
  }
  return tabuada;
}


/* 5. Escreva uma função que retorne um número fornecido pelo usuário, porém
invertido. Por exemplo, o usuário fornece o número 875 e a função retorna o número
578. O argumento da função e o retorno deve ser um valor inteiro. */
function inverterNumero(numero) {
  return parseInt(numero.toString().split('').reverse().join(''), 10);
}


/* 6. Escreva uma função que permita contar o número de vogais contidas em uma string
fornecida por parâmetro. Por exemplo, o usuário informa a string “Brocolis”, e a função
retorna o número 3 (há 3 vogais nessa palavra). */
function contarVogais(str) {
  const vogais = 'aeiouAEIOU';
  let contagem = 0;

  for (let char of str) {
    if (vogais.includes(char)) {
      contagem++;
    }
  }

  return contagem;
}


/* 7. Escreva uma função que receba uma sequência de parênteses e colchetes e retorne se
a sequência está bem formada ou não. O retorno deve ser um valor lógico. Exemplo:
“(([]))” retorna true, “(([)])” retorna falso. */
function verificarSequencia(seq) {
  const pilha = [];
  const pares = {
    '(': ')',
    '[': ']'
  };

  for (let char of seq) {
    if (pares[char]) {
      pilha.push(char);
    } else if (char === ')' || char === ']') {
      if (pilha.length === 0 || pares[pilha.pop()] !== char) {
        return false;
      }
    }
  }

  return pilha.length === 0;
}


/* 8. Escreva uma função que receba um número e retorne uma lista de objetos (id, nome e
idade) aleatórios gerados dinamicamente. O código deve ser sequencial; use uma lista
de nomes pré-definida; e gere idades entre 18 e 90 anos. */
function gerarListaAleatoria(num) {
  const nomes = ["Ana", "Bruno", "Carlos", "Daniela", "Eduardo", "Fernanda", "Gabriel", "Juliana", "Lucas", "Mariana"];
  const lista = [];

  for (let i = 0; i < num; i++) {
    const id = i + 1;
    const nome = nomes[Math.floor(Math.random() * nomes.length)];
    const idade = Math.floor(Math.random() * (90 - 18 + 1)) + 18;

    lista.push({ id, nome, idade });
  }

  return lista;
}


/* 9. Escreva uma função que receba a lista de objetos gerados anteriormente e calcule a
média de idades das pessoas presentes na lista. */
function calcularMediaIdades(lista) {
  if (lista.length === 0) return 0;
  const somaIdades = lista.reduce((acc, obj) => acc + obj.idade, 0);
  return somaIdades / lista.length;
}


/* 10. Escreva uma função que receba a lista de objetos gerados anteriormente e ordene os
dados por um dos atributos informados por parâmetros. */
function ordenarPorAtributo(lista, atributo) {
  return lista.sort((a, b) => (a[atributo] > b[atributo] ? 1 : -1));
}






/* Teste de uso em cada função */

const numero = 5;
console.log(`\n\n(1) O fatorial de ${numero} é: ${calcularFatorial(numero)}`);

const mensagem = "teste";
const n = 3;
console.log(`\n\n(2) Mensagens repetidas ${n} vezes: ${gerarMensagens(mensagem, n)}`);

const valor1 = 10;
const valor2 = 5;
console.log(`\n\n(3) Soma de ${valor1} e ${valor2} é: ${calcularOperacao(valor1, valor2, "+")}`);

const numeroTabuada = 5;
console.log(`\n\n(4) Tabuada do ${numeroTabuada}:\n`, gerarTabuada(numeroTabuada));

const numeroParaInverter = 875;
console.log(`\n\n(5) Número ${numeroParaInverter} virou ${inverterNumero(numeroParaInverter)}`);

const stringParaContar = "Brocolis";
console.log(`\n\n(6) String: "${stringParaContar}" tem ${contarVogais(stringParaContar)} vogais`);

const sequencia2 = "(([)])";
console.log(`\n\n(7) A sequência "${sequencia2}" está bem formada? ${verificarSequencia(sequencia2)}`);

const quantidade = 5;
const listaObjetos = gerarListaAleatoria(quantidade)
console.log(`\n\n(8) Lista de ${quantidade} objetos aleatórios:\n`, listaObjetos);

const mediaIdades = calcularMediaIdades(listaObjetos);
console.log(`\n\n(9) Média de idades: ${mediaIdades}`);

const listaOrdenadaPorIdade = ordenarPorAtributo(listaObjetos, 'idade');
console.log(`\n\n(10) Lista ordenada por idade:\n`, listaOrdenadaPorIdade);