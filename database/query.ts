import Users from "./model";
import { ValidateDatas } from "../error/validate";
import { iFind, iResponseQuery, iValidateDatas } from "../interfaces/interfaces";
import bcryptjs from 'bcryptjs';


export namespace QueryDB {
    // Instância de validação de dados
    const validate: iValidateDatas = new ValidateDatas();

    /**
     * Cria uma resposta de sucesso para o registro de um usuário.
     * @param value - O valor da mensagem de sucesso.
     * @returns Um objeto com a estrutura iResponseQuery.
     */
    function responseRegister(value: string): iResponseQuery<undefined> {
        return {
            done: true,
            message: `Usuário ${value} com sucesso.`
        };
    }

    /**
     * Cria uma resposta de sucesso para o login de um usuário.
     * @param value - O valor da mensagem de sucesso.
     * @param arg - Dados do usuário encontrado.
     * @returns Um objeto com a estrutura iResponseQuery.
     */
    function responseLogin(value: string, arg: iFind): iResponseQuery<iFind> {
        return {
            done: true,
            message: `Usuário ${value} com sucesso.`,
            arg: {
                email: arg.email,
                name: arg.name
            }
        };
    }

    /**
     * Registra um novo usuário no banco de dados.
     * @param name - Nome do usuário.
     * @param email - Email do usuário.
     * @param password - Senha do usuário.
     * @returns Uma Promise que resolve para um objeto com a estrutura iResponseQuery.
     * @throws Error - Lançado se a validação falhar ou ocorrer um erro ao criar o usuário.
     */
    export async function register(name: string, email: string, password: string): Promise<iResponseQuery<undefined>> {
        try {
            // Valida os dados de registro
            validate.validateRegister(name, email, password);

            // Gera o salt e a senha criptografada
            const salt: string = await bcryptjs.genSalt(14);
            const passwordCrypt: string = await bcryptjs.hash(password, salt);

            // Cria um novo usuário no banco de dados
            await Users.create({
                name: name,
                email: email,
                password: passwordCrypt
            });

            // Retorna a resposta de sucesso de registro
            return responseRegister('registrado');
        } catch (error: any) {

            if (error?.parent?.code === 'ER_DUP_ENTRY') {
                throw new Error('email já cadastrado.')
            }
            throw error as Error;
        }
    }

    /**
     * Autentica um usuário existente.
     * @param email - Email do usuário.
     * @param password - Senha do usuário.
     * @returns Uma Promise que resolve para um objeto com a estrutura iResponseQuery.
     * @throws Error - Lançado se a validação falhar, se o usuário não for encontrado ou ocorrer um erro na busca.
     */
    export async function login(email: string, password: string): Promise<iResponseQuery<iFind>> {
        try {
            // Valida os dados de login
            validate.validateLogin(email, password);

            // Busca o usuário no banco de dados pelo email
            const response = await Users.findOne({
                where: {
                    email: email,
                },
                attributes: ['name', 'email', 'password'],
                raw: true
            }) as iFind | null;

            // Verifica se o usuário foi encontrado
            validate.isNull<iFind | null>(response);

            // Verifica se a senha está correta
            if (response?.password) {
                validate.checkPasswordCrypt(password, response.password, bcryptjs);
            }
            // Retorna a resposta de sucesso de login
            return responseLogin('logado', response as iFind);
        } catch (error) {
            throw error as Error;
        }
    }
}
