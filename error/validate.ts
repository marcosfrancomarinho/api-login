import { iValidateDatas } from "../interfaces/interfaces";

// Classe que implementa a interface de validação de dados do usuário
export class ValidateDatas implements iValidateDatas {

    /**
     * Valida se o email não é nulo ou vazio.
     * 
     * @param email - O endereço de email a ser validado.
     * @throws {Error} - Lança um erro se o email estiver vazio ou nulo.
     */
    public hasEmail(email: string): void {
        if (!email || email.length === 0) {
            throw new Error(this.message('Email'));
        }
    }

    /**
     * Valida se o nome não é nulo ou vazio.
     * 
     * @param name - O nome a ser validado.
     * @throws {Error} - Lança um erro se o nome estiver vazio ou nulo.
     */
    public hasName(name: string): void {
        if (!name || name.length === 0) {
            throw new Error(this.message('Nome'));
        }
    }

    /**
     * Valida se a senha não é nula ou vazia.
     * 
     * @param password - A senha a ser validada.
     * @throws {Error} - Lança um erro se a senha estiver vazia ou nula ou menos de 8 caracteres.
     */
    public hasPassword(password: string): void {
        if (!password || password.length === 0) {
            throw new Error(this.message('Senha'));
        }
        if (password.length !== 8) {
            throw new Error('senha deve conter 8 caracteres');
        }
    }

    /**
     * Valida os dados de login, incluindo email e senha.
     * 
     * @param email - O endereço de email a ser validado.
     * @param password - A senha a ser validada.
     * @throws {Error} - Lança um erro se o email ou a senha não passarem nas validações.
     */
    public validateLogin(email: string, password: string): void {
        this.hasEmail(email);
        this.hasPassword(password);
    }

    /**
     * Valida os dados de registro, incluindo nome, email e senha.
     * 
     * @param name - O nome do usuário a ser validado.
     * @param email - O endereço de email a ser validado.
     * @param password - A senha a ser validada.
     * @throws {Error} - Lança um erro se qualquer um dos campos não passar nas validações.
     */
    public validateRegister(name: string, email: string, password: string): void {
        this.hasName(name);
        this.hasEmail(email);
        this.hasPassword(password);
    }

    /**
     * Gera a mensagem de erro para campos vazios ou inválidos.
     * 
     * @param value - O nome do campo (por exemplo, 'Nome', 'Email', 'Senha') para inclusão na mensagem de erro.
     * @returns {string} - A mensagem de erro formatada.
     */
    private message(value: string): string {
        return `${value} do usuário informado(a) é vazio(a) ou inválido(a)`;
    }

    /**
     * Verifica se um valor é nulo.
     * 
     * @param value - O valor a ser verificado.
     * @throws {Error} - Lança um erro se o valor for nulo ou indefinido.
     */
    public isNull<T>(value: T): void {
        if (!value) {
            throw new Error('Usuário não cadastrado.');
        }
    }

    /**
     * Verifica se a senha criptografada corresponde à senha fornecida.
     * 
     * @param password - A senha fornecida.
     * @param passwordCrypt - A senha criptografada armazenada.
     * @param bcryptjs - O módulo bcryptjs para comparação.
     * @throws {Error} - Lança um erro se as senhas não coincidirem.
     */
    public checkPasswordCrypt(password: string, passwordCrypt: string, bcryptjs: any): void {
        const response: boolean = bcryptjs.compareSync(password, passwordCrypt);
        if (!response) throw new Error('Senha ou email invalida');
    }
}
