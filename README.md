# Sankhya New Tab

Extensão de Nova Guia para o Chrome.

A idéia é disponibilizar um framework para desenvolvimento de widgets,
que podem ser icorporados a nova guia e então cada um conseguir selecionar
e organizar os widgets que deseja em sua página.


### Componentes já desenvolvidos ###

> Dashboard

A página principal contém um dashboard, componente responsável
por apresentar e organizar os itens na tela. Ele iniciará e gerenciará os widgets da tela.

> DashWidget

Este é o wrapper de um widget, este é o componente que irá pegar os metadados de um widget e instanciá-lo.

> labelWidget

Este foi o primeiro widget criado, é apenas um label.

> clocklWidget

Este foi o segundo widget criado, é um relógio digital.

### Roadmap ###
(Não necessáriamente nesta ordem)

* Criar um mecanismo de build e deploy da extensão, com minificação, gerenciamento de dependencias, etc.
* Criar um sistema de configuração do widget.
* Atualmente o projeto aceita apenas widgets criados dentro do próprio projeto, precisamos criar um mecanismo de upload de widget customizados por qualquer um.
* Planejar melhor o design da aplicação, até então só planejei parte da arquitetura.
* Criar um mecanismo de build e deploy da extensão, com minificação, gerenciamento de dependencias, etc.
