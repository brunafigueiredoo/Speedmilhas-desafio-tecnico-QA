# QA Notes — Desafio Speedmilhas

## Tempo gasto

- Planejamento de testes: 1 hora.
- Automação de testes: 1 hora e 20 minutos.
- Testes gerais e análise de bugs: 1 hora e 40 minutos.

**Tempo total:** 4 horas.

## Como executar a automação

### Pré-requisitos

- Node.js instalado.
- Docker Desktop instalado e em execução.
- Dependências do projeto instaladas.

### 1. Iniciar a aplicação

Na raiz do projeto, execute:

```bash
docker compose up --build
```

Aguarde a inicialização dos serviços antes de executar os testes.

### 2. Instalar as dependências

Em outro terminal, na raiz do projeto, execute:

```bash
npm install
```

### 3. Executar os testes automatizados

Para executar os testes pelo terminal, utilize:

```bash
npm run test:qa
```

O comando executa os testes Cypress localizados na pasta `qa`, incluindo os cenários de API e interface.

Para abrir a interface gráfica do Cypress, execute:

```bash
npx cypress open
```

Selecione o modo E2E e escolha o arquivo de teste que deseja executar.

## O que eu faria com mais tempo

Concluiria a revisão do código existente, que não foi realizada nesta etapa porque o tempo previsto para o desafio já havia sido ultrapassado durante a execução das atividades de planejamento, automação e testes.

Também ampliaria os testes exploratórios da interface, aprofundaria a cobertura automatizada de cenários negativos e regras de negócio e documentaria os defeitos confirmados com suas respectivas evidências.

## Como usei IA

Utilizei IA como apoio ao planejamento dos testes, à estruturação dos cenários em BDD/Gherkin e à redação das descrições de possíveis bugs. As sugestões foram avaliadas de acordo com as regras da especificação e com o comportamento observado na aplicação.

Um exemplo de discordância foi a decisão de não ignorar a exceção do React para fazer os testes passarem artificialmente. Como a causa da falha não foi confirmada e o tempo previsto para o desafio já havia sido atingido, optei por preservar o resultado real da execução e registrar a limitação para análise posterior.

---

## Anotações de testes exploratórios

Os cenários listados a seguir representam os pontos considerados durante o planejamento e a exploração da aplicação. A listagem não significa que todos foram executados ou automatizados.

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
