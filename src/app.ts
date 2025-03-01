import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { MedicineRoutes } from './app/modules/medicines/medicine.route';

const app: Application = express();
//json parser
app.use(express.json());

// cors

app.use(cors());

// application routes
app.use('/api/v1/medicine', MedicineRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Server is Working...');
});

export default app;
