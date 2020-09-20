# API Rest com Node.js

## Requisitos

- Node.js
- Postman (ou algo para acessar a API)

## Criação do projeto

```bash
npm init
```

Com isso temos apenas um `package.json` com as configurações iniciais.

## Primeiro endpoint

Instalar o express (framework para aplicações web) como dependência.

```bash
npm install express
```

A dependência será incluída no `package.json`. Com isso já é possível criar o `index.js`.

```javascript
const express = require('express')

const app = express()

app.listen(3000, () => console.log('servidor rodando na porta 3000'))

app.get('/', (req, res) => res.send('Hello world!'))
```

```bash
node index.js
```

## Auto reload

```bash
npm install --save-dev nodemon
```

`--save-dev` para dependências usadas apenas durante o desenvolvimento (`devDependencies`). Ao 
gerar o pacote de produção essas dependências não são incluídas.

## Separação em módulos

- Necessário exportar módulos com `module.exports =`

Também é necessário o consign para agrupar as rotas.

```bash
npm install consign
```

## Tratando requisições

Intale o body-parser:

```bash
npm install body-parser
```

E a aplicação precisa ser configurada para executar o parse. Por exemplo:

```javascript
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
```