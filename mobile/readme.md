<p align="center"><a target="_blank" href="https://matheus.sgomes.dev"><img src="https://matheus.sgomes.dev/img/logo_azul.png"></a></p>
<p align="center">Matheus S. Gomes - <a target="_blank" href="https://matheus.sgomes.dev">https://matheus.sgomes.dev</a></p>

<p align="center">
<img src="https://raw.githubusercontent.com/Matheussg42/OmniStack10/master/Web/src/assets/logo.png" style='width: 300px'>
</p>


## O projeto _DevRadar_, foi criado durante a semana Omnistack da [Rocketseat](https://rocketseat.com.br)

Este projeto tem o intuito de criar um sistema com Back-End, Front-End e Mobile utilizando _NodeJS, ReactJS e React-Native_ respectivamente.

Para iniciar a aplicação Web(Back e Front), acesse a raiz do projeto e execute o comando do Docker-Compose(Necessário Docker e Docker-compose):

```docker
docker-compose up
```

## Mobile

Nesta parte, se encontra a parte Mobile do projeto, onde podemos buscar tanto Desenvolvedores, quanto Vagas pela Tecnologia desejada.

#### Instalando dependências

Acesse a raiz da pasta `mobile` pelo _terminal_, e instale as dependências usando o comando `yarn`, ou `npm`.

```js
yarn install
```

```js
npm install
```

#### Expo

Este projeto utiliza o Expo. Para rodar executar o projeto, é necessário instalar o pacote do Expo no seu computador, utilizando `yarn`, ou `npm`.


```js
yarn global add expo-cli
```

```js
npm install -g expo-cli
```
Caso deseje, é possível baixar e instalar o App do Expo em seu celular, para poder rodar o aplicativo nele, caso não queira, o expo também é compatível com Emuladores.


#### Subindo a aplicação

Acesse a raiz da pasta `Web` pelo _terminal_, digite o comando `yarn start`.

```js
yarn dev
```

## Funcionalidades

#### Geral

Ao buscar por uma tecnologia, o aplicativo irá retornar os desenvolvedores e as vagas que possuem a tecnologia buscada. Ao clicar na imagem de um desenvolvedor abrirá o resumo do mesmo, clicando no resumo, é aberta a página do Github. Ao clicar na imagem de uma empresa, será aberto um resumo das vagas, e ao clicar, será aberta uma página com a informação completa da empresa e das vagas daquela empresa.

<p align="center">
<img src="../.gifs/mobile.gif" style='width: 300px'>
</p>

#### WebSocket

O projeto foi criar com WebSocket para o Desenvolvedor. Ao pesquisar por uma tecnologia, o Socket.io começa a escutar, e ao Cadastrar ou Atualizar um desenvolvedor, ele é atualizado automaticamente no aplicativo.

<p align="center">
<img src="../.gifs/mobile_socket.gif" style='width: 300px'>
</p>


### Outras Pastas

- [Back-end](/Backend)
- [Front-end](/Web)