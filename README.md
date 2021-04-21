# plantmanager
Projeto em React Native criado durante o evento *Next Level Week #5* da RocketSeat

## Utilização
Para a utilização do servidor fake em *json*, a instalação da dependência *json-server* deve ser global (com a opção '-g' no *npm* ou 'global' no *yarn*) e devemos utilizar o comando abaixo, modificando de acordo com o local do arquivo, o IP da máquina e a porta desejada:

```json-server ./src/services/server.json --host localhost --port 3333```

Essa API fake pode ser acessada também no navegador.
Caso desejemos simular um delay nas chamadas à API, podemos modificar o comando acima, passando o *delay* em ms:

```json-server ./src/services/server.json --host localhost --port 3333 --delay 700```

Documentação:
* JSON Server: https://github.com/typicode/json-server