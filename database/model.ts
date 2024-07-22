import sequelize from "./connection";
import { DataTypes } from 'sequelize';
import { iMessageErrorOptionsModel } from "../interfaces/interfaces";

// Define as mensagens de erro de validação personalizadas
const messageError: iMessageErrorOptionsModel = {
    /**
     * Mensagem de erro para campos vazios.
     * @param value - Nome do campo que está vazio.
     * @returns Mensagem personalizada indicando que o campo não pode ser vazio.
     */
    empty: (value) => `${value} não pode ser vazio(a).`,
    
    /**
     * Mensagem de erro para campos nulos.
     * @param value - Nome do campo que está nulo.
     * @returns Mensagem personalizada indicando que o campo é obrigatório.
     */
    null: (value) => `${value} do usuário é obrigatório(a)`,

    /**
     * Mensagem de erro para a validação de email.
     * @returns Mensagem indicando que o email deve ser um endereço válido.
     */
    emailValidate: 'email tem que ser um endereço válido',

    /**
     * Mensagem de erro para o comprimento do nome.
     * @returns Mensagem indicando o comprimento aceitável para o nome de usuário.
     */
    lenName: 'O nome de usuário deve ter entre 4 e 20 caracteres.',

}

// Define o modelo 'Users' com os campos id, name, email e password
const Users = sequelize.define('users',
    {
        id: {
            type: DataTypes.INTEGER,        // Tipo de dado inteiro
            allowNull: false,               // Não permite valor nulo
            autoIncrement: true,            // Incrementa automaticamente o valor do id
            primaryKey: true                // Define este campo como chave primária da tabela
        },
        name: {
            type: DataTypes.STRING,         // Tipo de dado string
            allowNull: false,               // Não permite valor nulo
            validate: {                     // Validações para o campo 'name'
                len: {
                    args: [4, 50],          // O comprimento do nome deve estar entre 4 e 50 caracteres
                    msg: messageError.lenName // Mensagem de erro personalizada para comprimento inválido
                },
                notNull: { msg: messageError.null('nome') }, // Mensagem de erro se o campo for nulo
                notEmpty: { msg: messageError.empty('nome') }, // Mensagem de erro se o campo estiver vazio
            }
        },
        email: {
            type: DataTypes.STRING,         // Tipo de dado string
            allowNull: false,               // Não permite valor nulo
            unique: true,                   // Garante que o valor do email seja único na tabela
            validate: {                     // Validações para o campo 'email'
                isEmail: { msg: messageError.emailValidate }, // O valor deve ser um email válido
                notNull: { msg: messageError.null('email') }, // Mensagem de erro se o campo for nulo
                notEmpty: { msg: messageError.empty('email') }, // Mensagem de erro se o campo estiver vazio
            }
        },
        password: {
            type: DataTypes.STRING,         // Tipo de dado string
            allowNull: false,               // Não permite valor nulo
            validate: {                     // Validações para o campo 'password'
                notNull: { msg: messageError.null('senha') }, // Mensagem de erro se o campo for nulo
                notEmpty: { msg: messageError.empty('senha') }, // Mensagem de erro se o campo estiver vazio
            }
        }
    },
    {
        tableName: 'users',                 // Nome da tabela no banco de dados
        timestamps: true                    // Adiciona automaticamente os campos createdAt e updatedAt
    }
);

export default Users;
