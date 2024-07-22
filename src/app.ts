import dotenv from 'dotenv';  // Importa o pacote dotenv para carregar variáveis de ambiente
import express from 'express';  // Importa o pacote express para criar o servidor web
import cors from 'cors';  // Importa o pacote cors para configurar o middleware CORS
import router from './router';  // Importa o roteador definido em outro arquivo

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Define a porta do servidor, usando 8080 como padrão se a variável de ambiente PORT não estiver definida
const port: number = parseInt(process.env.PORT ?? '8080', 10);

// Cria uma instância do aplicativo Express
const app = express();

// Configura o middleware para analisar JSON no corpo das requisições
app.use(express.json());

// Configura o middleware para usar as rotas importadas
app.use(router);

// Configura o middleware CORS para permitir apenas métodos POST
app.use(cors({ methods: 'POST' }));

// Inicia o servidor na porta especificada e exibe uma mensagem no console quando o servidor estiver online
app.listen(port, () => {
    console.log(`Server online on http://localhost:${port}`);
});
