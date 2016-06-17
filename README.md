# Sankhya New Tab

Extensão de Nova Guia para o Chrome. 

```
Esta extensão não tem vínculo algum com o Sankhya-W.
```

A idéia é disponibilizar uma nova guia para os colaboradores da Sankhya,
onde qualquer um pode criar widgets e depois utilizá-los.
Os widgets podem ser relógios, apps de TODO, notas, ou até buscar informações quaisquer do próprio Sankhya-W.

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

* Criar um mecanismo de build e deploy da extensão, com minificação, gerenciamento de dependencias, etc.
* Criar um sistema de configuração do widget.
* Planejar melhor o design da aplicação, até então só planejei parte da arquitetura.
* Criar um mecanismo de build e deploy da extensão, com minificação, gerenciamento de dependencias, etc.
* Atualmente o projeto aceita apenas widgets criados dentro do próprio projeto, precisamos criar um mecanismo de upload de widget customizados por qualquer um. E então criar um sistema de publicação destes widgets na plataforma para que todos possam utilizar widgets criados por outros.

### Instalação ###

A instalação em modo de desenvolvimento é bem simples.

* Acesse 'chrome://extensions'.
* Marque a opção Modo do desenvolvedor.
* Clique no botão "Carregar extensão expandida" e selecione a pasta raiz do projeto.
* Agora o chrome já carregou a extensão e qualquer modificação nos fontes basta dar um F5 no chrome e estará atualizado.
