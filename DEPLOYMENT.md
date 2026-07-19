**Configuração para deployment no Vercel (Supabase)**

- Variáveis de ambiente (defina no Painel do Vercel para o projeto):
  - `VITE_SUPABASE_URL` — URL pública do Supabase (ex: https://xyz.supabase.co)
  - `VITE_SUPABASE_ANON_KEY` — chave anônima (usada apenas no cliente)
  - `SUPABASE_URL` — mesma URL do Supabase (usada no server)
  - `SUPABASE_SERVICE_ROLE_KEY` — chave de serviço (mantenha em segredo; usada apenas no server)

- Estrutura recomendada no Vercel:
  - Crie um projeto que construa o `client` (com `vite build`) e sirva os arquivos estáticos.
  - Implemente a pasta `server/` como uma aplicação Node separada no Vercel (ou em uma instância separada). No Vercel, configure o Build Command como `npm run build` na pasta `client` e configure as rotas para encaminhar `/api/*` para o servidor Node.

- Uso no cliente:
  - Prefira consumir os endpoints server-side que protegem a `SUPABASE_SERVICE_ROLE_KEY`: use `client/src/api/serverEventApi.js`.
  - Se quiser acesso direto ao Supabase (apenas leitura pública), use `client/src/lib/supabaseClient.js` com a `VITE_SUPABASE_ANON_KEY`.

- Funções serverless no Vercel:
  - Criei `api/events/index.js` e `api/events/[id].js` para rodar como funções serverless no Vercel. Estas funções usam `SUPABASE_SERVICE_ROLE_KEY` do ambiente para operar na tabela `eventos`.
  - Ao fazer deploy no Vercel, as rotas estarão disponíveis em `/api/events` e `/api/events/:id`.

- Segurança:
  - Nunca exponha `SUPABASE_SERVICE_ROLE_KEY` no cliente.
  - Use os endpoints do servidor para operações que requerem privilégios (inserção/atualização/exclusão).
