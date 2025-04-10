# Densyy framework Bun

Uma coleção de utilitários e middlewares Bun.js para construção de aplicações web robustas.

## Instalação

```bash
bun add densyy-framework-bun
```

## Recursos

### Middlewares

- **bun-cors** - Middleware CORS com headers de segurança pré-configurados
- **bun-helmet** - Middleware de segurança que configura vários headers HTTP
- **bun-ids** - Valida IDs MongoDB nos parâmetros da requisição
- **bun-morgan** - Middleware para logging de requisições HTTP
- **bun-multer** - Manipulação de upload de arquivos com nomes gerados automaticamente
- **bun-token** - Middleware de autenticação JWT

### Ferramentas

- **bun-jwt** - Utilitários para JSON Web Token
  - Gerar tokens
  - Verificar tokens
  - Extrair dados dos tokens

- **bun-password** - Utilitários para hash e validação de senhas com bcrypt

- **bun-response** - Formatador padronizado de respostas HTTP
  - Respostas de sucesso (200)
  - Respostas de criação (201)
  - Respostas de erro com códigos personalizados
  - Respostas de erro do servidor (500)
  - Respostas vazias (method: options)

- **bun-validator** - Validação de entrada com regras incorporadas:
  - Campos obrigatórios
  - Valores mínimos/máximos
  - Comprimentos de string
  - Tipos de dados (número, string, array, booleano)
  - Formato de email
  - URLs
  - Datas
  - Valores hexadecimais
  - Valores permitidos (enum)
  - Slugs
  - CPF
  - CNPJ
  - Números de telefone brasileiros

### Utilitários

- **bun-currency** - Formatação e cálculos de moeda

- **bun-date** - Utilitários para manipulação de datas
  - Adicionar horas/dias/meses/anos
  - Formatar datas (formatos BR/EUA)
  - Converter entre strings de data e objetos Date

- **bun-logger** - Utilitário de logging assíncrono com buffer

- **bun-number** - Formatação e cálculos de números

- **bun-string** - Utilitários para manipulação de strings
  - Remover acentos
  - Converter para slug
  - Capitalizar texto
  - Conversão para título
  - Gerar hashes aleatórios

## Exemplos de Uso

### Autenticação JWT

```javascript
import BunJWT from 'densyy-framework-bun/core/tools/bun-jwt.js'

const jwt = new BunJWT()

// Gerar token
const token = jwt.generateToken(payload, 'secret', '7d')

// Verificar token
const isValid = await jwt.verifyToken(token, 'secret')
```

### Validação de Entrada

```javascript
import BunValidator from 'densyy-framework-bun/core/tools/bun-validator.js'

const rules = {
  email: 'required|email',
  password: 'required|minLength:8',
  age: 'required|number|min:18'
}

const validator = new BunValidator(rules)
const result = await validator.validate(data)
const error = validator.firstError()
```

### Respostas HTTP

```javascript
import BunResponse from 'densyy-framework-bun/core/tools/bun-response.js'

const response = new BunResponse()

// Resposta de sucesso
response.success(res, { data: 'Sucesso!' })

// Resposta de erro
response.simpleError(res, 400, 'Entrada inválida')
```

### Upload de Arquivo

```javascript
import BunMulter from 'densyy-framework-bun/core/middlewares/bun-multer.js'

app.post('/upload', BunMulter, (req, res) => {
  // Acesse o arquivo enviado em req.file
})
```
