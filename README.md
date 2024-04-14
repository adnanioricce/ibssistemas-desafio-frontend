# Desafio IBS sistemas - frontend

O projeto nesse repositório trata-se de um desafio de contração da IBS sistemas. O mesmo contém o projeto frontend que se utiliza da API

## Executando o projeto ...

### Localmente

#### Servidor de dev

execute `ng serve` na raiz do projeto, depois navegue até  `http://localhost:4200/`.

#### Build

Execute `ng build` para realizar a compilação e minificação do projeto. os artefatos do build estarão no diretório `dist/`.

#### Rodando os testes de unidade

Execute `ng test` para executar os testes de unidade com [Karma](https://karma-runner.github.io).

#### rodando os testes de ponta a ponta

Execute `ng e2e` para executar os testes e2e. Decidi escolher o [playwright](https://playwright.dev/) aqui.

### com docker

```bash
$ docker build -f prod.Dockerfile -t sua-tag:latest
$ docker run -d --name ibs-frontend -p 8184:80 -e API_URL=... sua-tag:latest
```


