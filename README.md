# DJ The Source - Sistema de Eventos

Sistema completo de orçamento para locação de sonorização, iluminação, garçons, recepcionistas, DJs, decoradores e locação de salão.

## Estrutura do projeto

- `server/` - backend Node.js com Express
- `client/` - frontend React com Vite

## Funcionalidades

- Escolha de serviços por página dedicada
- Orçamento dinâmico baseado em horas, quantidade e convidados
- Cadastro de novos colaboradores com valor/hora editável
- Edição de valores de serviços e colaboradores
- Envio de orçamento por email ao organizador do evento
- Site responsivo com logo animado de moving head

## Comandos utilizados

```powershell
cd "c:\Users\salva\Documents\Ensino\Projeto - DJTHESOURCE- VERSÕES\Projeto versão NODE\24.06.26 - II\dj-the-source"

md server,client

cd server
npm init -y
npm install express cors nodemailer dotenv
npm install --save-dev nodemon

cd ..\client
npm create vite@latest . -- --template react
npm install react-router-dom

cd ..\server
npm install

cd ..\client
npm install
```

## Executar

```powershell
cd server
npm start

cd ..\client
npm run dev
```

## Configuração de email

Este projeto usa o serviço Resend para enviar os orçamentos via Vercel.

1. Crie um arquivo `.env.local` na raiz do projeto.
2. Adicione:

```env
RESEND_API_KEY=sua_chave_resend
RESEND_FROM_EMAIL=Orcamento <seu-email@dominio.com>
RESEND_TO_EMAIL=seu-email@dominio.com
```

3. No painel do Vercel, adicione estas mesmas variáveis em Environment Variables.
4. Faça deploy novamente para que o endpoint `/api/send-email` passe a enviar os e-mails.

> Se quiser, você também pode preencher o e-mail do organizador no formulário e o sistema enviará para esse endereço em vez do valor padrão de `RESEND_TO_EMAIL`.
