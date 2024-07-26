import { Request, Response } from "express";  // Importa tipos Request e Response do pacote express
import { QueryDB } from '../database/query';  // Importa a camada de acesso a dados para interagir com o banco de dados
import { ValidateDatas } from "../error/validate";  // Importa a classe de validação de dados
import { iResponseQuery, iValidateDatas, iFind } from "../interfaces/interfaces";  // Importa as interfaces usadas
import jwt from 'jsonwebtoken';  // Importa o pacote jsonwebtoken para gerar tokens JWT
import dotenv from 'dotenv';  // Importa o pacote dotenv para carregar variáveis de ambiente a partir de um arquivo .env

dotenv.config();  // Carrega as variáveis de ambiente do arquivo .env

// Define um namespace para os controladores de usuário
export namespace userControllers {
    // Instancia a classe de validação de dados
    const validate: iValidateDatas = new ValidateDatas();

    /**
     * Controlador para lidar com o registro de novos usuários.
     * @param req - Requisição HTTP contendo os dados do usuário para registro.
     * @param res - Resposta HTTP para retornar o resultado da operação de registro.
     * @returns Um status HTTP 200 e uma resposta JSON com o resultado da operação se bem-sucedido,
     *          ou um status HTTP 400 com a mensagem de erro se ocorrer uma exceção.
     */
    export async function register(req: Request, res: Response): Promise<void> {
        try {
            // Extrai os dados do corpo da requisição
            const { name, email, password } = req.body as { name: string, email: string, password: string };

            // Valida os dados de registro usando a instância de validação
            validate.validateRegister(name, email, password);

            // Chama a função de registro do banco de dados e aguarda a resposta
            const response: iResponseQuery<void> = await QueryDB.register(name, email, password);

            // Envia uma resposta JSON indicando que o registro foi bem-sucedido
            res.status(200).json(response);
        } catch (error) {
            // Em caso de erro, envia uma mensagem de erro com status HTTP 400
            res.status(400).json({ error: (error as Error).message });
        }
    }

    /**
     * Controlador para lidar com o login de usuários existentes.
     * @param req - Requisição HTTP contendo os dados do usuário para login.
     * @param res - Resposta HTTP para retornar o resultado da operação de login.
     * @returns Um status HTTP 200 e uma resposta JSON com o resultado da operação se bem-sucedido,
     *          ou um status HTTP 400 com a mensagem de erro se ocorrer uma exceção.
     */
    export async function login(req: Request, res: Response): Promise<void> {
        try {
            // Extrai os dados do corpo da requisição
            const { email, password } = req.body as { email: string, password: string };

            // Valida os dados de login usando a instância de validação
            validate.validateLogin(email, password);

            // Chama a função de login do banco de dados e aguarda a resposta
            const response: iResponseQuery<iFind | null> = await QueryDB.login(email, password);

            // Gera um token JWT com o email e senha do usuário
            const secret: string = process.env.TOKEN_SECRET as string;
            const token = jwt.sign({ email, password }, secret);

            // Define o cabeçalho 'authorization-token' com o token gerado
            res.setHeader('authorization-token', token);

            // Envia uma resposta JSON indicando que o login foi bem-sucedido
            res.status(200).json(response);
        } catch (error) {
            // Em caso de erro, envia uma mensagem de erro com status HTTP 400
            res.status(400).json({ error: (error as Error).message });
        }
    }
}
