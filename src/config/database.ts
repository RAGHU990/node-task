// database.ts
import { Sequelize } from 'sequelize';

// Initialize Sequelize with your PostgreSQL connection details
export const sequelize = new Sequelize({
  database: 'task',
  username: 'postgres',
  password: 'Test@123',
  host: 'localhost',
  port: 5432, // Default PostgreSQL port
  dialect: 'postgres',
});
