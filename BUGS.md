# Bugs encontrados

<!-- Copie o bloco abaixo para cada bug. Gravidade: crítica, alta, média ou baixa. -->

**BUG-01** — Busca aceita aeroporto não suportado e retorna erro 503

Cenário: Rejeita aeroporto não suportado

Descrição: Ao realizar uma busca de passagens utilizando um código de aeroporto não suportado (XXX), a API retorna HTTP 503 em vez de rejeitar a requisição por meio de um erro de validação.

Passos para reprodução:

Enviar uma requisição POST /search.

Informar XXX como origem ou destino, mantendo os demais campos válidos.

Verificar o status da resposta.

Resultado esperado: A API deve rejeitar a requisição com HTTP 400 ou 422, informando que o aeroporto não é suportado, conforme as regras da especificação.

Resultado obtido: A API retorna HTTP 503.

Evidência: Teste automatizado CT04 reprovado na execução Cypress. Resultado obtido: 503; resultado esperado: 400 ou 422.

Criticidade Média
Evidencia: <img width="1280" height="720" alt="Speedmilhas â€” 51 cenÃ¡rios de QA -- CT04 â€” Rejeita aeroporto nÃ£o suportado (failed)" src="https://github.com/user-attachments/assets/892ef3b5-de82-49dd-b0fb-5d29213c509e" />


**BUG-02** — Busca aceita data de volta anterior à data de ida

Cenário:Rejeita volta anterior à ida

Descrição: Ao realizar uma busca de passagens de ida e volta com a data de retorno anterior à data de partida, a API aceita a requisição e retorna HTTP 200, sem rejeitar a inconsistência entre as datas.

Passos para reprodução:

Enviar uma requisição POST /search com origem e destino válidos.

Informar uma data de ida posterior à data de volta.

Verificar o status da resposta.

Resultado esperado: A API deve rejeitar a requisição com HTTP 400 ou 422, informando que a data de volta não pode ser anterior à data de ida, conforme as regras da especificação.

Resultado obtido: A API retorna HTTP 200 e aceita a busca.

Criticidade Alta
Evidência: 
<img width="1476" height="877" alt="image" src="https://github.com/user-attachments/assets/be868408-dde5-4635-8f11-13206f510b1d" />

**BUG-03** — Ausência da diferença de milhas na identificação do parceiro

Descrição: Na listagem de ofertas de passagens, a primeira opção da GOL, proveniente do parceiro B, exibe apenas o texto “via parceiro B”, sem apresentar a diferença de milhas em relação à melhor oferta. Em outras opções da mesma listagem, essa informação é exibida normalmente.

Passos para reprodução:

Realizar uma busca de passagens de ida e volta.

Acessar a seção de resultados referente à volta.

Localizar a primeira oferta da GOL, identificada como proveniente do parceiro B.

Comparar a identificação do parceiro com as ofertas seguintes.

Resultado esperado: A identificação do parceiro deve apresentar a diferença de milhas em relação à melhor oferta, seguindo o mesmo padrão visual e informativo utilizado nas demais opções, quando aplicável.

Resultado obtido: A primeira oferta da GOL exibe somente “via parceiro B”, sem apresentar a diferença de milhas.

Evidência: Captura de tela dos resultados da busca, mostrando a primeira oferta da GOL sem a informação complementar e as ofertas seguintes com essa informação.

Criticidade Média

Evidência: <img width="1658" height="893" alt="2026-10-16T12_00_24" src="https://github.com/user-attachments/assets/3dfe14dd-b722-4a45-8e70-650a57ce1a3c" />

 **BUG-04** — Oferta de passagem não apresenta o preço em reais

Descrição: Uma oferta de passagem é exibida com o valor em milhas, sem apresentar o preço correspondente em reais, deixando incompleta a informação sobre o custo da passagem.

Passos para reprodução:
1. Realizar uma busca de passagens de ida e volta.
2. Acessar a listagem de resultados.
3. Verificar os valores apresentados nas ofertas de passagens.
4. Identificar uma oferta que exibe apenas o valor em milhas, sem o preço em reais.

Resultado esperado: Cada oferta deve apresentar o valor em milhas e o valor em reais, composto pela taxa de embarque e pela taxa de serviço, conforme especificado na SPEC.

Resultado obtido: A oferta identificada apresenta somente o valor em milhas, sem informar o preço em reais.

Evidência: Captura de tela da oferta que apresenta o valor em milhas sem o correspondente preço em reais.


Criticidade: Alta 

Evidência: <img width="1658" height="893" alt="2026-10-16T12_00_24" src="https://github.com/user-attachments/assets/e2d654ca-7a9d-4738-ae4a-7f026350400f" />

