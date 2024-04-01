import express from "express";
import { sequelize } from './config/database'; // Import Sequelize instance
import userRoutes from './routes/userRoute';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

app.use('/users', userRoutes);

sequelize.authenticate().then(() => {
  console.log('Database connection has been established successfully.');
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});

sequelize.sync().then(() => {
  console.log('Database synced');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
``