import express from 'express';  // Importa o pacote express para criar o roteador
import { userControllers } from '../controllers/user';  // Importa os controladores para manipular as rotas

// Cria uma instância do roteador Express
const router = express.Router();

// Define a rota POST para o registro de usuários e associa ao controlador de registro
router.post('/register', userControllers.register);

// Define a rota POST para o login de usuários e associa ao controlador de login
router.post('/login', userControllers.login);

// Exporta o roteador para ser usado na configuração do servidor
export default router;
