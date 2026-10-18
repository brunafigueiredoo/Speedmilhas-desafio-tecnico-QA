# Notas

## Tempo gasto
1h Planejamento de testes 
1h e 20min - Automação de Testes 
1h e 40min Testes Gerais e Bugs 

## Como rodar a automação

### Pré-requisitos
- Node.js instalado.
- Docker Desktop instalado e em execução.
- Aplicação Speedmilhas iniciada e acessível localmente.
- Dependências do projeto instaladas.

### 1. Preparar o ambiente

Abra o terminal e acesse a pasta do projeto de automação:

```bash
cd Speedmilhas-desafio-tecnico-QA
```

Instale as dependências, caso ainda não estejam instaladas:

```bash
npm install
```

Certifique-se de que a aplicação esteja em execução antes de iniciar os testes.

### 2. Executar a automação no navegador

Para abrir a interface gráfica do Cypress, execute:

```bash
npx cypress open
```

Na interface do Cypress:

1. Selecione **E2E Testing**.
2. Escolha o navegador desejado, como Chrome ou Electron.
3. Clique em **Start E2E Testing**.
4. Na lista de arquivos de teste, selecione o arquivo que deseja executar, como `e2e.cy.js`.
5. Acompanhe a execução dos cenários diretamente no navegador, visualizando as interações realizadas e os resultados de cada teste.

Ao final, o Cypress exibirá os cenários aprovados e reprovados, permitindo analisar eventuais falhas.

### 3. Executar a automação pelo terminal

Para executar os testes em modo headless, sem abrir a interface gráfica do navegador, utilize:

```bash
npm run test:qa
```

O resultado da execução será apresentado no terminal, com o resumo dos testes executados e seus respectivos status.

## O que eu faria com mais tempo
Executaria testes exploratórios adicionais na interface, investigando inconsistências na apresentação das ofertas e nas informações exibidas ao usuário.
Ampliaria a cobertura automatizada, incluindo mais cenários negativos, validações de campos obrigatórios, combinações de datas e regras de negócio.
Complementaria a documentação de QA, detalhando os cenários de testes manuais, as evidências dos defeitos encontrados e os resultados da execução.

## Como usei IA
Usei IA  no planejamento de testes. Na minha analise, eu faria esses titulos para cenário de testes, e a IA criou o BDD de acordo com cada titulo que eu queria. para a agilidade e padrão de escrita. 
Repeti o processo na escrita de bugs. 
Anotações: 

""DADOS DE PESQUISA: 

BUSCA COM TODOS OS DADOS - IDA, VOLTA E DESTINOS,
 BUSCA SEM TODOS OS CAMPOS PREENCHIDOS, 
BUSCA COM DATA DE IDA NO PASSADO, 
BUSCA COM DATA DE VOLTA ANTES DA IDA, 

RESULTADO DE PESQUISA: 

COM A BUSCA CONCLUIDA, ORDENAR POR ORDEM DE MILHAS. DO MENOR PARA O MAIOR,
BUSCA COM RESULTADO texto  "45000" E AINDA SIM SER VALIDO,
RESULTADO DA BUSCA SEM TAXA DE EMBARQUE E A MENSAGEM DE SINALIZAÇÃO É INFORMADA  "taxa não informada"  não pode ser reservada,
busca responde em até 6 segundos,
BUSCAR PARCIAL TER A MENSAGEM: "Pode haver mais opções para estes dados", 
BUSCA NÃO CONCLUIDA TER A MENSAGEM "Nenhuma oferta disponível agora", 
NO RESULTADO DE PESQUISA TER DOIS PREÇOS  milhas e reais,  
A taxa de serviço é 7% da taxa de embarque, arredondada para cima ao centavo - SER CALCULADO EM TODAS AS BUSCAS,
TENTAR FECHAR UM COTAÇÃO ANTES de 10 minutos,
TENTAR FECHAR UM COTAÇÃO PROXIMO de 10 minutos,
TENTAR FECHAR UM COTAÇÃO DEPOIS  de 10 minutos.  Depois disso a reserva é recusada e é preciso buscar de novo,
Cotação inexistente na consulta de oferta,


RESERVA 

RESERVA SEM PREENCHER NOME,
RESERVAR COM CPF VALIDO,
RESERVA PREENCHENDO OS DADOS,
Documento (CPF ou passaporte) e e-mail são indiretamente, 
PEDIDO  INVALIDO TER O ERRO 400 E NUNCA 500,
RENVIO DA MESMA CHAVE DE IDEMPOTENCIA COM DADOS DIFERETES,
FAZER VARIOS PEDIDOS INVALIDOS PARA VER SE APARECE O ERRO 500,
Clique duplo, reprodução de rede ou reenvio do mesmo pedido não podem criar reservas a mais,
O pedido traz uma idempotencyKey: a mesma chave devolve a mesma reserva ( 201e cabeçalho Idempotent-Replay: true.),
A mesma oferta pode ser reservada mais de uma vez, por exemplo para passageiros diferentes, desde que sejam possíveis reservas diferentes,
RESERVAR PARA PASSAGERIOS DIFERENTES,
RESERVAR PARA PASSAGEIROS IGUIAS,

AGENCIA 

ESCOLHER AGENCIA NO TOPO DA PAGINA,
OPÇÃO   Alfa Turismo,  Beta Viagens,
 ter os mesmo comportamentos com a duas agencias,
na api não aparecer no header,
criar reserva sem agencia , a resposta é 401,
criar reserva com agencia  a e b e ser concluido com sucesso, 
PEDIDO DA AGENCIA A, E TENTAR CONSULTAR COM A AGENCIA B - PEDIDO NEGADO 404,
PEDIDO DA AGENCIA B , E TENTAR CONSULTAR COM A AGENCIA A - PEDIDO NEGADO 404,
CONSULTAR PEDIDO DA MESMA AGENCIA - PEDIDO CONSULTADO COM SUCESSO - AGENCIA A, 
CONSULTAR PEDIDO DA MESMA AGENCIA - PEDIDO CONSULTADO COM SUCESSO - AGENCIA B,

API 

POST RESPONDER COM -  Busca. Corpo:{ "origin": "GRU", "destination": "GIG", "date": "2026-12-01" },
GET /search/stream?origin=&destination=&date=	A mesma busca, entregue em partes (SSE). É o que a tela usa,
GET /quotes/:id	Uma oferta e se ela ainda pode ser reservada,
GET /clients	As agências cadastradas,
POST /orders	Reserva Corpo:{ "quoteId", "passageiro": { "nome", "documento", "documentoTipo", "email" }, "idempotencyKey" },
GET /orders	As reservas da agência do header
GET /orders/:id	Uma reserva da agência do header
os erros seguem um formato único: { "error": { "code": "QUOTE_EXPIRED", "message": "…" } }.""


<!-- Ferramentas, para quê, e um ponto em que você discordou dela ou corrigiu o que ela sugeriu. -->
