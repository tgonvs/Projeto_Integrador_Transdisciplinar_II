# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2024-12-01

### Fixed

- [Frontend/Backend] Agora campo complemento não é mais obrigatório
- [Frontend/Backend] Agora campo bairro aceita menos de 3 letras

## [1.0.0] - 2024-12-01

### Changed

- [Frontend] Versão 1.0.0
- [Backend] Versão 1.0.0
- [Frontend] Agora todas imagens estão utilizando o componente do Next para otimização

### Added

- [Frontend] Finalização da pagina de checkout, com busca do estabelecimento
- [Frontend] Pagina de pedidos com listagens simples de todos pedidos realizados pelo cliente
- [Projeto] Readme com documentação do projeto

## [0.10.0] - 2024-12-01

### Changed

- [Frontend] Versão 0.2.1
- [Frontend] Url do backend como variável de ambiente para reutilizar da rede do host e otimizar comunicação.
- [Backend] Versão 0.7.0
- [Backend] Network mode do container compartilhado com host para otimização

### Added

- [Backend] Coluna com link de imagem para cupcakes e categorias

### Removed

- [Deployment] Desacoplando banco do docker-compose para mais segurança dos dados

## [0.9.0] - 2024-12-01

### Changed

- [Frontend] Versão 0.2.0

### Added

- [Frontend] Home / Landing Page
- [Frontend] Pagina buscar conta por email (Login)
- [Frontend] Pagina criar nova conta
- [Frontend] Pagina exibir dados da conta
- [Frontend] Pagina criar novo endereço
- [Frontend] Pagina categorias
- [Frontend] Pagina cupcakes de uma categoria

## [0.9.0] - 2024-10-14

### Changed

- [Backend] Versão 0.6.1
- [Backend] Habilitando CORS

## [0.8.0] - 2024-10-08

### Added

- [Frontend] Versão 0.1.0
- [Frontend] Inicialização do projeto utilizando NextJS e NextUI
- [CI] Criação das pipelines utilizando github action para criação e publicação das imagens utilizando o Docker Hub

## [0.7.0] - 2024-09-25

### Changed

- [Backend] Versão 0.6.0

### Added

- [Backend] Endpoint criar um pedido
- [Backend] Endpoint listar pedidos
- [Backend] Endpoint buscar pedido pelo id

## [0.5.0] - 2024-09-24

### Changed

- [Backend] Versão 0.4.0
- [Backend] Complemento do endereço não é mais obrigatório
- [Backend] Refeita as migrations agora usando "prisma db push" para teste local e criando as migrations apenas antes do commit

### Added

- [Backend] Endpoint para listar cupcakes
- [Backend] Endpoint para listar categorias de cupcakes

## [0.4.0] - 2024-09-24

### Changed

- [Backend] Versão 0.3.0
- [Backend] Endpoint de atualizar cliente permite favoritar endereço

### Added

- [Backend] Endpoint para criar endereço
- [Backend] Endpoint para listar endereços
- [Backend] Endpoint para atualizar dados de um endereço

## [0.3.0] - 2024-09-23

### Changed

- [Backend] Versão 0.2.0
- [Backend] Alterado nome na entidade cliente para ser preenchido em duas partes, primeiro e último

### Added

- [Backend] Endpoint para criar cliente
- [Backend] Endpoint para listar clientes
- [Backend] Endpoint para atualizar dados de um cliente

## [0.2.0] - 2024-09-23

### Changed

- [Backend] Versão 0.1.0

### Added

- [Backend] Entidade de endereço do cliente
- [Backend] Endpoint para buscar cliente pelo id
- [Backend] Timestamps de criação e atualização em todas entidades

## [0.1.0] - 2024-09-20

### Added

- [Backend] Configurações iniciais com NestJS e Prisma
- Docker compose com banco de dados e redis

## [0.0.0] - 2024-09-07

### Added

- Readme inicial com algumas informações do projeto
- Diagrama inicial de entidades do sistema
