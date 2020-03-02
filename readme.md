<p align="center"><a target="_blank" href="https://matheus.sgomes.dev"><img src="https://matheus.sgomes.dev/img/logo_azul.png"></a></p>
<p align="center">Matheus S. Gomes - <a target="_blank" href="https://matheus.sgomes.dev">https://matheus.sgomes.dev</a></p>

<p align="center">
<img src="https://raw.githubusercontent.com/Matheussg42/OmniStack10/master/Web/src/assets/logo.png" style='width: 300px'></a>
</p>


## O projeto _DevRadar_, foi criado durante a semana Omnistack da [Rocketseat](https://rocketseat.com.br)

Este projeto tem o intuito de criar um sistema com Back-End, Front-End e Mobile utilizando _NodeJS, ReactJS e React-Native_ respectivamente.

Neste projeto, podemos cadastrar Desenvolvedores, informando o seu usuário do GitHub, Tecnologias que o Dev utiliza, e sua Localização, e ao Adicionar o Desenvolvedor, nos comunicamos com a API do GitHub para que retorne seu Nome, Avatar e Bio. Podemos também Atualizar um Desenvolvedor, e nesta opção podemos editar, Nome, Bio,  Tecnologias, e Localização.

Outra funcionalidade envolve as empresas, onde podemos cadastrar uma Empresa com Nome, Descrição, Link da Imagem e Localização. Após o cadastro podemos editar, visualizar as vagas disponíveis e deletar. Ao clicar nas Vagas, Podemos Visualizar, Cadastrar, Editar e Apagar as vagas daquela empresa.

Ambos, Desenvolvedores e Empresas(Vagas) são exibidos pelo Aplicativo.

Para iniciar a aplicação Web(Back e Front), acesse a raiz do projeto e execute o comando do Docker-Compose(Necessário Docker e Docker-compose):

```docker
docker-compose up
```

Para iniciar cada aplicação individualmente, temos um passo a passo dentro de cada uma das pastas, porém, para que o Front-End e o Mobile funcionem, o Back-End deve estar executando.

- [Back-end](/Backend)
- [Front-end](/Web)
- [Mobile](/mobile)