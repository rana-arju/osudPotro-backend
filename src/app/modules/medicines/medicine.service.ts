import QueryBuilder from '../../builder/QueryBuilder';
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
  const result = await allMedicineQuery.modelQuery;
  const meta = await allMedicineQuery.countTotal();

  return { result, meta };
};
const getStudentFromDB = async (id: string) => {
  const result = await Medicine.aggregate([{ $match: { _id: id } }]);

  return result;
};
const deleteStudentFromDB = async (id: string) => {
  const result = await Medicine.updateOne({ _id: id }, { isDeleted: true });

  return result;
};

export const MedicineServices = {
  createMedicineIntoDB,
  getAllMedicineFromDB,
  getStudentFromDB,
  deleteStudentFromDB,
};
