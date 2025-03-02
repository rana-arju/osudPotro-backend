import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { MedicineRoutes } from './app/modules/medicines/medicine.route';
import { authRoutes } from './app/modules/auth/auth.route';
import { ReviewRoutes } from './app/modules/review/review.route';
import { ManufacturerRoutes } from './app/modules/Manufacturer/Manufacturer.route';

const app: Application = express();
//json parser
app.use(express.json());

// cors

app.use(cors());

// application routes
app.use('/api/v1/medicine', MedicineRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/review', ReviewRoutes);
app.use('/api/v1/manufacturer', ManufacturerRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Server is Working...');
});

export default app;
