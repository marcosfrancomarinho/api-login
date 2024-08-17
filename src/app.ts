import dotenv from 'dotenv';  // Importa o pacote dotenv para carregar variáveis de ambiente a partir de um arquivo .env
import express from 'express';  // Importa o pacote express para criar um servidor web
import cors from 'cors';  // Importa o pacote cors para configurar o middleware CORS
import router from './router';  // Importa o roteador definido em outro arquivo

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

/**
 * Define a porta do servidor.
 * Utiliza a variável de ambiente PORT se estiver definida, caso contrário, usa 8080 como padrão.
 */
const port: number = parseInt(process.env.PORT ?? '8080', 10);

// Cria uma instância do aplicativo Express
const app = express();

/**
 * Middleware para analisar JSON no corpo das requisições.
 * Isso permite que o servidor entenda requisições com payload JSON.
 */
app.use(express.json());

/**
 * Configura o middleware CORS para permitir apenas métodos POST.
 * - exposedHeaders: Especifica quais cabeçalhos podem ser expostos ao cliente.
 * - origin: Define a origem permitida para acessar o servidor.
 * - methods: Permite apenas o método POST nas solicitações CORS.
 */
app.use(cors({
    exposedHeaders: ['authorization-token'],
    origin: '*', // Define a origem permitida para acessar o servidor
    methods: ['POST'] // Permite apenas o método POST nas solicitações CORS
}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization-Token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

/**
 * Configura o middleware para usar as rotas importadas.
 * O roteador gerencia as rotas do aplicativo.
 */
app.use(router);

/**
 * Inicia o servidor na porta especificada e exibe uma mensagem no console quando o servidor estiver online.
 * Isso permite que você saiba que o servidor está funcionando corretamente.
 */
app.listen(port, () => {
    console.log(`Server online on http://localhost:${port}`);
});
