# App

Gympass style App

# RFs (Requisitos funcionais) -> Funcionalidades da nossa aplicação

- [X] Deve ser possível se cadastrar;
- [X] Deve ser possível se autenticar após o cadastro;
- [X] Deve ser possível obter o perfil de um usuário logado;
- [X] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [X] Deve ser possível o usuário obter o histórico de check-ins;
- [X] Deve ser possível o usuário buscar academias próximas a ele (até 10 km);
- [X] Deve ser possível buscar academias pelo nome;
- [X] Deve ser possível o usuário realizar check-in em uma academia;
- [ ] Deve ser possível validar o check-in de um usuário;
- [X] Deve ser possível cadastrar uma academia;

# RNs (Regras de negócio) -> São regras que limitam ou expandem nossas funcionalidades dado o contexto

- [X] O usuário não deve pode se cadastrar com um email duplicado;
- [X] O usuário não pode fazer 2 check-ins em um mesmo dia;
- [X] O usuário não pode fazer check-in se não estiver perto da academia (100m);
- [ ] O check-in só pode ser validado até 20 minutos após criado;
- [ ] O check-in só pode ser validado por administradores;
- [ ] A academia só pode ser cadastrada por administradores;

# RNFs (Requisitos não-funcionais) -> São os recursos os quais a aplicação será desenvolvida, são recursos pensados pelos desenvolvedores

- [X] A senha do usuário precisa estar criptografada;
- [X] Os dados da aplicação precisam estar persistidos em um banco não relacional (PostgreSQL);
- [ ] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuário dever ser identificado por um JWT;