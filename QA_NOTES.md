# Notas

## Tempo gasto
1H Planejamento de testes 
## Como rodar a automação

```bash
```

## O que eu faria com mais tempo

## Como usei IA
Usei IA  no planejamento de testes, na minha analise, eu faria esses titulos para cenário de testes, e a IA criou o BDD de acordo com cada titulo que eu queria. para a agilidade e padrão de escrita. 
Anotações: 
""DADOS DE PESQUISA: 
BUSCA COM TODOS OS DADOS - IDA, VOLTA E DESTINOS 
BUSCA SEM TODOS OS CAMPOS PREENCHIDOS 
BUSCA COM DATA DE IDA NO PASSADO 
BUSCA COM DATA DE VOLTA ANTES DA IDA 

RESULTADO DE PESQUISA: 
COM A BUSCA CONCLUIDA, ORDENAR POR ORDEM DE MILHAS. DO MENOR PARA O MAIOR.
BUSCA COM RESULTADO texto  "45000" E AINDA SIM SER VALIDO. 
RESULTADO DA BUSCA SEM TAXA DE EMBARQUE E A MENSAGEM DE SINALIZAÇÃO É INFORMADA  "taxa não informada"  não pode ser reservada .
busca responde em até 6 segundos
BUSCAR PARCIAL TER A MENSAGEM: "Pode haver mais opções para estes dados" 
BUSCA NÃO CONCLUIDA TER A MENSAGEM "Nenhuma oferta disponível agora" 
NO RESULTADO DE PESQUISA TER DOIS PREÇOS  milhas e reais.  
A taxa de serviço é 7% da taxa de embarque, arredondada para cima ao centavo - SER CALCULADO EM TODAS AS BUSCAS 
TENTAR FECHAR UM COTAÇÃO ANTES de 10 minutos.
TENTAR FECHAR UM COTAÇÃO PROXIMO de 10 minutos.
TENTAR FECHAR UM COTAÇÃO DEPOIS  de 10 minutos.  Depois disso a reserva é recusada e é preciso buscar de novo.
Cotação inexistente na consulta de oferta.


RESERVA 

RESERVA SEM PREENCHER NOME 
RESERVAR COM CPF VALIDO
RESERVA PREENCHENDO OS DADOS 
Documento (CPF ou passaporte) e e-mail são indiretamente. 
PEDIDO  INVALIDO TER O ERRO 400 E NUNCA 500 
RENVIO DA MESMA CHAVE DE IDEMPOTENCIA COM DADOS DIFERETES 
FAZER VARIOS PEDIDOS INVALIDOS PARA VER SE APARECE O ERRO 500 
Clique duplo, reprodução de rede ou reenvio do mesmo pedido não podem criar reservas a mais.
O pedido traz uma idempotencyKey: a mesma chave devolve a mesma reserva ( 201e cabeçalho Idempotent-Replay: true)
A mesma oferta pode ser reservada mais de uma vez, por exemplo para passageiros diferentes, desde que sejam possíveis reservas diferentes.
RESERVAR PARA PASSAGERIOS DIFERENTES 
RESERVAR PARA PASSAGEIROS IGUIAS 

AGENCIA 

ESCOLHER AGENCIA NO TOPO DA PAGINA 
OPÇÃO   Alfa Turismo,  Beta Viagens ]
 ter os mesmo comportamentos com a duas agencias 
na api não aparecer no header
criar reserva sem agencia , a resposta é 401 .
criar reserva com agencia  a e b e ser concluido com sucesso. 
PEDIDO DA AGENCIA A, E TENTAR CONSULTAR COM A AGENCIA B - PEDIDO NEGADO 404 
PEDIDO DA AGENCIA B , E TENTAR CONSULTAR COM A AGENCIA A - PEDIDO NEGADO 404 
CONSULTAR PEDIDO DA MESMA AGENCIA - PEDIDO CONSULTADO COM SUCESSO - AGENCIA A 
CONSULTAR PEDIDO DA MESMA AGENCIA - PEDIDO CONSULTADO COM SUCESSO - AGENCIA B

API 

POST RESPONDER COM -  Busca. Corpo:{ "origin": "GRU", "destination": "GIG", "date": "2026-12-01" }
GET /search/stream?origin=&destination=&date=	A mesma busca, entregue em partes (SSE). É o que a tela usa
GET /quotes/:id	Uma oferta e se ela ainda pode ser reservada
GET /clients	As agências cadastradas
POST /orders	Reserva Corpo:{ "quoteId", "passageiro": { "nome", "documento", "documentoTipo", "email" }, "idempotencyKey" }
GET /orders	As reservas da agência do header
GET /orders/:id	Uma reserva da agência do header
os erros seguem um formato único: { "error": { "code": "QUOTE_EXPIRED", "message": "…" } }.""


<!-- Ferramentas, para quê, e um ponto em que você discordou dela ou corrigiu o que ela sugeriu. -->
