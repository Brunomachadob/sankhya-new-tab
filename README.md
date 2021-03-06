# Sankhya New Tab

Extensão de Nova Guia para o Chrome.

```
Esta extensão não tem vínculo algum com o Sankhya-W.
```

A idéia é disponibilizar uma nova guia para os colaboradores da Sankhya,
onde qualquer um pode criar widgets e depois utilizá-los.
Os widgets podem ser relógios, apps de TODO, notas, ou até buscar informações quaisquer do próprio Sankhya-W.

### Status ###
[![CircleCI](https://circleci.com/gh/Brunomachadob/sankhya-new-tab.svg?style=svg)](https://circleci.com/gh/Brunomachadob/sankhya-new-tab)

### Componentes já desenvolvidos ###

> Desktop

A página principal contém um desktop, componente responsável
por apresentar e organizar os itens na tela. Ele iniciará e gerenciará os widgets da tela.

> LabelWidget

Este foi o primeiro widget criado, é apenas um label.

> ClocklWidget

Este foi o segundo widget criado, é um relógio digital.

### Roadmap ###
(Não necessáriamente nesta ordem)

* Planejar melhor o design da aplicação, até então só planejei parte da arquitetura.
* Atualmente o projeto aceita apenas widgets criados dentro do próprio projeto, precisamos criar um mecanismo de upload de widget customizados por qualquer um. E então criar um sistema de publicação destes widgets na plataforma para que todos possam utilizar widgets criados por outros.

### Instalação ###

Após clonar o repositório, entre na pasta do projeto e instale as dependencias com:
```
npm install
```

Então, rode o comando de build do projeto:
```
grunt
```

Então será criada a pasta **dist** com a extensão pronta para uso.

Para adicioná-la ao chrome:

* Acesse 'chrome://extensions'.
* Marque a opção Modo do desenvolvedor.
* Clique no botão "Carregar extensão expandida" e selecione a pasta **dist** dentro da raiz do projeto.
* Agora o chrome já carregou a extensão e qualquer modificação nos fontes basta dar um F5 no chrome e estará atualizado (O comando **grunt** realiza a compilação e já instancia um watcher nos arquivos do projeto, assim qualquer alteração nestes a extensão é recompilada).
