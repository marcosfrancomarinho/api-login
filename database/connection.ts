import { Sequelize } from 'sequelize'; // Importa a classe Sequelize do pacote sequelize
import dotenv from 'dotenv'; // Importa o pacote dotenv para carregar variáveis de ambiente

// Carrega as variáveis de ambiente do arquivo .env para process.env
dotenv.config();

// Cria uma instância do Sequelize usando as variáveis de ambiente
const sequelize = new Sequelize({
    host: process.env.HOST,           // Endereço do host do banco de dados, configurado na variável de ambiente HOST
    database: process.env.DATABASE,   // Nome do banco de dados, configurado na variável de ambiente DATABASE
    username: process.env.USER,       // Nome de usuário do banco de dados, configurado na variável de ambiente USER
    password: process.env.PASSWORD,   // Senha do banco de dados, configurada na variável de ambiente PASSWORD
    dialect: 'mysql'                  // Dialeto do banco de dados (neste caso, MySQL)
});

// Exporta a instância do Sequelize para ser usada em outras partes da aplicação
export default sequelize;
