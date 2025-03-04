import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { MedicineRoutes } from './app/modules/medicines/medicine.route';
import { authRoutes } from './app/modules/auth/auth.route';
import { ReviewRoutes } from './app/modules/review/review.route';
import { ManufacturerRoutes } from './app/modules/Manufacturer/Manufacturer.route';
import { CategoryRoutes } from './app/modules/category/category.route';
import { notFound } from './app/middleware/notFound';
import { globalErrorHandler } from './app/middleware/globalErrorHandler';

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
app.use('/api/v1/category', CategoryRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Server is Working...');
});
app.use(globalErrorHandler);

//Not Found
app.use(notFound);
export default app;
