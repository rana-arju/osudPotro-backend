import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../error/AppError';
import { medicineSearchableField } from './medicine.constant';
import { IMedicine } from './medicine.interface';
import { Medicine } from './medicine.schema';

//create medicine
const createMedicineIntoDB = async (medicineData: IMedicine) => {
  const result = await Medicine.create(medicineData);
  return result;
};

//Get All medicine
const getAllMedicineFromDB = async (searchTerm: Record<string, unknown>) => {


  const allMedicineQuery = new QueryBuilder(Medicine.find(), searchTerm)
    .search(medicineSearchableField)
    .filter()
    .sort()
    .paginate()
    .fields();

  // Add populate directly here (you could also add it inside QueryBuilder if needed)
  allMedicineQuery.modelQuery = allMedicineQuery.modelQuery.populate('category')
    .populate('manufacturer');

  const result = await allMedicineQuery.modelQuery;
  const meta = await allMedicineQuery.countTotal();

  return { result, meta };
};

const getSingleMedicine = async (id: string) => {
  const result = await Medicine.findById(id)
    .populate('category')
    .populate('manufacturer');
  if (!result) {
    throw new AppError(404, 'This medicine not found!');
  }

  return result;
};
const deleteSingleMedicine = async (id: string) => {
  const medicine = await Medicine.findById(id);
  if (!medicine) {
    throw new AppError(404, 'This medicine not found!');
  }
  const result = await Medicine.findByIdAndDelete(id);
  return result;
};
const updateSingleMedicine = async (
  id: string,
  payload: Partial<IMedicine>,
) => {
  const medicineExist = await Medicine.findById(id);
  if (!medicineExist) {
    throw new AppError(404, 'This medicine not found!');
  }
  const result = await Medicine.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
    .populate('category')
    .populate('manufacturer');
  if (!result) {
    throw new AppError(400, `Medicine with ID ${id} not updated. try again`);
  }
  return result;
};
export const MedicineServices = {
  createMedicineIntoDB,
  getAllMedicineFromDB,
  getSingleMedicine,
  deleteSingleMedicine,
  updateSingleMedicine,
};
