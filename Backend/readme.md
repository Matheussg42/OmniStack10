<p align="center"><a target="_blank" href="https://matheus.sgomes.dev"><img src="https://matheus.sgomes.dev/img/logo_azul.png"></a></p>
<p align="center">Matheus S. Gomes - <a target="_blank" href="https://matheus.sgomes.dev">https://matheus.sgomes.dev</a></p>

<p align="center">
<img src="https://raw.githubusercontent.com/Matheussg42/OmniStack10/master/Web/src/assets/logo.png" style='width: 300px'></a>
</p>


## O projeto _DevRadar_, foi criado durante a semana Omnistack da [Rocketseat](https://rocketseat.com.br)

Este projeto tem o intuito de criar um sistema com Back-End, Front-End e Mobile utilizando _NodeJS, ReactJS e React-Native_ respectivamente.

Para iniciar a aplicação Web(Back e Front), acesse a raiz do projeto e execute o comando do Docker-Compose(Necessário Docker e Docker-compose):

```docker
docker-compose up
```

## Back-end

O Back-end do projeto é responsável por receber as interações feitas pelo Front-End, e aplicar as regras de negócio. Possuímos Banco de Dados MongoDB, além de um websocket para enviar as informações dos Desenvolvedores cadastrados para o Aplicativo.

#### Configurações do Sistema

Para o funcionamento do projeto, é necessário configurar o endereço Base e a String de Conexão com o Banco de Dados. Acesse a raiz da pasta `Backend`, copie e cole o arquivo `.env-dist`, e renomeie-o para `.env` e edite conforme suas informações:

O arquivo `.env-dist` é como no trecho abaixo:

```js
BASE_URL=http://localhost:3333
MONGODB_CONNECTION_STRING="MONGODB_CONNECTION_STRING"
```

#### Instalando dependências

Acesse a raiz da pasta `Backend` pelo _terminal_, e instale as dependências usando o comando `yarn`, ou `npm`.

```js
yarn install
```

```js
npm install
```

#### Subindo a aplicação

Acesse a raiz da pasta `Backend` pelo _terminal_, digite o comando `yarn dev`.

```js
yarn dev
```

#### Outras Pastas

- [Front-end](/Web)
- [Mobile](/mobile)