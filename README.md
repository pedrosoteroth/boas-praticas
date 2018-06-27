# Boas Práticas de programação - Node

Nesse guia falaremos sobre algumas boas práticas de programação e padrões que devem ser utilizados pelas equipes de desenvolvimento de software.

Usaremos como base a linguagem Javascript, mas tenha em mente que a maioria dos conceitos encontrados aqui podem ser aplicados em qualquer linguagem.

## Índice

- [Introdução](#introdução)
- [Codigo Limpo](#codigo-limpo)
  - [Tipos primitivos e tipos complexos](#tipos-primitivos-e-tipos-complexos)
  - [Variáveis](#variaveis)
  - [Classes métodos e funções](#classes-métodos-e-funções)
  - [Arrays](#arrays)
  - [Strings](#strings)
  - [Promises e callbacks](#promises-e-callbacks)
  - [Erros](#erros)
  - [Codigo Morto](#código-morto)
  - [Definiçao de classes e ES6](#definição-de-classes-e-es6)
  - [Arquivo Readme](#arquivo-readme)
  - [Estrutura de diretórios](#estrutura-de-diretorios)
  - [Scripts NPM](#scripts-npm)
- [Testes](#testes)
  - [Frameworks](#frameworks)
  - [Tipos de teste](#tipos-de-teste)
  - [Exemplo de teste unitário](#exemplo-de-teste-unitário)
  - [Exemplo de teste integrado](#exemplo-de-teste-integrado)
- [Log](#log)
- [APIs](#apis)
- [Consumo de serviços](#consumo-de-serviços)
- [Docker](#docker)
- [Garbage Colector e Memory Leaks](#garbage-colector-e-memory-leaks)
- [IDE](#ide)
- [Leituras](#leituras)

## Introdução

Esse guia não é apenas um style guide, falaremos sobre boas práticas de programação e padrões que devem ser utilizados pelas equipes de desenvolvimento de software da Oi.

As recomendações desse guia, são testadas e largamente utilizadas pela comunidade de desenvolvimento de software. Usaremos como base a linguagem Javascript, mas tenha em mente que a **maioria dos conceitos** encontrados aqui podem ser aplicados em qualquer linguagem.

A aplicação dessas práticas irá melhorar a qualidade do código criado pelo digital e garantirá que tenhamos um padrão de desenvolvimento que facilitará o intercâmbio de conhecimento entre os times.

## Codigo

## Tipos primitivos e tipos complexos

É importante entendermos que o javascript divide seus tipos em 2 grupos ( primitivos e complexos ) e que a manipulação dos dados é um pouco diferente em cada um desses grupos.

Os tipos primitivos são:

- string
- number
- boolean
- null
- undefined
- symbol

Quando você acessa um tipo primitivo, sempre estará trabalhando direto em seu valor.

```javascript
var nome = 'Pedro';
var outroNome = nome;

outroNome = 'João';

console.log(nome); // Pedro
console.log(outroNome); // João
```

Os tipos complexos são:

- object
- array
- function

Nos tipos complexos você sempre estará trabalhando com a referência, isso significa que se replicarmos o exemplo anterior utilizando objetos, após trocar o nome, o objeto original também será alterado.

```javascript
const pessoa = { nome: 'Pedro' };
const outraPessoa = pessoa;

outraPessoa.nome = 'João'

console.log(pessoa); // { nome: 'João' }
console.log(outraPessoa); // { nome: 'João' }
```

Devemos tomar cuidado com isso, pois essa caracteristica pode gerar [comportamentos indesejados](#efeitos-colaterais-\--clone-objetos-como-argumentos).

## Variaveis

### Para variáveis prefira nomes completos, pronunciáveis e representativos

Escolha bons nomes e não tenha medo de escrever um nome longo. Os nomes devem ser produnciáveis e representar bem o valor que estão recebendo.

Ruim:

```javascript
    let n = 'Pedro Sotero';
    let term = '2199999999';
    let ultimaFat  = '09890809898908';
    let datAtualiz = new Date();
    let req;
    let res;
```

```javascript
    produtos.map(p => {
        fazIsso(p);
        fazAquilo(p);
    });
```

Bom:

```javascript
    let nome = 'Pedro Sotero';
    let terminal = '2199999999';
    let ultimaFatura  = '09890809898908';
    let dataDeAtualizacao = new Date();
    let request;
    let response;
```

```javascript
    produtos.map(produto => {
        fazIsso(produto);
        fazAquilo(produto);
    });
```

### Crie apelidos

Sempre que possível atribua valores a variáveis bem nomeadas. Isso facilita a legibilidade do código.

Ruim:

```javascript
    setTimeout(faca_qualquer_coisa, 600000);
```

Bom:

```javascript
    const DEZ_MINUTOS_EM_MILISEGUNDOS = 600000;
    setTimeout(faca_qualquer_coisa, DEZ_MINUTOS_EM_MILISEGUNDOS);
```

Ruim:

```javascript
    if(cliente.tipoPlano = 'PRE' && cliente.produtos.length > 0)
        migrar();
```

Bom:

```javascript
    let jaPodeMigrar = cliente.tipoPlano = 'PRE' && cliente.produtos.length > 0;

    if(jaPodeMigrar)
        migrar();

    // ou você pode abstrair ainda mais...

    let clientePrepago = cliente.tipoPlano = 'PRE';
    let possuiProdutos = cliente.produtos.length > 0;
    let jaPodeMigrar = clientePrepago && possuiProdutos;

    if(jaPodeMigrar)
        migrar();
```

### Nunca coloque contextos desnecessários

Escreva os objetos de forma clara, sem incluir contextos desnecessários para o entendimento.

Ruim:

```javascript
    let cliente = {
        clienteNome: 'Pedro',
        clienteTerminal: '21999999999',
        clienteAtivo: false
    };

    function ativarCliente(cliente) {
        cliente.clienteAtivo = true;
    };
```

Bom:

```javascript
    let cliente = {
        nome: 'Pedro',
        terminal: '21999999999',
        ativo: false
    };

    function ativarCliente(cliente) {
        cliente.ativo = true;
    };
```

### Let e Const

Sempre use [const](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/const) ou [let](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/let), evite usar var.

Ruim

```javascript
conta = new Conta();

var status_criado = 3;
```

```javascript
let conta = new Conta();

const STATUS_CRIADO = 3;
```

### Evite agrupar declarações com let e const

É mais facil incluir outras variáveis quando você as mantem separadas.

Ruim:

```javascript
const A = 1,
    B = 2,
    C = 3;
```

Bom:

```javascript
const A = 1;
const B = 2;
const C = 3;
```

### Não encadeie atribuições de variáveis

Isso pode criar variaveis globais acidentalmente.

Ruim:

```javascript
let a = b = c = 1;
```

Bom:

```javascript
let a = 1;
let b = a;
let c = a;
```

### Prefira === e !== a == e !=

Os [operadores === e !== são type-safe](https://eslint.org/docs/rules/eqeqeq.html) e podem evitar comportamentos inesperados.

Ruim

```javascript
a == b
foo == true
bananas != 1
value == undefined
typeof foo == 'undefined'
'hello' != 'world'
0 == 0
true == true
foo == null
```

Bom:

```javascript
a === b
foo === true
bananas !== 1
value === undefined
typeof foo === 'undefined'
'hello' !== 'world'
0 === 0
true === true
foo === null
```

## Classes métodos e funções

### Classes, metodos e funcões devem fazer apenas uma coisa (Single Responsability Principle)

O [princípio da responsabilidade única ou SRP](https://drive.google.com/file/d/0ByOwmqah_nuGNHEtcU5OekdDMkk/view) é a regra mais importante desse guia, se você fosse escolher apenas uma regra para aplicar, essa seria ela. Não é a toa que é o primeiro dos [principles os odd]((http://butunclebob.com/ArticleS.UncleBob.PrinciplesOfOod)).

Esse é um conceito primordial da engenharia de software, quando funções fazem muitas coisas é mais muito difícil, entender, refatorar e testar, por isso manter os métodos enxutos e com apenas um propósito tem que ser o seu maior objetivo.

Uma função pode chamar outras funções mas essa só pode ter uma responsabilidade e um motivo para mudar.

[The Principles of OOD](http://butunclebob.com/ArticleS.UncleBob.PrinciplesOfOod)

Ruim:

O método enviar conta está enviando a conta e marcando ela como enviada.

```javascript
function enviarConta(cliente, contas) {
    contas.forEach(conta => {

        emailSender('sistema@email', cliente.email, 'Nova Conta', `Valor ${conta.valor}`).then(() => {
            conta.enviada = true;
            conta.dataDoEnvio = new Date();
            atualizarConta(conta);
        });
    });
};
```

Bom:

Agora a funcionalidade continua igual mas o método de envio de conta não tem mais a responsabilidade de saber como a data de envio de conta tem que ser atualizada.

Repare que cada método tem a sua responsabilidade e pode ser refatorado e testado individualmente.

Caso a forma com que a data do envio é definida mude, não teremos mais que alterar o método de envio de conta. A alteração ocorrerá apenas no método de definição de data de envio.

```javascript
function enviarConta(cliente, contas) {
    contas.forEach(conta => {
        enviarEmailDeConta(cliente.email, conta.valor).then(definirDataDeEnvio);
    });
};

function enviarEmailDeConta(email, valor) {
    return  emailSender('sistema@email', email, 'Nova Conta', `Valor ${valor}`);
};

function definirDataDeEnvio(conta) {
    conta.enviada = true;
    conta.dataDoEnvio = new Date();
    atualizarConta(conta);
};

```

### Evite condicionais

De acordo com o principio da responsabilidade unica, sempre que necessario devemos seprar as coisas para que casa classe, método ou função tenha apenas uma responsabilidade.

Ruim:

```javascript
class Fatura {
    // Fatura do prepago, do pospago, e do cliente misto.
    gerar(cliente) {
        switch(cliente.tipo) {
            case 'pre':
                return this.valor + this.taxa;
            case 'pos':
                return this.valor - this.desconto;
            default:
                return this.valor;
        }
    };
};
```

Bom:

```javascript
// Fatura do cliente misto.
class Fatura {
    gerar(cliente) {
        return this.valor;
    };
};

// Fatura do cliente prepago.
class FaturaPre {
    gerar(cliente) {
        return this.valor + this.taxa;
    };
};

// Fatura do cliente pospago.
class FaturaPos {
    gerar(cliente) {
        return this.valor - this.desconto;
    };
};
```

### Prefira nomes completos, pronunciáveis e representativos

Ruim:

```javascript
function adiar(numero) {
    pagamento.vencimento.add(numero, 'week');
};
```

Bom:

```javascript
function adiarPagamento(numeroDeSemanas) {
    pagamento.vencimento.add(numeroDeSemanas, 'week');
};
```

Ruim:

```javascript
function adiar() {
    pagamento.vencimento.add(1, 'week');
};
```

Bom:

```javascript
function adiarPagamentoEmUmaSemana() {
    pagamento.vencimento.add(1, 'week');
};
```

### Poucos argumentos

É uma boa prática limitar o número de argumentos de uma função. O ideal é que ela tenha apenas 2 ou menos argumentos.

Isso é importante pois torna os testes e a legibilidade mais fáceis. Muitas vezes funções com muitos argumentos estão fazendo mais do que deveriam fazer e quando não estão, usar um objeto como argumento simplifica as coisas.

As versões modernas do Javascript já suportam [*destructuring*](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Atribuicao_via_desestruturacao) e essa sintaxe pode nos ajudar na definição dos argumento de uma função.

Ruim:

```javascript
function enviarEmail(de, para, copia, assunto, texto) {
    // envia o e-mail
};

enviarEmail('pedro@email', 'fulano@email', null, 'Boas praticas', 'um texto');
```

Ruim:

```javascript
function enviarEmail(email) {
    // envia o e-mail
};

let email = {
    de: 'pedro@email',
    para: 'fulano@email',
    assunto: 'Boas praticas',
    texto: 'um texto'
};


enviarEmail(email);
```

Bom:

Repare que os argumentos ficam explicitos mas não é necessário definir nem "de" nem "copia".

```javascript
function enviarEmail({ de = 'padrao@email.com', para, copia, assunto, texto }) {
    // envia o e-mail
};

let email = {
    para: 'fulano@email',
    assunto: 'Boas praticas',
    texto: 'um texto'
};

enviarEmail(email);
```

### Caso necessário, utilize valores padrão para os argumentos

Péssimo:

```javascript
function boasVindas(nome) {
    if(!nome)
        nome = 'Visitante';

    console.log(`Olá ${nome}`);
};

boasVindas(); // Olá Visitante
boasVindas('Pedro'); // Olá Pedro
```

Ruim:

```javascript
function boasVindas(nome) {
    nome = nome || 'Visitante';
    console.log(`Olá ${nome}`);
};

boasVindas(); // Olá Visitante
boasVindas('Pedro'); // Olá Pedro
```

Bom:

Só tenha cuidado pois os valores padrão só são definidos para argumentos que receberem *undefined*. Caso você chame *boasVindas(null)* por exemplo, o valor padrão não será aplicado para nome.

```javascript
function boasVindas(nome = 'Visitante') {
    console.log(`Olá ${nome}`);
};

boasVindas(); // Olá Visitante
boasVindas('Pedro'); // Olá Pedro
```

Bom:

Quando o argumento for um objeto, utilize [Object.assign](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) na definição dos atributos padrão.

```javascript
function enviarEmail(opcoes) {
    opcoes = Object.assign({}, {
        de: 'padrao@email.com',
        assunto: 'Assunto padrao'
    }, opcoes);
    console.log(opcoes);
};

enviarEmail({ assunto:'Novo assunto', texto: 'Novo texto' });
```

Melhor:

Ou ainda, utilize o padrão destructuring

```javascript
function enviarEmail({ de = 'padrao@email.com', assunto = 'Assunto Padrao', texto, para }) {
    console.log(de, assunto, texto, para);
};

enviarEmail({ assunto:'Novo assunto', texto: 'Novo texto' });
```

## Remova codigos duplicados

Sempre remova duplicidades desnecessárias.

Ruim:

```javascript
function mascararTerminalMovel(terminal) {
    terminal = String(terminal);
    terminal = terminal.replace('-', '');
    return terminal.replace(terminal.substring(2, 7), '*****');
};

function mascararTerminalFixo(terminal) {
    terminal = String(terminal);
    terminal = terminal.replace('-', '');
    return terminal.replace(terminal.substring(2, 6), '*****');
};
```

Bom:

```javascript
function mascararTerminal(terminal) {
    terminal = String(terminal);
    terminal = terminal.replace('-', '');

    numerosVisiveisNoFinal = 4;
    numerosEscondidos = terminal.length - numerosVisiveisNoFinal - 2;
    posicao  = terminal.length - numerosVisiveisNoFinal;
    valorSubstituido = terminal.substring(2, posicao);

    return terminal.replace(valorSubstituido , '*'.repeat(numerosEscondidos));
};
```

### Evite negar condiçoes

Condições negadas podem passar despercebinas na hora da leitura do código. Sempre que possível organize o código de outra forma.

Ruim

```javascript
if(!temEmail)
    mandarSms();
else
    mandarEmail();
```

Bom:

```javascript
if(temEmail)
    mandarEmail();
else
    mandarSms();
```

### Evites elses desnecessários

Se um bloco If sempre executa um return o bloco else torna-se desnecessário.

Ruim:

```javascript
function foo() {
  if (x) {
    return x;
  } else {
    return y;
  }
}

function cats() {
  if (x) {
    return x;
  } else if (y) {
    return y;
  }
}

function dogs() {
  if (x) {
    return x;
  } else {
    if (y) {
      return y;
    }
  }
}
```

Bom:

```javascript
function foo() {
  if (x) {
    return x;
  }

  return y;
}

function cats() {
  if (x) {
    return x;
  }

  if (y) {
    return y;
  }
}

function dogs(x) {
  if (x) {
    if (z) {
      return y;
    }
  } else {
    return z;
  }
}
```

### Efeitos Colaterais - Evite alterar variáveis de fora do escopo

Evite que uma função altere um valor global, isso pode quebrar seu código.

Ruim:

```javascript
let terminal = '21999999999';

function mascararTerminal() {
    terminal = terminal.replace(terminal.substring(2, 7), '*****');
};

mascararTerminal();

console.log(terminal); // 21*****9999
```

Bom:

```javascript
function mascararTerminal(terminal) {
    return terminal.replace(terminal.substring(2, 7), '*****');
};

const terminal = '21999999999';
const terminalMascarado = mascararTerminal(terminal);

console.log(terminal); // 21999999999
console.log(terminalMascarado); // 21*****9999
```

### Efeitos Colaterais - Clone objetos como argumentos

No Javascript tipos primitivos são passados como valor e objetos/arrays são passados como referência. Isso pode causar efeitos colateráis indesejados caso não se tome cuidado.

No caso de objetos ou arrays, caso a função que os receba, faça alterações, essas mudanças se refletirão no objeto original.

Vamos supor que se passe um objeto cliente para uma função e dentro dela esse objeto seja alterado para inativo. Esse status inativo será refletido no objeto original e essa alteração não existirá apenas no contexto da função.

Uma boa solução para esse cenário é SEMPRE CLONAR os objetos de entrada, assim garantimos que qualquer alteração só exista no contexto da função e não reflita no objeto original.

Ruim:

```javascript
function realizarLogin(cliente) {
    // faz algumas coisas
    cliente.ativo = false;
};

let cliente = { nome: 'Pedro Sotero', login: 'Pedro', senha: '123', ativo: true };

console.log('Antes: ', cliente.ativo); // true

realizarLogin(cliente);

console.log('Depois: ', cliente.ativo); // false, a função altera o objeto original
```

Bom:

```javascript
function realizarLogin(cliente) {
    // clona o objeto
    cliente = Object.assign({}, cliente);

    // faz algumas coisas
    cliente.ativo = false;
};

let cliente = { nome: 'Pedro Sotero', login: 'Pedro', senha: '123', ativo: true };

console.log('Antes: ', cliente.ativo); // true

realizarLogin(cliente);

console.log('Depois: ', cliente.ativo); // true, a função não altera o objeto original
```

### Efeitos Colaterais - Evite alterar funções globais

Alterar funções globalmente não é uma boa pratica pois a alteração que você fez reflete para outras bibliotecas que tambem usam a função e isso pode gerar confusão.

Vamos supor que você queria alterar o método toString da classe string para sempre mostrar uma exclamação no final. Se você fizer isso no prototype essa alteração irá refletir para todas as bibliotecas que usem o método toString e essa provavelmente não é a sua intenção.

A forma correta criar uma nova classe extendendo a classe original para só depois alterar seu comportamento.

Ruim

```javascript
String.prototype.toString = function() {
    return this + "!!!"
};

"Ola".toString();
```

Bom:

```javascript
class StringQueGrita extends String {
    toString() {
        return this + "!!!"
    };
};

new StringQueGrita("Ola").toString();
```

## Arrays

Existem diversas formas de trabalhar com arrays, a idéia aqui é expor algumas delas mas se possível, visite a [documentação](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array) e conheça diversos outros recursos interessantes dos arrays.

### Filter

Caso precise filtrar um array, use [filter](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/filtro) ao invés de ifs dentro de for.

Ruim:

```javascript
let terminais = ['21985665236', '21985652555', '2125706666'];

let numerosMoveis = [];

for (let i = 0; i < terminais.length; i++)
    if (terminais[i].length == 11)
        numerosMoveis.push(terminais[i]);

console.log('Números móveis:', numerosMoveis);

// Números móveis: [ '21985665236', '21985652555' ]
```

Bom:

```javascript
let terminais = ['21985665236', '21985652555', '2125706666'];

let numerosMoveis = terminais.filter(terminal => terminal.length == 11);

console.log('Números móveis:', numerosMoveis);

// Números móveis: [ '21985665236', '21985652555' ]
```

### Find

Use o [find](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/find) para recuperar um determinado item do array.

```javascript
let clientes = [{ nome: 'João' }, { nome: 'Pedro' }, { nome: 'Ana' }];

let Pedro = clientes.find(cliente => cliente.nome === 'Pedro');

console.log(Pedro);

// { nome: 'Pedro' }
```

Você pode obter um resultado semelhante com o filter com a diferença de que o filter sempre retornará um array e o find retorna o próprio item encontrado. Caso não encontre nada, o filter retornará [] e o find undefined.

```javascript
let clientes = [{ nome: 'João' }, { nome: 'Pedro' }, { nome: 'Ana' }];

console.log(clientes.filter(cliente => cliente.nome === 'Pedro'));
// [ { nome: 'Pedro' } ]

console.log(clientes.find(cliente => cliente.nome === 'Pedro'));
// { nome: 'Pedro' }

console.log(clientes.filter(cliente => cliente.nome === 'Fulano'));
// []

console.log(clientes.find(cliente => cliente.nome === 'Fulano'));
// undefined
```

### Sort

Use o [sort](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) caso queira ordenar um array.

```javascript
let nomes = ['Carlos', 'Pedro', 'André', 'Bruna'];
let numeros = [10, 3, 80, 20, 2, 1];
let clientes = [{ nome: 'João' }, { nome: 'Pedro' }, { nome: 'Ana' }];

console.log(numeros.sort((primeiro, segundo) => primeiro - segundo));
// [ 1, 2, 3, 10, 20, 80 ]

console.log(nomes.sort());
// [ 'André', 'Bruna', 'Carlos', 'Pedro' ]

console.log(nomes.sort().reverse());
// [ 'Pedro', 'Carlos', 'Bruna', 'André' ]

console.log(clientes.sort((primeiro, segundo) => primeiro.nome > segundo.nome));
// [ { nome: 'Ana' }, { nome: 'Pedro' }, { nome: 'João' } ]
```

### Map

Utilize o map sempre que precisar aplicar uma função a cada item do array e obter um novo array como resultado.

```javascript
let tamanhosEmKb = [1500, 100, 450, 2048];

// transformando em MegaBytes
let tamanhosEmMb = tamanhosEmKb.map(tamanho => tamanho / 1024);

// novo array
console.log('Tamanhos em MB:', tamanhosEmMb);
// [ 1.46484375, 0.09765625, 0.439453125, 2 ]

// não altera o array original
console.log('Tamanhos em KB:', tamanhosEmKb);
// [ 1500, 100, 450, 2048 ]
```

Só temos que tomar cuidado com arrays de [objeto](https://developer.mozilla.org/pt-BR/docs/Glossario/objeto), pois por não serem tipos [primitivos](https://developer.mozilla.org/pt-BR/docs/Glossario/Primitivo) não são passados por valor para as funções. No caso de objetos o javascript passa por referência e isso faz com  que o objeto original seja alterado.

```javascript
let faturas = [{
    mes: 'janeiro',
    valor: 30.45,
    paga: false
}, {
    mes: 'fevereiro',
    valor: 20.10,
    paga: false
},
{
    mes: 'março',
    valor: 60,
    paga: false
}];

let faturasPagas = faturas.map(fatura => {
    fatura.paga = true;
    return fatura;
});

// novo array
console.log('Faturas Pagas:', faturasPagas);
// [ { mes: 'janeiro', valor: 30.45, paga: true },
// { mes: 'fevereiro', valor: 20.1, paga: true },
// { mes: 'março', valor: 60, paga: true } ]

// MODIFICA o array original
console.log('Faturas:', faturas);
// [ { mes: 'janeiro', valor: 30.45, paga: true },
// { mes: 'fevereiro', valor: 20.1, paga: true },
// { mes: 'março', valor: 60, paga: true } ]
```

Para resolver esse problema, você precisaria clonar o objeto antes de alterar.

```javascript
let faturas = [{
    mes: 'janeiro',
    valor: 30.45,
    paga: false
}, {
    mes: 'fevereiro',
    valor: 20.10,
    paga: false
},
{
    mes: 'março',
    valor: 60,
    paga: false
}];

let faturasPagas = faturas.map(fatura => {
    // clona o objeto antes de alterar para que a alteração não afete o array original
    let copiaFatura = Object.assign({}, fatura);

    copiaFatura.paga = true;
    return copiaFatura;
});

// novo array
console.log('Faturas Pagas:', faturasPagas);
// [ { mes: 'janeiro', valor: 30.45, paga: true },
// { mes: 'fevereiro', valor: 20.1, paga: true },
// { mes: 'março', valor: 60, paga: true } ]

// NAO modifica o array original
console.log('Faturas:', faturas);
// [ { mes: 'janeiro', valor: 30.45, paga: false },
// { mes: 'fevereiro', valor: 20.1, paga: false },
// { mes: 'março', valor: 60, paga: false } ]
```

### ForEach

Use o [foreach](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) para executar uma função para cada item do array.

```javascript
let clientes = [{ nome: 'Pedro', email: 'd@d.com' }, { nome: 'Maria', email: 'm@m.com' }];

function enviarEmailBoasVindas(cliente) {
    console.log(`Enviando email para ${cliente.nome} <${cliente.email}>`);
};

clientes.forEach(enviarEmailBoasVindas);

// Enviando email para Pedro <d@d.com>
// Enviando email para Maria <m@m.com>
```

### Reduce

Para fazer somas ou reduzir um array, utilize o [reduce](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce). Essa função pode fazer coisas interessantes se usada com sabedoria, recomendo a leitura da [documentação](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce).

```javascript
let faturas = [{
    mes: 'janeiro',
    valor: 30.45
}, {
    mes: 'fevereiro',
    valor: 20.10
},
{
    mes: 'março',
    valor: 60
}];

let total = faturas.reduce((resultado, fatura) => resultado + fatura.valor, 0);

console.log('Total acumulado:', total); // 110.55
```
## Strings

### Aspas

Prefira o uso de aspas simples.

Ruim

```javascript
const nome = "Pedro";
```

Bom

```javascript
const nome = 'Pedro';
```

### Multiplas linhas

Evite escrever strings em multiplas linhas, quebrar strings torna o código menos buscavel.

Ruim

```javascript
const observacao = 'Lorem ipsum dolor sit amet, consectetur \ adipiscing elit. Aliquam ullamcorper metus ac tortor mattis, \ eget sagittis diam imperdiet. Morbi ac bibendum libero. In \ at felis augue. Maecenas id euismod augue, at. Vestibulum \ dapibus nunc placerat hendrerit tempus.';

const observacao = 'Lorem ipsum dolor sit amet, consectetur ' +
'adipiscing elit. Aliquam ullamcorper metus ac tortor mattis ' +
'eget sagittis diam imperdiet. Morbi ac bibendum libero. In ' +
'at felis augue. Maecenas id euismod augue, at. Vestibulum ' +
'dapibus nunc placerat hendrerit tempus.';
```

Bom

```javascript
const observacao = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ullamcorper metus ac tortor mattis, eget sagittis diam imperdiet. Morbi ac bibendum libero. In at felis augue. Maecenas id euismod augue, at sollicitudin diam. Vestibulum dapibus nunc placerat hendrerit tempus.';
```

### Concatenação

Para concatenar prefira usar [template strings](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/template_strings).

Ruim

```javascript
function Ola(nome) {
    console.log('Ola' + nome);
}
```

Bom

```javascript
function Ola(nome) {
    console.log(`Ola ${nome}`);
}
```


## Promises e callbacks

Callbacks não são tão claros de ler, por isso, prefira usar [promises](https://javascript.info/async).

O formato das promisses além de nos afastar do **calback hell**, facilita a leitura e o entendimento do código.

```javascript
boasVindas(nome) {
    return new Promise((resolve, reject) => {
        resolve(`Olá ${nome}`);
    });
};


boasVindas().
    then(console.log);
```

E você pode [encadear](https://javascript.info/promise-chaining) o retorno passando o resultado sempre adiante.

```javascript
function processarContasVencidas(cpf)
{
    carregarCliente(cpf)
        .then(possuiContasVencidas)
        .then(enviarEmailDeCobranca)
        .catch(console.error);
}

function carregarCliente(cpf) {
    return new Promise((resolve, reject) => {
        // ...
        resolve(cliente);
    });
};

function possuiContasVencidas(cliente) {
    return new Promise((resolve, reject) => {
        // ...
        resolve(cliente);
    });
};

function enviarEmailDeCobranca(cliente) {
    // ...
    return servicoDeEnvioDeEmail.enviar(mensagem);
};
```

Se você precisar promissificar uma classe que já exista mas está feita com com callbacks, é possivel usar o método [promisifyAll](http://bluebirdjs.com/docs/api/promise.promisify.html) do [bluebird](http://bluebirdjs.com).

Repare como a legibilidade aumenta quando paramos de usar callbacks e usamos promises.

Ruim:

```javascript
import { get } from 'request';
import { writeFile } from 'fs';

get('http://uma_api_qualquer', (requestErr, response) => {
  if (requestErr)
    console.error(requestErr);
  else {
    writeFile('arquivo.txt', response.body, (writeErr) => {
      if (writeErr)
        console.error(writeErr);
      else
        console.log('Arquivo gravado');
    });
  }
});
```

Bom:

```javascript
import { get } from 'request';
import { writeFile } from 'fs';

get('http://uma_api_qualquer')
  .then((response) => {
    return writeFile('arquivo.txt', response);
  })
  .then(() => {
    console.log('Arquivo gravado');
  })
  .catch(console.error);
```

[Async e Await](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/await) são ainda mais legiveis que as promises, mas não fazem parte do ES6. Caso você já use ES7 poderia escrever o exemplo acima da seguinte forma:

```javascript
import { get } from 'request';
import { writeFile } from 'fs';

async pegarArquivo()
{
    try {
        const response = await get('http://uma_api_qualquer');
        await writeFile('arquivo.txt', response);
        console.log('Arquivo gravado');
    } catch (error) {
        console.log(error);
    }
}
```

## Erros

### Não ignore os erros

Não ignore os erros os impactos podem ser enormes para o negócio.

Péssimo

```javascript
enviarSms()
    .then(() => { ... });
```

Ruim:

```javascript
enviarSms()
    .then(() => { ... });
    .catch(console.log);
```

Bom:

Sempre logue os erros e se possível tome alguma ação para que esse erro seja analisado, resolvido ou contornado.

```javascript
enviarSms()
    .then(() => { ... });
    .catch(erro => {
        console.error(erro);
        logger.logarErro(erro);
        notificarAdministrador(erro);
    });
```

## Código Morto

Uma coisa muito importante que temos que ter em mente é que nosso código é vivo. Estamos em um ambiente onde perseguimos a melhora contínua e onde mudanças são bem vindas, logo, temos que nos preocupar diáriamente com a saúde do nosso projeto e não tem nada mais "morto" que um código antigo comentado, não é mesmo?

Por isso **prefira apagar códigos do que comentar**, lembre que utilizamos ferramentas de controle de versão que estão ai para nos ajudar caso seja necessário dar uma olhada em uma versão anterior do arquivo.

Sempre que perceber que um método, classe, arquivo etc. não está mais sendo utilizado pelo sistema, sinta-se a vontade para apaga-lo! Dessa forma garantimos que o projeto está sempre em sua versão mais enxuta e evitamos que tempo seja perdido analisando coisas que não usamos mais.

Ruim:

```javascript
function exibirAlerta(texto) {
    // mudamos a biblioteca de notificacao
    // jupter.show({
    //     size: 3000,
    //     overflow: 'hidden',
    //     color: 'red',
    //     title: 'Cuidado';
    // }, texto);

    novaClasseDeNotificacao.exibir(texto);
};

// function esconderAlertas() {
//     // escondendo os alertas da jupter
// }
```

Bom:

```javascript
function exibirAlerta(texto) {
    novaClasseDeNotificacao.exibir(texto);
};
```

## Definição de classes e ES6

Dê preferência ao modelo ES6 por ser mais conciso e facil de entender.

- [Medium guia ES6](https://medium.com/@matheusml/o-guia-do-es6-tudo-que-voc%C3%AA-precisa-saber-8c287876325f)
- [https://github.com/lukehoban/es6features](https://github.com/lukehoban/es6features)

Ruim:

```javascript
Fatura = function() {
    this.logger = require('logger');
};

Fatura.prototype.gerar = function(cliente) {
        // ...
};

Fatura.prototype.arquivar = function(fatura) {
        // ...
};
```

Bom:

```javascript
class Fatura {
    constructor() {
        this.logger = require('logger');
    };

    gerar(cliente) {
        // ...
    };

    arquivar(fatura) {
        // ...
    };
};
```

### Aproveite o recurso de herança

Utilize [extends](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Classes/extends) para extender classes.
```javascript
class Cachorro {
    constructor() {
        console.log('Sou um cachorro!');
    }

    latir() {
        console.log('Au au au au');
    }

    abanarRabo() {
        console.log('flap flap flap!');
    }
}

class CachorroRouco extends Cachorro {
    constructor() {
        super();
        console.log('mas sou rouco :(');
    }

    latir() {
        console.log('A.... A... ...');
    }
}

let cachorro = new Cachorro();

cachorro.latir();
cachorro.abanarRabo();

// Sou um cachorro!
// Au au au au
// flap flap flap!

let cachorroRouco = new CachorroRouco();

cachorroRouco.latir();
cachorroRouco.abanarRabo();

// Sou um cachorro!
// mas sou rouco :(
// A.... A... ...
// flap flap flap!
```

## Arquivo Readme


Devemos dedicar tempo ao arquivo readme colocano nele informações para ;ajudar o time com tarefas relacionadas ao projeto.

Em primeiro lugar procure sempre colocar uma descrição breve e clara dos objetivos do projeto:

```bash
Visão Geral

O projeto OiToken é responsável por criar e enviar tokens por diversos canais (sms, voz, email, tv).
```

Em seguida, você pode colocar o e-mail dos responsáveil pelo projeto assim, caso alguem tenha alguma dúvida saberá quem procurar.

```bash
Equipe:

- Pedro Sotero <d@email>
- Joao <j@email>
- Maria <m.@email>
```

Depois dessas informaçõe básicas você pode usar o Readme para ensinar a instalação e configuração do projeto, colocar informações de ambiente, exemplos de chamadas, links para documetação etc.

O importante é que seu readme não seja um arquivo sem propósito. Use ele para ajudar as pessoas que podem precisar do seu projeto.

Esse [repositório](https://github.com/matiassingers/awesome-readme) tem alguns exemplos de arquivos de readme bem escritos.



## Estrutura de diretórios

É importante seguirmos um padrão em nossos projetos, caso contrario o entendimento e a manutenção podem ficar comprometidos.

Por isso, criamos um esqueleto de aplicação para o backend e para o frontend que pode ser baixado e aplicado ao seu novo projeto.

A evolução desse projeto depende de todos nós, por isso caso você encontre um problema ou tenha alguma sugestão, procure o desenvolvedor responsavel pelas aplicações cross e converse sobre o seu cenário para que sua melhoria possa ser analisada e aplicada.

- [Gerador de projetos backend](http://dadhx01.interno/oidigital/framework-digital)
- [Bootstrap de um projeto frontend](http://dadhx01.interno/oidigital/framework-react-oi)

## Scripts NPM

Use o NPM para rodar scrips que vão te ajudar nas tarefas do seu projeto.

Normalmente usamos:

```bash
npm start // iniciar o projeto
npm test  // rodar os testes
```

Mas podemos criar diversas tasks para nos ajudar, basta incluir o código dentro da sessão scripts do seu package.json e depois rodar com npm run.

```javascript
  "scripts": {
    "token": "node -e 'let oiToken = require(\"./OiToken\"); oiToken.gerar().then(console.log);'"
  }
```

```bash
$ npm run token
894010
```

## Testes

**Testes são tão ou mais importantes que a própria entrega**. Essa afirmação pode parecer polêmica mas se seus casos de teste não existem ou são ruins, sua entrega perde valor pois ninguém pode garantir sua qualidade.

Os testes são os melhores amigos do desenvolvedor, eles blidam você, seu time, seu projeto e a sua empresa de entregarem algo com problema. Quanto mais completa e confiavel for sua suite de testes, maior é a sua capacidade de entrega e a sua tranquilidade de que tudo vai sair conforme o esperado.

Se sua suite de testes é falha ou não existe, toda vez que mexer no código você não terá certeza de que não quebrou nada e isso pode gerar uma instabilidade em todo o ambiente.

Aqui **na Oi, encorajamos a metodologia TDD**, acreditamos que **escrever o código começando pelos testes nos faz trabalhar mais orientados ao negócio** e criar APIs muito mais simples, bonitas, fáceis de usar e de testar.

Portanto, recomendamos fortemente que utilize TDD, mas se isso parecer complicado em um primeiro momento, escreva seu código e em seguida escreva os cenários de testes que testem o código feito. O importante é que não podemos ter entregas sem teste automatizado, essa é uma premissa basica.

### Frameworks

Para criar os testes, nós utilizamos basicamente:

- [Mocha](https://github.com/mochajs/mocha) como Framework de testes padrão
- [Chai](http://chaijs.com/) como biblioteca de assert
- [Sinon](http://sinonjs.org/) para criar stubs, mocks e spies
- [Test Prepare](https://www.npmjs.com/package/test-prepare) biblioteca que criei para incluir e excluir cenários específicos no banco de dados antes de cada teste

### Tipos de teste

Basicamente fazemos 3 tipos de teste:

- [Teste unitário](https://pt.wikipedia.org/wiki/Teste_de_unidade) testa isoladamente uma única unidade do sistema. O **teste unitário não deve depender de nenhuma dependência externa**, para isso caso a funcionalidade testada tenha alguma dependência nós a mockamos com ajuda do [Sinon](http://sinonjs.org/).

- [Teste integrado](https://pt.wikipedia.org/wiki/Teste_de_integra%C3%A7%C3%A3o) aqui o objetivo é testar a integração de uma ou mais partes do sistema. Com esse tipo de teste, nós garantimos que a gravação no banco de dados está correta, que o e-mail está sendo realmente enviado etc.

- [Teste de sistema ou de aceitação](https://pt.wikipedia.org/wiki/Teste_de_sistema) são testes que garantem que seu sistema funciona como um todo. Podemos citar aqui testes que abrem o navegador navegam tela por tela replicando e aprovando ou não cenários específicos.

**Use o mockserver apenas nos testes integrados e de frontend quando necessário.**

### Exemplo de teste unitário

O objetivo aqui é dar uma visão geral , por isso não entraremos nas especificidades de cada framework.

Para exemplificar a criação dos testes unitários e integrados, criaremos utilizando TDD uma funcionalidade similar ao projeto OiToken que cria e envia um token de 6 caracteres por SMS.

O projeto desse exemplo pode ser baixado [aqui](https://github.com/pedrosoteroth/boas-praticas/tree/master/token).

---

O primeiro passo foi instalar as dependências, para isso basta.

```bash
npm i mocha --save-dev
npm i chai --save-dev
npm i sinon --save-dev
```

O segundo passo foi configurar o mocha como engine de teste do projeto no package.json

```javascript
 "scripts": {
    "test": "./node_modules/mocha/bin/mocha"
  },
```

Por padrão o mocha busca pelos arquivos de teste dentro do diretório **test**, criei o diretório e em seguida criei o arquivo onde colocaremos os testes unitários e chamei ele de **unitario.js**.

```javascript
// importanto o modulo expect do chai
const expect = require('chai').expect;

// criando uma sessão para os testes da classe OiToken
describe('OiToken', function () {
});
```

Antes de começarmos, é importante lembrar que no [Test Driven Development ou TDD](http://tdd.caelum.com.br/) nós escrevemos os testes antes mesmo de escrever o código. O ciclo de desenvolvimento consiste em:

1. Escrever um teste
1. Rodar e ver esse teste falhar
1. Escrever a menor alteração possível para que o teste passe (baby steps)
1. Rodar novamente o teste e ver ele passar
1. Voltar para o passo 1 e continuar repetindo esse processo.

Sabemos que nossa classe de token deve criar um novo token aleatoriamente para isso vamos criar um método de testes teste a existencia do método gerar e ver ele falhar pois como sabemos, ainda não criamos a classe Token nem o método gerar.

Tente usar no maximo um assert por teste, isso facilita saber onde o teste falhou. Testes com muitos asserts dificultam a visualização do real problema, por isso sempre que possível prefira criar 2 testes do que criar um teste com 2 asserts.

```javascript
// importanto o modulo expect do chai
const expect = require('chai').expect;

// criando uma sessão para os testes da classe token
describe('OiToken', function () {
    describe('Gerar', function() {
        it('Deve possuir o método gerar', function(done) {
            let token = new OiToken();
            expect(token).to.have.property('gerar');
            done();
        });
    });
});
```

```bash
$ npm test

0 passing (10ms)
1 failing

1) OiToken
    Gerar
        Deve possuir o método gerar:
    ReferenceError: OiToken is not defined
    at Context.<anonymous> (test/unitario.js:7:29)
```

Agora, vamos fazer a menor alteração possível para que esse teste passe. Essa alteração é criar a classe OiToken e alterar nosso teste para que possa usar essa classe criada.

```javascript
// OiToken.js
class OiToken {
};

module.exports = new OiToken();
```

```javascript
// test/unitario.js
const expect = require('chai').expect;

// criando uma sessão para os testes da classe token
describe('OiToken', function () {

    let oitoken = require('../OiToken');

    describe('Gerar', function () {
        it('Deve possuir o método gerar', function (done) {
            expect(oitoken).to.have.property('gerar');
            done();
        });
    });
});
```

```bash
0 passing (18ms)
1 failing

1) OiToken
    Gerar
        Deve possuir o método gerar:
    AssertionError: expected {} to have property 'gerar'
    at Context.<anonymous> (test/unitario.js:12:37)
```

Como podemos ver, agora o resultado do teste está falhando pois não encontrou o método gerar. Vamos fazer a menor alteração possível para que esse teste passe criando o método gerar vazio na classe OiToken e rodar novamente os testes

```javascript
// OiToken.js
class OiToken {
    gerar() {
    };
};

module.exports = new OiToken();
```

```bash
OiToken
Gerar
    ✓ Deve possuir o método gerar

1 passing (18ms)
```

Legal! Vimos nosso primeiro test passando, mas como sabemos, ainda temos muito desenvolvimento pela frente até que possamos dar esse trabalho como terminado.

A partir de agora, não comentarei tão detalhadamente os baby steps para que esse texto não fique muito extenso, mas o método de trabalho continua o mesmo!

Vamos escrever o proximo teste.

```javascript
it('Deve retornar uma string de 6 caracteres', function (done) {
    expect(oitoken.gerar().length).to.be.equal(6);
    done();
});
```

```bash
1 passing (22ms)
1 failing

1) OiToken
    Gerar
        Deve retornar uma string de 6 caracteres:
    TypeError: Cannot read property 'length' of undefined
    at Context.<anonymous> (test/unitario.js:17:35)
```

O baby step nesse caso é fazer com que o método gerar retorne uma string qualquer de 6 caracteres. Conforme sua experiência com o TDD for aumentanto esses "baby steps" podem ser maiores e você pode pular passos muito triviais para agilizar o desenvolvimento, mas nesse momento de aprendizado, tente passos menores.

```javascript
// OiToken.js
class OiToken {
    gerar() {
        return '123456';
    };
};

module.exports = new OiToken();
```

```bash
  OiToken
    Gerar
      ✓ Deve possuir o método gerar
      ✓ Deve retornar uma string de 6 caracteres


  2 passing (21ms)
```

Devemos agorar garantir que o gerar não gera sempre o mesmo token.

```javascript
it('Deve gerar tokens diferentes', function (done) {
    let primeira = oitoken.gerar();
    let segunda = oitoken.gerar();
    let terceira = oitoken.gerar();

    expect(primeira).to.not.be.equal(segunda);
    expect(primeira).to.not.be.equal(terceira);
    expect(segunda).to.not.be.equal(terceira);

    done();
});
```

```bash
2 passing (26ms)
1 failing

1) OiToken
    Gerar
        Deve gerar tokens diferentes:

    AssertionError: expected '123456' to not equal '123456'
    + expected - actual


    at Context.<anonymous> (test/unitario.js:26:40)
```

Agora ajustamos o método gerar para passar no teste.

```javascript
// OiToken.js
class OiToken {
    gerar() {
        // por ser um exemplo, não levamos em consideração como esse numero é gerado
        // precisamos apenas de um numero aleatorio de 6 caracteres
        var token = String(parseInt(Math.random() * (999999 - 111111) + 111111));

        return token;
    };
};

module.exports = new OiToken();
```

```bash
OiToken
Gerar
    ✓ Deve possuir o método gerar
    ✓ Deve retornar uma string de 6 caracteres
    ✓ Deve gerar tokens diferentes


3 passing (22ms)
```

Para finalizar os testes da geração do token, precisamos garantir que temos apenas números sendo gerados.

```javascript
it('Deve gerar tokens com apenas números', function (done) {
    let primeira = oitoken.gerar();
    let segunda = oitoken.gerar();
    let terceira = oitoken.gerar();

    expect(primeira).to.match(/^[0-9]{6}$/);
    expect(segunda).to.match(/^[0-9]{6}$/);
    expect(terceira).to.match(/^[0-9]{6}$/);

    done();
});
```

```bash
OiToken
Gerar
    ✓ Deve possuir o método gerar
    ✓ Deve retornar uma string de 6 caracteres
    ✓ Deve gerar tokens diferentes
    ✓ Deve gerar tokens com apenas números


4 passing (21ms)
```

Legal, agora tesmos uma classe OiToken que é capaz de gerar um token com 6 números aleatórios. Temos também um 4 casos de testes unitários que garantem que tudo irá funcionar como o esperado.

Para continuar nosso exemplo precisamos criar agora um método que irá gerar e em seguida enviar o token gerado por SMS.

Para simular o serviço de envio de SMS e não termos que colocar no projeto toda uma estrutura real de evio de SMS criei uma classe em soap/enviarMensagem.js vazia com o método enviar.

```javascript
// soap/enviarMensagem.js
// Simula o envio de um SMS para o exemplo
class EnviarMensagem {
    enviarSms(texto, numero) {
        return new Promise((resolve, reject) => {
            resolve(`O SMS [${texto}] foi enviado para ${numero}`);
        });
    };
};

module.exports = new EnviarMensagem();
```

Vamos agorar criar o método que testa a geração de token e o envio da mensagem. Para isso vamos precisar aplicar os conceitos de spy e stub.

A biblioteca que nos ajudará com isso é o sinon, para isso faça o import no inicio do arquivo.

**IMPORTANTE: Nos testes unitários sempre que precisar de um mock, use o Sinon.**

**Use o mockserver apenas nos testes integrados e de frontend quando necessário.**

```javascript
// test/unitario.js
const expect = require('chai').expect;
const sinon = require('sinon');

// criando uma sessão para os testes da classe token
describe('OiToken', function () {
    // ...
});
```

Precisamos testar a existència do método enviar na classe OiToken.

```javascript
describe('Enviar', function () {
    it('Deve possuir o método enviar', function (done) {
        expect(oitoken).to.have.property('enviar');
        done();
    });
});
```

Agora precisamos criar o método enviar na classe OiToken

```javascript
describe('Enviar', function () {
    it('Deve possuir o método enviar', function (done) {
        expect(oitoken).to.have.property('enviar');
        done();
    });
});
```

```bash
OiToken
Gerar
    ✓ Deve possuir o método gerar
    ✓ Deve retornar uma string de 6 caracteres
    ✓ Deve gerar tokens diferentes
    ✓ Deve gerar tokens com apenas números
Enviar
    ✓ Deve possuir o método enviar


5 passing (23ms)
```

A primeira coisa que o método enviar precisa fazer é chamar o método gerar já criado para gerar um novo token.

Para isso vamos usar o spy do Sinon. O Spy espiona o método selecionado e nos dá a possibilidade de ver se ele foi chamado.

```javascript
describe('Enviar', function () {
    it('Deve possuir o método enviar', function (done) {
        expect(oitoken).to.have.property('enviar');
        done();
    });

    it('Deve chamar o método de geração de token', function (done) {
        let spyGerar = sinon.spy(oitoken, 'gerar');
        oitoken.enviar();
        expect(spyGerar.calledOnce).to.be.ok;
        done();
    });
});
```

```bash
5 passing (38ms)
1 failing

1) OiToken
    Enviar
        Deve chamar o método de geração de token:
    AssertionError: expected false to be truthy
    at Context.<anonymous> (test/unitario.js:71:46)
```

Agora ajustamos o método enviar para chamar o método gerar.

```javascript
// OiToken.js
class OiToken {
    //...

    enviar() {
        let token = this.gerar();
    };
};

module.exports = new OiToken();
```

O proximo passo é garantir que o método enviarSms da classe EnviarMensagem está sendo chamado também.

Como esse teste unitário tem uma dependência externa ( a classe de envio de mensagem ) teremos que usar o Sinon para fazer um Stub do método de enviarSms da classe EnviarMensagem garantindo que ele sempre retornará sucesso e isolando as dependências.

```javascript
it('Deve chamar o método de envio de sms', function (done) {
    // criando um stub para o metodo enviarSms da classe oitoken.enviarMensagemService
    // dessa forma garantimos que o teste unitario não dependerá de nada externo.
    let enviarMensagemStub = sinon.stub(oitoken.enviarMensagem, 'enviarSms').callsFake(() => {
        return Promise.resolve('SMS foi enviado...');
    });

    oitoken.enviar();

    expect(enviarMensagemStub.calledOnce).to.be.ok;
    done();
});
```

```bash
1) OiToken
    Enviar
        Deve chamar o método de envio de sms:
    Error: Trying to stub property 'enviar' of undefined
    at throwOnFalsyObject (node_modules/sinon/lib/sinon/throw-on-falsy-object.js:7:15)
    at Object.stub (node_modules/sinon/lib/sinon/stub.js:21:24)
    at Context.<anonymous> (test/unitario.js:77:44)
```

Agora que o teste falhou, temos que modificar a classe do OiToken para que chame o método enviar da classe de envio de SMS.

```javascript
// OiToken.js
class OiToken {
    constructor() {
        this.enviarMensagem = require('./soap/enviarMensagem');
    };

    gerar() {
        // ...
    };

    enviar() {
        let token = this.gerar();
        this.enviarMensagem.enviarSms('', '');
    };
};

module.exports = new OiToken();
```

```bash
OiToken
Gerar
    ✓ Deve possuir o método gerar
    ✓ Deve retornar uma string de 6 caracteres
    ✓ Deve gerar tokens diferentes
    ✓ Deve gerar tokens com apenas números
Enviar
    ✓ Deve possuir o método enviar
    ✓ Deve chamar o método de geração de token
    ✓ Deve chamar o método de envio de sms


7 passing (44ms)
```

Repare que nesse momento reparamos que o método enviarSms precisa de um texto que no nosso caso é o token e de um número de telefone. Nós esquecemos isso ao definir o método enviar da classe de Token, famos fazer essa alteração e testar se a classe de envio de SMS está sendo chamada com os parâmetros corretos.

Vamos aproveitar e colocar o stub do método de envio de SMS para um escopo mais global, assim todos os métodos do describe usaram esse stub.

```javascript
describe('Enviar', function () {

    let sandbox, enviarMensagemStub;

    beforeEach(() => {
        sandbox = sinon.sandbox.create();

        // criando um stub para o metodo enviar da classe oitoken.enviarMensagemService
        // dessa forma garantimos que o teste unitario não dependerá de nada externo.
        enviarMensagemStub = sandbox.stub(oitoken.enviarMensagem, 'enviarSms').callsFake(() => {
            return Promise.resolve('SMS foi enviado...');
        });
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('Deve possuir o método enviar', function (done) {
        // ...
    });

    it('Deve chamar o método de geração de token', function (done) {
        // ...
    });

    it('Deve chamar o método de envio de sms', function (done) {
        oitoken.enviar();
        expect(enviarMensagemStub.calledOnce).to.be.ok;
        done();
    });

    it('Deve chamar o método de envio de sms com os parâmetros corretos', function (done) {
        oitoken.enviar('21999999999');

        // testa se o metodo de envio de SMS esta sendo chamado com um token e com o número de telefone correto.
        expect(enviarMensagemStub.calledWith(sinon.match(/^[0-9]{6}$/), '21999999999')).to.be.ok;
        done();
    });
});
```

```bash
7 passing (53ms)
1 failing

1) OiToken
    Enviar
        Deve chamar o método de envio de sms com os parâmetros corretos:
    AssertionError: expected false to be truthy
    at Context.<anonymous> (test/unitario.js:88:91)
```

Agora repassamos os parâmetros corretamente.

```javascript
// OiToken.js
class OiToken {
    constructor() {
        this.enviarMensagem = require('./soap/enviarMensagem');
    };

    gerar() {
        // ...
    };

    enviar(numero) {
        let token = this.gerar();
        this.enviarMensagem.enviarSms(token, numero);
    };
};

module.exports = new OiToken();
```

```bash
OiToken
Gerar
    ✓ Deve possuir o método gerar
    ✓ Deve retornar uma string de 6 caracteres
    ✓ Deve gerar tokens diferentes
    ✓ Deve gerar tokens com apenas números
Enviar
    ✓ Deve possuir o método enviar
    ✓ Deve chamar o método de geração de token
    ✓ Deve chamar o método de envio de sms
    ✓ Deve chamar o método de envio de sms com os parâmetros corretos


8 passing (40ms)
```

Precisamos garantir que a ordem das chamadas está sendo respeitada.

```javascript
it('Deve respeitar o fluxo correto', function (done) {
    let spyGerar = sandbox.spy(oitoken, 'gerar');
    oitoken.enviar('219999999999');
    expect(sinon.assert.callOrder(spyGerar, enviarMensagemStub));
    done();
});
```

```bash
OiToken
Gerar
    ✓ Deve possuir o método gerar
    ✓ Deve retornar uma string de 6 caracteres
    ✓ Deve gerar tokens diferentes
    ✓ Deve gerar tokens com apenas números
Enviar
    ✓ Deve possuir o método enviar
    ✓ Deve chamar o método de geração de token
    ✓ Deve chamar o método de envio de sms
    ✓ Deve chamar o método de envio de sms com os parâmetros corretos
    ✓ Deve respeitar o fluxo correto

    9 passing (43ms)
```

Para finalizar nosso exemplo de teste unitário em grande estilo, vamos refatorar os métodos e os testes do gerar e do enviar para que virem promisses.

Começamos pelos testes, claro.

```javascript
// test/unitario.js
const expect = require('chai').expect;
const sinon = require('sinon');

// criando uma sessão para os testes da classe token
describe('OiToken', function () {

    // importando a classe OiToken
    let oitoken = require('../OiToken');

    describe('Gerar', function () {
        it('Deve possuir o método gerar', function (done) {
            expect(oitoken).to.have.property('gerar');
            done();
        });

        it('Deve retornar uma string de 6 caracteres', function (done) {
            oitoken.gerar()
                .then(token => {
                    expect(token.length).to.be.equal(6);
                    done();
                });
        });

        it('Deve gerar tokens diferentes', function (done) {

            let primeira, segunda, terceira;

            oitoken.gerar()
                .then(token => {
                    primeira = token;
                    return oitoken.gerar();
                })
                .then(token => {
                    segunda = token;
                    return oitoken.gerar();
                })
                .then(token => {
                    terceira = token;

                    expect(primeira).to.not.be.equal(segunda);
                    expect(primeira).to.not.be.equal(terceira);
                    expect(segunda).to.not.be.equal(terceira);

                    done();
                });
        });

        it('Deve gerar tokens com apenas números', function (done) {
            oitoken.gerar()
                .then(token => {
                    primeira = token;
                    return oitoken.gerar();
                })
                .then(token => {
                    segunda = token;
                    return oitoken.gerar();
                })
                .then(token => {
                    terceira = token;

                    expect(primeira).to.match(/^[0-9]{6}$/);
                    expect(segunda).to.match(/^[0-9]{6}$/);
                    expect(terceira).to.match(/^[0-9]{6}$/);

                    done();
                });
        });

    });

    describe('Enviar', function () {

        let sandbox, enviarMensagemStub;

        beforeEach(() => {
            sandbox = sinon.sandbox.create();

            // criando um stub para o metodo enviar da classe oitoken.enviarMensagemService
            // dessa forma garantimos que o teste unitario não dependerá de nada externo.
            enviarMensagemStub = sandbox.stub(oitoken.enviarMensagem, 'enviarSms').callsFake(() => {
                return Promise.resolve('SMS foi enviado...');
            });
        });

        afterEach(() => {
            sandbox.restore();
        });

        it('Deve possuir o método enviar', function (done) {
            expect(oitoken).to.have.property('enviar');
            done();
        });

        it('Deve chamar o método de geração de token', function (done) {
            let spyGerar = sandbox.spy(oitoken, 'gerar');
            oitoken.enviar()
                .then(() => {
                    expect(spyGerar.calledOnce).to.be.ok;
                    done();
                });
        });

        it('Deve chamar o método de envio de sms', function (done) {
            oitoken.enviar()
                .then(() => {
                    expect(enviarMensagemStub.calledOnce).to.be.ok;
                    done();
                });
        });

        it('Deve chamar o método de envio de sms com os parâmetros corretos', function (done) {
            oitoken.enviar('21999999999')
                .then(() => {
                    // testa se o metodo de envio de SMS esta sendo chamado com um token e com o número de telefone correto.
                    expect(enviarMensagemStub.calledWith(sinon.match(/^[0-9]{6}$/), '21999999999')).to.be.ok;
                    done();
                });

        });

        it('Deve respeitar o fluxo correto', function (done) {
            let spyGerar = sandbox.spy(oitoken, 'gerar');
            oitoken.enviar('219999999999')
                .then(() => {
                    expect(sinon.assert.callOrder(spyGerar, enviarMensagemStub));
                    done();
                });
        });
    });
});
```

```bash
2 passing (49ms)
7 failing

1) OiToken
    Gerar
        Deve retornar uma string de 6 caracteres:
    TypeError: oitoken.gerar(...).then is not a function
    at Context.<anonymous> (test/unitario.js:19:18)

2) OiToken
    Gerar
        Deve gerar tokens diferentes:
    TypeError: oitoken.gerar(...).then is not a function
    at Context.<anonymous> (test/unitario.js:30:18)

3) OiToken
    Gerar
        Deve gerar tokens com apenas números:
    TypeError: oitoken.gerar(...).then is not a function
    at Context.<anonymous> (test/unitario.js:51:18)

4) OiToken
    Enviar
        Deve chamar o método de geração de token:
    TypeError: Cannot read property 'then' of undefined
    at Context.<anonymous> (test/unitario.js:98:17)

5) OiToken
    Enviar
        Deve chamar o método de envio de sms:
    TypeError: Cannot read property 'then' of undefined
    at Context.<anonymous> (test/unitario.js:106:17)

6) OiToken
    Enviar
        Deve chamar o método de envio de sms com os parâmetros corretos:
    TypeError: Cannot read property 'then' of undefined
    at Context.<anonymous> (test/unitario.js:114:17)

7) OiToken
    Enviar
        Deve respeitar o fluxo correto:
    TypeError: Cannot read property 'then' of undefined
    at Context.<anonymous> (test/unitario.js:125:17)
```

Agora alteramos a classe OiToken

```javascript
// OiToken.js
class OiToken {
    constructor() {
        this.enviarMensagem = require('./soap/enviarMensagem');
    };

    gerar() {
        return new Promise((resolve, reject) => {
            try {
                // por ser um exemplo, não levamos em consideração como esse numero é gerado
                // precisamos apenas de um numero aleatorio de 6 caracteres
                var token = String(parseInt(Math.random() * (999999 - 111111) + 111111));

                resolve(token);

            } catch (error) {
                reject(error);
            }
        });
    };

    enviar(numero) {
        var base = this;

        return this.gerar()
            .then(token => {
                return base.enviarMensagem.enviarSms(token, numero);
            })
    };
};

module.exports = new OiToken();
```

```bash
OiToken
Gerar
    ✓ Deve possuir o método gerar
    ✓ Deve retornar uma string de 6 caracteres
    ✓ Deve gerar tokens diferentes
    ✓ Deve gerar tokens com apenas números
Enviar
    ✓ Deve possuir o método enviar
    ✓ Deve chamar o método de geração de token
    ✓ Deve chamar o método de envio de sms
    ✓ Deve chamar o método de envio de sms com os parâmetros corretos
    ✓ Deve respeitar o fluxo correto


9 passing (54ms)
```

Situação extra! Se você pegou o conceito dos testes unitários vai perceber que ainda tem uma coisa que pode melhorar.

Repare que nos testes do método enviar nós colocamos um Spy para metodo gerar, mas se levarmos em conta que estamos testando unitariamente o comportamento do método enviar seria interessante mockarmos o metodo gerar também.

Dessa forma, garantimos que um bug no método gerar não refletirá nos testes unitários do enviar mas apenas nos testes unitários do proprio método que deu erro.

Vamos então substituir o spy por um stub que retorna sempre um token qualquer.

```javascript
// test/unitario.js
const expect = require('chai').expect;
const sinon = require('sinon');

// criando uma sessão para os testes da classe token
describe('OiToken', function () {

    // importando a classe OiToken
    let oitoken = require('../OiToken');

    describe('Gerar', function () {
        // ...
    });

    describe('Enviar', function () {

        let sandbox, enviarMensagemStub, gerarStub;

        beforeEach(() => {
            // ...

            gerarStub = sandbox.stub(oitoken, 'gerar').callsFake(() => {
                return Promise.resolve('123456');
            });
        });

        // ...

        it('Deve chamar o método de geração de token', function (done) {
            oitoken.enviar()
                .then(() => {
                    expect(gerarStub.calledOnce).to.be.ok;
                    done();
                });
        });

        // ...

        it('Deve respeitar o fluxo correto', function (done) {
            oitoken.enviar('219999999999')
                .then(() => {
                    expect(sinon.assert.callOrder(gerarStub, enviarMensagemStub));
                    done();
                });
        });
    });
});
```

```bash
OiToken
    Gerar
      ✓ Deve possuir o método gerar
      ✓ Deve retornar uma string de 6 caracteres
      ✓ Deve gerar tokens diferentes
      ✓ Deve gerar tokens com apenas números
    Enviar
      ✓ Deve possuir o método enviar
      ✓ Deve chamar o método de geração de token
      ✓ Deve chamar o método de envio de sms
      ✓ Deve chamar o método de envio de sms com os parâmetros corretos
      ✓ Deve respeitar o fluxo correto


  9 passing (50ms)
```

### Exemplo de teste integrado

Continuando o problema anterior, vamos escrever alguns testes integrados.

É sempre bom poder rodar os testes unitários separadamente dos testes integrados, dessa forma ganhamos mais velocidade na execução dos testes então vamos separar a execução dos testes no package.json

```bash
"scripts": {
    "test": "./node_modules/mocha/bin/mocha ./test/unitario.js",
    "integration": "./node_modules/mocha/bin/mocha ./test/integrado.js"
}
```

```bash
npm test
npm run integration
```

Levando em consideração que apenas o metodo enviar possui integração, vou exemplificar apenas ele aqui. Os demais estão cobertos pelos testes unitários.

```javascript
// test/integrado.js
const expect = require('chai').expect;
const sinon = require('sinon');

// criando uma sessão para os testes da classe token
describe('Teste integrado OiToken', function () {

    // importando a classe OiToken
    let oitoken = require('../OiToken');

    describe('Enviar', function () {

        let sandbox;

        beforeEach(() => {
            sandbox = sinon.sandbox.create();
        });

        afterEach(() => {
            sandbox.restore();
        });

        it('Deve enviar o token', function (done) {
            // mockando apenas o gerar
            let gerarStub = sandbox.stub(oitoken, 'gerar').callsFake(() => {
                return Promise.resolve('123456');
            });

            oitoken.enviar('21999999999')
                .then(resultado => {
                    expect(resultado).to.be.equal('O SMS [123456] foi enviado para 21999999999');
                    done();
                });
        });

        it('Deve gerar o token', function (done) {
            // mockando apenas o enviar
            let gerarStub = sandbox.stub(oitoken.enviarMensagem, 'enviarSms').callsFake((token, numero) => {

                // garante que esta gerando o token
                expect(token).to.match(/^[0-9]{6}$/);

                done();
            });

            oitoken.enviar('21999999999');
        });

        it('Deve gerar e enviar o token', function (done) {
            oitoken.enviar('21999999999')
                .then(resultado => {
                    done();
                });
        });
    });
});
```

```bash
$ npm run integration

Teste integrado OiToken
Enviar
    ✓ Deve enviar o token
    ✓ Deve gerar o token
    ✓ Deve gerar e enviar o token


  3 passing (31ms)
```

## Log

Logs são extremamente importantes para o acompanhamento da saude de uma aplicação.


## APIs

Passamos grande parte dos nossos dias construindo ou consumindo APIs, essa tarefa pode ser mais fácil se respeitarmos [algumas boas praticas](https://blog.risingstack.com/10-best-practices-for-writing-node-js-rest-apis/).

Seguem algumas leituras interessantes sobre o assunto:

- https://blog.risingstack.com/10-best-practices-for-writing-node-js-rest-apis/


### Use os métodos HTTP em conjunto com as rotas

A informação sobre oque uma rota faz pode ser muito mais clara se combinarmos ela com o verbo HTTP correto.

- POST /cliente ou PUT /cliente:/id para criar um novo cliente
- GET /cliente para obter uma lista de clientes,
- GET /cliente/:id para obter um cliente específico,
- PATCH /cliente/:id para alterar um cliente,
- DELETE /cliente/:id para remover a cliente.

### Use corretamente os códigos de retorno HTTP

Existem [vários tipos de código HTTP](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes) que podem indicar claramente as diversas situações que ocorrem em nossas APIs.

- 2xx, para situações de sucesso,
- 3xx, caso o recurso tenha sido movido de lugar,
- 4xx, se o request não tenha sido realizado por um erro do cliente (como por exemplo não enviar um campo obrigatório),
- 5xx, caso algo tenha dado errado dentro da API.

Ruim:

```javascript
res.status(200).json({ erro: 'Campos obrigatórios não preenchidos' });

res.status(200).json({ erro: 'Login ou senha inválidos' });
```

Bom:

```javascript
res.status(400).json({ mensagem: 'Campos obrigatórios não preenchidos' });

res.status(403).json({ mensagem: 'Login ou senha inválidos' });
```

### Use os headers HTTP para enviar metadados

Para incluir metadados sobre o payload que você está enviando, use os [headers](https://en.wikipedia.org/wiki/List_of_HTTP_header_fields).

- paginação
- rate limit
- autenticação
- origem da requisição

É uma boa pratica iniciar os campos enviados no header com um x.

```javascript
post(URI, {
    headers: { "x-origem": 'SITE_MOVEL' }
})
```

### Autenticações com JWT

TODO: escrever

### Rate Limit

TODO: escrever

### Documentação

TODO: escrever

## Consumo de serviços

A grande maioria dos projetos tem tipo de integração com serviços externos. A ideia aqui é detalhar algumas boas praticas que devemos ter em mente no momento de consumir um serviço.

TODO: terminar o modulo de serviços

## Docker

O Docker sem dúvida revolucionou o nosso mercado..

- [NodeJs no docker](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/) que tal colocar seu ambiente de desenvolvimento dentro de um container? Ou entender melhor como empacotar sua aplicação em container para distribuir para produção? Esse artigo do nodeJs.org é bem legal.

## Garbage Colector e Memory Leaks

Por padrão a engine [V8](https://developers.google.com/v8/) do nodeJs 64-bit configura o limite do [garbage collector](https://blog.risingstack.com/node-js-at-scale-node-js-garbage-collection/) para +- [1,4GB](https://github.com/nodejs/node/wiki/Frequently-Asked-Questions). Isso significa que o motor só tentará limpar os itens não utilizados da memória caso ela chegue nesse limite de 1400MB.

Esse comportamento pode gerar muitos [problemas](https://github.com/nodejs/node/issues/3370#issuecomment-148108323), felizmente podemos enviar flags para o node e ter mais controle sobre as execuções do GC.

Para ver essas opções

```bash
node --v8-options
```

De acordo com diversas [fontes](https://devcenter.heroku.com/articles/node-best-practices#avoid-garbage), basicamente, para trabalharmos com esse problema, vamos usar 3 flags:

- optimize_for_size - Permite otimizações que favorecem o tamanho da memória sobre a velocidade de execução
- max_old_space_size - Tamanho maximo em MB da area de objetos antigos na memoria
- gc_interval - Roda o garbage colector a cada X alocações

```bash
node --optimize_for_size --max_old_space_size=920 --gc_interval=100 app.js
```

Isso se torna ainda mais importante caso você tenha um sistema que [rode em um ambiente com menos de 1,5GB disponível](http://fiznool.com/blog/2016/10/01/running-a-node-dot-js-app-in-a-low-memory-environment/).

Por exemplo, para um ambiente com 512Mb de memória, seria interessante termos a seguinte configuração:

```bash
node --optimize_for_size --max_old_space_size=460 --gc_interval=100 app.js
```

A outra possibilidade é dispor 2Gb de memória para a aplicação e deixar que o V8 faça o trabalho da maneira padrão.

Algumas leituras sobre memory leak:

- [https://www.toptal.com/nodejs/debugging-memory-leaks-node-js-applications](https://www.toptal.com/nodejs/debugging-memory-leaks-node-js-applications)
- [https://www.alexkras.com/simple-guide-to-finding-a-javascript-memory-leak-in-node-js/](https://www.alexkras.com/simple-guide-to-finding-a-javascript-memory-leak-in-node-js/)
- [https://blog.risingstack.com/finding-a-memory-leak-in-node-js/](https://blog.risingstack.com/finding-a-memory-leak-in-node-js/)
- [https://www.nearform.com/blog/self-detect-memory-leak-node/](https://www.nearform.com/blog/self-detect-memory-leak-node/)

## IDE

Para a IDE, sugerimos a utilização do VsCode pois além de rápido tem um bom suporte ao git e uma boa estrutura para debug.

Vou disponibilizar aqui os arquivos de configuração que eu utilizo para quem quiser deixar igual.

- [.vscode/launch.json](https://github.com/pedrosoteroth/boas-praticas/blob/master/configuracoes/vscode/launch.json) - Esse arquivo mora dentro da pasta .vscode do seu projeto e serve para informar configuraçoes de debug da aplicação. Eu gosto de definir o environment direto nesse arquivo quando vou debugar a aplicação, dessa forma não é necessario ficar copiando arquivos para apontar a aplicação para um ambiente específico.

- [User Settings](https://github.com/pedrosoteroth/boas-praticas/blob/master/configuracoes/vscode/userSettings.json) - Nesse arquivo estão minhas preferencias pessoais de identação, save, pastas excluidas da pesquisa etc.

## Leituras

- [The Modern JavaScript Tutorial](https://javascript.info/)
- [Documentação da Mozilla para o Javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [Documentação do NodeJs](https://nodejs.org/en/docs/guides/)
- [Google Js Best Pratices](https://google.github.io/styleguide/javascriptguide.xml)
- [Codigo Limpo - Robert Cecil Martin](https://www.amazon.com.br/C%C3%B3digo-Limpo-Habilidades-Pr%C3%A1ticas-Software/dp/8576082675)
- [Clean Code Javascript](https://github.com/ryanmcdermott/clean-code-javascript/blob/master/README.md#introduction)
- [Boas práticas para projetos em Node.JS](http://vizir.com.br/2016/06/boas-praticas-para-projetos-em-node-js/)
- [Arrays](https://medium.com/vizir-software-studio/no-javascript-o-array-pode-ser-seu-amigo-abe46c262147)
- [Bets Pratices for node rest apis](https://blog.risingstack.com/10-best-practices-for-writing-node-js-rest-apis/)