import AppError from '../../error/AppError';
import { Medicine } from '../medicines/medicine.schema';
import { IManufacturer } from './Manufacturer.interface';
import { Manufacturer } from './Manufacturer.schema';

//create medicine
const createNewManufacturer = async (payload: IManufacturer) => {
  const result = await Manufacturer.create(payload);
  return result;
};

//Get All manufacturer
const getAllManufacturerFromDB = async () => {
  const result = await Manufacturer.find();

  return result;
};
//Get All medicine
const getAllMedicineWithManufacturerFromDB = async (id: string) => {
  const result = await Medicine.find({ manufacturer: id }).populate('category')
    .populate('manufacturer');

  return result;
};

const deleteSingleManufacturer = async (id: string) => {
  const manufacturer = await Manufacturer.findById(id);
  if (!manufacturer) {
    throw new AppError(404, 'This Manufacturer not found!');
  }
  const result = await Manufacturer.findByIdAndDelete(id);
  return result;
};
const updateSingleManufacturer = async (
  id: string,
  payload: Partial<IManufacturer>,
) => {
  const manufacturer = await Manufacturer.findById(id);
  if (!manufacturer) {
    throw new AppError(404, 'This Manufacturer not found!');
  }
  const result = await Manufacturer.findByIdAndUpdate(id, payload);
  return result;
};
const getSingleManufacturer = async (id: string) => {
  const manufacturer = await Manufacturer.findById(id);
  if (!manufacturer) {
    throw new AppError(404, 'This Manufacturer not found!');
  }
  const result = await Manufacturer.findById(id);
  return result;
};

export const manufacturerServices = {
  createNewManufacturer,
  getAllManufacturerFromDB,
  getSingleManufacturer,
  deleteSingleManufacturer,
  updateSingleManufacturer,
  getAllMedicineWithManufacturerFromDB,
};
