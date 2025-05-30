Ecommerce-Chat-Mobile
📱 Descrição
Ecommerce-Chat-Mobile é uma aplicação móvel de e-commerce com funcionalidades de chat em tempo real, desenvolvida em React Native com Expo. O projeto é composto por duas partes principais: frontend mobile e backend, ambos utilizando tecnologias modernas para oferecer uma experiência de usuário fluida, interativa e eficiente.

🚀 Tecnologias Utilizadas
🖥️ Frontend (Ecommerce-Chat-Mobile)
React Native – Framework para desenvolvimento mobile.

Expo – Plataforma para desenvolvimento e distribuição de apps React Native.

TypeScript – Superset do JavaScript com tipagem estática.

AsyncStorage – Armazenamento local de dados.

Expo Router – Gerenciamento de rotas e navegação.

Expo Google Fonts – Customização de fontes.

🔗 Backend (Ecommerce-Chat-Mobile-Backend)
Node.js – Ambiente de execução JavaScript no servidor.

Express – Framework para APIs RESTful.

MongoDB – Banco de dados NoSQL.

Socket.IO – Comunicação em tempo real (chat).

🗂️ Estrutura do Projeto
📲 Frontend
Copiar
Editar
app/          → Telas e componentes principais da aplicação
components/   → Componentes reutilizáveis
constants/    → Arquivos de constantes e configurações globais
hooks/        → Hooks personalizados
assets/       → Imagens e recursos estáticos
🖥️ Backend
pgsql
Copiar
Editar
src/              → Código-fonte do backend
  └── index.js    → Ponto de entrada da aplicação
  └── seedProducts.js → Script para popular o banco com produtos iniciais
🛠️ Instalação e Execução
✅ Frontend
Acesse o diretório do frontend:

bash
Copiar
Editar
cd Ecommerce-Chat-Mobile
Instale as dependências:

bash
Copiar
Editar
npm install
Execute o servidor de desenvolvimento:

bash
Copiar
Editar
npx expo start
✅ Backend
Acesse o diretório do backend:

bash
Copiar
Editar
cd Ecommerce-Chat-Mobile-Backend
Instale as dependências:

bash
Copiar
Editar
npm install
Execute o servidor backend:

bash
Copiar
Editar
node src/index.js
🎯 Funcionalidades
🛒 Carrinho de Compras – Adicione e remova produtos.

💬 Chat em Tempo Real – Comunicação entre usuários e/ou suporte.

🔍 Navegação Intuitiva – Interface amigável e responsiva.

🤝 Contribuição
Contribuições são bem-vindas!
Sinta-se à vontade para abrir um pull request, sugerir melhorias ou reportar bugs.

📄 Licença
Este projeto está licenciado sob a Licença MIT.
Consulte o arquivo LICENSE para mais detalhes.
