- [X] Deve ser possível criar um usuário
- [X] Deve ser possível criar um usuário
- [X] Deve ser possível identificar o usuário entre as requisições
- [X] Deve ser possível registrar uma refeição feita, com as seguintes informações:{ Nome, Descrição, Data e Hora, Está dentro ou não da dieta}
- [X] Deve ser possível editar uma refeição, podendo alterar todos os dados acima
- [X] Deve ser possível apagar uma refeição
- [X] Deve ser possível listar todas as refeições de um usuário
- [X] Deve ser possível visualizar uma única refeição
- [X] O usuário só pode visualizar, editar e apagar as refeições o qual ele criou
- [X] Deve ser possível recuperar as métricas de um usuário: 
- 
  Quantidade total de refeições registradas,
  Quantidade total de refeições dentro da dieta,
  Quantidade total de refeições fora da dieta,
  Melhor sequência de refeições dentro da dieta.

  - Instalação: npm install

  - Rotas:
    Rotas de usuário
      POST http://localhost:3333/user/create
      POST http://localhost:3333/user/login
      GET  http://localhost:3333/user/summary

    Rotas de refeições
      POST http://localhost:3333/diet/create
      GET  http://localhost:3333/diet
      PUT  http://localhost:3333/diet/:id
      DELETE  http://localhost:3333/diet/:id


    
