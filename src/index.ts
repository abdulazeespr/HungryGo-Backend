import express from 'express';
import cors from 'cors';
import {globalErrorHandler} from './middleware/globalErrorHandler';
import { prisma } from "./lib/prisma";
import authRoutes from './routes/authRoutes';
import orderRoutes from './routes/orderRoutes';


const app = express();

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {

  const user = prisma.user.findFirst();

   
  res.json({ message: 'Welcome to the HungryGo API!', user });
});

app.use('/api/auth', authRoutes);
app.use('/api/order', orderRoutes);


app.use(globalErrorHandler);


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});