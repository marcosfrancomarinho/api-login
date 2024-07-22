
// Interface que define as mensagens de erro de validação dos dados do usuário
export interface iMessageErrorOptionsModel {
    /**
     * Mensagem de erro para o comprimento do nome do usuário.
     * Usado quando o nome não atende aos requisitos de comprimento.
     */
    lenName: string;

    /**
     * Mensagem de erro para validação do formato de email.
     * Usado quando o email não é um endereço válido.
     */
    emailValidate: string;

    /**
     * Função que retorna uma mensagem de erro para valores nulos.
     * @param value - O nome do campo que está nulo.
     * @returns Uma string com a mensagem de erro indicando que o campo é obrigatório.
     */
    null: (value: string) => string;

    /**
     * Função que retorna uma mensagem de erro para valores vazios.
     * @param value - O nome do campo que está vazio.
     * @returns Uma string com a mensagem de erro indicando que o campo não pode estar vazio.
     */
    empty: (value: string) => string;
}

// Interface que define os métodos para validação dos dados do usuário
export interface iValidateDatas {
    /**
     * Valida a presença e formato do nome do usuário.
     * @param name - O nome do usuário a ser validado.
     * @throws Error - Lançado se o nome for nulo ou vazio.
     */
    hasName(name: string): void;

    /**
     * Valida a presença e formato do email do usuário.
     * @param email - O email do usuário a ser validado.
     * @throws Error - Lançado se o email for nulo, vazio ou inválido.
     */
    hasEmail(email: string): void;

    /**
     * Valida a presença e formato da senha do usuário.
     * @param password - A senha do usuário a ser validada.
     * @throws Error - Lançado se a senha for nula ou vazia.
     */
    hasPassword(password: string): void;

    /**
     * Valida os dados de registro do usuário.
     * @param name - O nome do usuário.
     * @param email - O email do usuário.
     * @param password - A senha do usuário.
     * @throws Error - Lançado se qualquer um dos dados de registro for inválido.
     */
    validateRegister(name: string, email: string, password: string): void;

    /**
     * Valida os dados de login do usuário.
     * @param email - O email do usuário.
     * @param password - A senha do usuário.
     * @throws Error - Lançado se o email ou a senha forem inválidos.
     */
    validateLogin(email: string, password: string): void;

    /**
     * Verifica se um valor é nulo.
     * @param value - O valor a ser verificado.
     * @throws Error - Lançado se o valor for nulo.
     */
    isNull<T>(value: T): void;

    /**
     * Verifica se a senha criptografada corresponde à senha fornecida.
     * @param password - A senha fornecida.
     * @param passwordCrypt - A senha criptografada armazenada.
     * @param bcryptjs - O módulo bcryptjs para comparação.
     * @throws Error - Lançado se as senhas não coincidirem.
     */
    checkPasswordCrypt(password: string, passwordCrypt: string, bcryptjs: any): void;
}

// Interface que define a estrutura das respostas das operações de registro e login
export interface iResponseQuery<T> {
    /**
     * Indica se a operação foi bem-sucedida.
     * @type boolean - True se a operação foi bem-sucedida, caso contrário false.
     */
    done: boolean;

    /**
     * Mensagem de resposta da operação.
     * @type string - Mensagem que descreve o resultado da operação.
     */
    message: string;

    /**
     * Argumento opcional com dados adicionais.
     * @type T - Dados adicionais retornados pela operação, pode ser omitido.
     */
    arg?: T;
}

// Interface que define a estrutura dos dados retornados na operação de busca por um usuário
export interface iFind {
    /**
     * Nome do usuário.
     * @type string - O nome do usuário encontrado na operação de busca.
     */
    name: string;

    /**
     * Email do usuário.
     * @type string - O email do usuário encontrado na operação de busca.
     */
    email: string;

    /**
     * Senha do usuário.
     * @type string - A senha criptografada do usuário encontrado na operação de busca. Pode ser opcional.
     */
    password?: string;
}
