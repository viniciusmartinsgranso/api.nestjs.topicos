import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432, // porta padrão do PostgreSQL
  username: 'postgres',
  password: '1234',
  database: 'postgres',
  entities: [],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
