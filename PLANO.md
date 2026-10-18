# Plano de Testes — Desafio QA Pleno | Speedmilhas

## 1. Riscos, em ordem de prioridade

1. **Críticos:** reservas duplicadas, falhas de idempotência, cotações expiradas, acesso indevido entre agências e reservas de ofertas sem taxa de embarque informada.
2. **Altos:** validações de dados, cálculo de preços, consolidação de fornecedores, resultados parciais e tempo de resposta da busca.
3. **Médios:** contratos da API, consistência entre busca e streaming, ordenação das ofertas e seleção de agência.
4. **Baixos:** mensagens de retorno e apresentação de informações na interface.

## 2. Cenários de teste em BDD

### Busca de passagens

**CT01 — Buscar passagem de ida com dados válidos**

Dado que o usuário informa origem, destino e data de ida válidos  
Quando solicita a busca de passagens  
Então o sistema deve consultar os fornecedores e apresentar as ofertas disponíveis em ordem crescente de milhas.

**CT02 — Buscar passagem de ida e volta**

Dado que o usuário informa origem, destino, data de ida e data de volta válidos  
Quando solicita a busca  
Então o sistema deve consultar as opções para os dois trechos, considerando cada trecho separadamente.

**CT03 — Impedir busca com origem igual ao destino**

Dado que o usuário informa o mesmo aeroporto como origem e destino  
Quando solicita a busca  
Então o sistema deve rejeitar a solicitação.

**CT04 — Impedir busca com aeroporto não suportado**

Dado que o usuário informa um código de aeroporto não suportado  
Quando solicita a busca  
Então o sistema deve rejeitar a solicitação com uma mensagem de validação.

**CT05 — Impedir busca com data de ida passada**

Dado que o usuário informa uma data de ida anterior à data atual  
Quando solicita a busca  
Então o sistema deve rejeitar a solicitação.

**CT06 — Impedir volta anterior à ida**

Dado que o usuário informa uma data de volta anterior à data de ida  
Quando solicita a busca  
Então o sistema deve rejeitar a solicitação.

**CT07 — Validar campos obrigatórios da busca**

Dado que o usuário omite um ou mais campos obrigatórios  
Quando solicita a busca  
Então o sistema deve informar os campos inválidos ou ausentes sem gerar erro interno.

**CT08 — Consolidar ofertas dos fornecedores**

Dado que os fornecedores A, B e C retornam ofertas válidas  
Quando a busca é concluída  
Então o sistema deve consolidar todas as ofertas válidas recebidas e ordená-las por quantidade crescente de milhas.

**CT09 — Interpretar milhas retornadas como texto**

Dado que o fornecedor C retorna a quantidade de milhas como texto, por exemplo "45000"  
Quando o sistema processa a resposta  
Então deve interpretar corretamente o valor e incluir a oferta na consolidação.

**CT10 — Apresentar resultados parciais quando um fornecedor falha**

Dado que um fornecedor falha e os demais retornam ofertas  
Quando a busca é processada  
Então o sistema deve apresentar as ofertas recebidas e exibir "Pode haver mais opções para estes dados".

**CT11 — Apresentar resultados parciais quando um fornecedor demora**

Dado que um fornecedor demora além do limite da busca e outros já retornaram ofertas  
Quando o sistema encerra a espera pelos resultados  
Então deve apresentar as ofertas recebidas e exibir "Pode haver mais opções para estes dados".

**CT12 — Informar ausência de resposta dos fornecedores**

Dado que nenhum fornecedor responde dentro do limite estabelecido  
Quando a busca é concluída  
Então o sistema deve exibir "Nenhuma oferta disponível agora".

**CT13 — Diferenciar ausência de ofertas de falha dos fornecedores**

Dado que todos os fornecedores respondem corretamente, mas nenhum retorna ofertas  
Quando o sistema consolida as respostas  
Então deve informar que não há ofertas disponíveis sem classificar a situação como falha de fornecedor.

**CT14 — Respeitar o limite de seis segundos**

Dado que um ou mais fornecedores apresentam demora  
Quando o usuário solicita a busca  
Então o sistema deve apresentar os resultados disponíveis em até seis segundos.

**CT15 — Retornar eventos pelo endpoint de streaming**

Dado que o consumidor acessa GET /search/stream com parâmetros válidos  
Quando a busca é processada  
Então o sistema deve disponibilizar os eventos de resultados conforme o contrato SSE.

### Preços e cotações

**CT16 — Exibir os componentes do preço**

Dado que uma oferta possui quantidade de milhas e taxa de embarque  
Quando o sistema apresenta o preço  
Então deve exibir as milhas e o valor em reais, incluindo a taxa de embarque e a taxa de serviço.

**CT17 — Calcular a taxa de serviço de 7%**

Dado que a taxa de embarque é de R$ 39,76  
Quando o sistema calcula a taxa de serviço  
Então deve calcular R$ 2,79 e apresentar o total de R$ 42,55.

**CT18 — Impedir reserva de oferta sem taxa de embarque informada**

Dado que uma oferta não possui taxa de embarque informada  
Quando o sistema apresenta os resultados  
Então deve exibir "taxa não informada" e impedir a reserva.

**CT19 — Consultar cotação existente**

Dado que existe uma cotação com ID válido  
Quando o consumidor acessa GET /quotes/:id  
Então o sistema deve retornar os dados da cotação correspondente.

**CT20 — Reservar cotação ainda válida**

Dado que a cotação está dentro do prazo de validade de dez minutos  
E que os demais dados da reserva são válidos  
Quando o usuário solicita a reserva  
Então o sistema deve permitir o processamento.

**CT21 — Validar cotação próxima do vencimento**

Dado que uma cotação está próxima do limite de dez minutos  
Quando a reserva é solicitada antes e depois do vencimento  
Então o sistema deve aceitar a cotação ainda válida e rejeitar a expirada.

**CT22 — Rejeitar cotação expirada**

Dado que a cotação ultrapassou o prazo de validade de dez minutos  
Quando o usuário tenta reservar a oferta  
Então o sistema deve rejeitar a reserva e informar que é necessária uma nova busca.

**CT23 — Consultar cotação inexistente**

Dado que o consumidor informa um ID de cotação inexistente  
Quando acessa GET /quotes/:id  
Então o sistema deve retornar um erro adequado sem gerar erro interno 500.

**CT24 — Validar arredondamento da taxa de serviço em diferentes valores**

Dado que a taxa de embarque possui valores que produzem resultados decimais diferentes no cálculo de 7%  
Quando o sistema calcula a taxa de serviço  
Então deve arredondar sempre para cima na segunda casa decimal e calcular corretamente o total em reais.

### Reservas e validações

**CT25 — Realizar reserva com dados válidos**

Dado que a cotação está válida e o passageiro informa os dados obrigatórios  
Quando solicita a reserva  
Então o sistema deve criar a reserva e retornar a confirmação.

**CT26 — Impedir reserva sem nome do passageiro**

Dado que o passageiro não informa o nome obrigatório  
Quando envia a solicitação  
Então o sistema deve retornar erro 400 com mensagem explicativa.

**CT27 — Validar documento inválido**

Dado que o passageiro informa um documento inválido  
Quando envia a solicitação  
Então o sistema deve retornar erro 400 sem gerar erro 500.

**CT28 — Validar tipo de documento inválido**

Dado que o passageiro informa um tipo de documento não aceito  
Quando envia a solicitação  
Então o sistema deve retornar erro 400.

**CT29 — Validar e-mail inválido**

Dado que o passageiro informa um e-mail em formato inválido  
Quando envia a solicitação  
Então o sistema deve retornar erro 400.

**CT30 — Validar diferentes dados inválidos pela API**

Dado que a solicitação contém dados inválidos ou obrigatórios ausentes  
Quando a API processa a solicitação  
Então deve retornar o erro adequado, com mensagem explicativa, sem gerar erro 500.

**CT31 — Permitir reserva sem documento**

Dado que o passageiro informa os demais dados obrigatórios e não preenche o documento  
Quando solicita a reserva  
Então o sistema deve permitir o processamento sem rejeitar a solicitação pela ausência do documento.

**CT32 — Permitir reserva sem e-mail**

Dado que o passageiro informa os demais dados obrigatórios e não preenche o e-mail  
Quando solicita a reserva  
Então o sistema deve permitir o processamento sem rejeitar a solicitação pela ausência do e-mail.

**CT33 — Garantir idempotência em uma nova tentativa**

Dado que uma reserva foi criada com determinada idempotencyKey  
Quando a mesma solicitação é reenviada com a mesma chave  
Então o sistema deve retornar a mesma reserva, com status 201 e cabeçalho Idempotent-Replay: true, sem criar duplicata.

**CT34 — Tratar reutilização da chave com dados diferentes**

Dado que uma solicitação foi processada com determinada idempotencyKey  
Quando outra solicitação com dados diferentes é enviada usando a mesma chave  
Então o sistema deve preservar a integridade da reserva e não criar uma duplicata indevida.

**CT35 — Evitar reservas duplicadas em solicitações simultâneas**

Dado que duas solicitações idênticas são enviadas simultaneamente com a mesma idempotencyKey  
Quando o sistema processa as requisições  
Então deve existir apenas uma reserva criada.

**CT36 — Permitir reservas distintas para a mesma oferta**

Dado que dois passageiros desejam reservar a mesma oferta válida  
Quando enviam solicitações com chaves de idempotência distintas  
Então o sistema deve permitir reservas independentes.

**CT37 — Não bloquear reservas apenas pela repetição do nome**

Dado que duas reservas independentes possuem passageiros com o mesmo nome  
Quando são enviadas com chaves de idempotência distintas  
Então o sistema não deve tratá-las como duplicadas apenas pela coincidência do nome.

### Agências e isolamento de dados

**CT38 — Consultar as agências disponíveis**

Dado que o consumidor acessa GET /clients  
Quando a API processa a solicitação  
Então deve retornar as agências cadastradas, incluindo Alfa Turismo (alfa-turismo) e Beta Viagens (beta-viagens).

**CT39 — Exibir seletor de agência**

Dado que o usuário acessa a interface de busca  
Quando visualiza os campos da página  
Então deve encontrar o seletor de agência com as opções disponíveis.

**CT40 — Exigir agência para realizar reserva**

Dado que uma solicitação de reserva não contém uma agência válida no contexto esperado  
Quando é enviada à API  
Então o sistema deve rejeitar a solicitação com erro 401.

**CT41 — Realizar reserva pela Alfa Turismo**

Dado que a agência selecionada é Alfa Turismo  
E que os demais dados são válidos  
Quando a reserva é enviada  
Então a reserva deve ser associada à Alfa Turismo.

**CT42 — Realizar reserva pela Beta Viagens**

Dado que a agência selecionada é Beta Viagens  
E que os demais dados são válidos  
Quando a reserva é enviada  
Então a reserva deve ser associada à Beta Viagens.

**CT43 — Consultar reserva da própria agência**

Dado que uma reserva pertence à agência autenticada  
Quando a agência consulta GET /orders ou GET /orders/:id  
Então o sistema deve retornar apenas os dados aos quais ela tem acesso.

**CT44 — Impedir acesso da Alfa Turismo à reserva da Beta Viagens**

Dado que uma reserva pertence à Beta Viagens  
Quando a Alfa Turismo tenta consultar essa reserva pelo ID  
Então o sistema deve retornar erro 404.

**CT45 — Impedir acesso da Beta Viagens à reserva da Alfa Turismo**

Dado que uma reserva pertence à Alfa Turismo  
Quando a Beta Viagens tenta consultar essa reserva pelo ID  
Então o sistema deve retornar erro 404.

**CT46 — Isolar a listagem de reservas por agência**

Dado que existem reservas vinculadas a diferentes agências  
Quando uma agência consulta GET /orders  
Então o sistema deve retornar somente as reservas pertencentes a ela.

### Contratos da API

**CT47 — Padronizar mensagens de erro**

Dado que a API precisa rejeitar uma solicitação  
Quando retorna uma resposta de erro  
Então deve utilizar o formato padronizado previsto na especificação, com código e mensagem adequados.

**CT48 — Validar contrato do endpoint de busca**

Dado que o consumidor envia uma solicitação válida para POST /search  
Quando informa origin, destination e date no corpo da requisição  
Então a API deve processar os parâmetros conforme o contrato.

**CT49 — Validar contrato do endpoint de reserva**

Dado que o consumidor envia uma solicitação para POST /orders  
Quando informa quoteId, passageiro e idempotencyKey no formato esperado  
Então a API deve validar os campos e processar a reserva conforme o contrato.

**CT50 — Validar a identificação da agência pelo cabeçalho x-client-id**

Dado que a agência é identificada pelo cabeçalho `x-client-id`  
Quando uma solicitação é enviada com um identificador de agência válido ou sem esse cabeçalho  
Então o sistema deve identificar a agência correspondente quando o cabeçalho for válido e rejeitar a solicitação quando o cabeçalho for obrigatório e estiver ausente, conforme as regras do contrato.

**CT51 — Manter consistência entre busca e streaming**

Dado que POST /search e GET /search/stream são utilizados com os mesmos parâmetros  
Quando os resultados são recebidos e consolidados  
Então as ofertas e os estados apresentados devem ser consistentes, respeitando as diferenças entre resposta tradicional e eventos SSE.

## 3. O que automatizar

- Validações dos dados de busca e reserva.
- Cálculo de preços e arredondamento.
- Contratos dos endpoints e padronização de erros.
- Validade das cotações.
- Idempotência, duplicidade e concorrência.
- Isolamento de dados entre agências.
- Consistência entre busca e streaming.

## 4. O que testar manualmente

- Fluxo completo da busca até a reserva.
- Seleção de agência na interface.
- Apresentação de resultados parciais e mensagens ao usuário.
- Comportamento diante de fornecedores lentos ou indisponíveis.
- Conferência exploratória dos resultados e das informações retornadas pela API.

## 5. O que fica de fora agora, e por quê

- **Testes de carga e estresse:** não há critérios de volume e concorrência definidos na especificação.
- **Testes de segurança abrangentes:** a prioridade inicial é validar as regras de acesso entre agências descritas no desafio.
- **Compatibilidade extensa entre navegadores e dispositivos:** não há matriz de compatibilidade definida.
- **Testes de recuperação de infraestrutura:** dependem de ambiente e recursos operacionais não especificados.
