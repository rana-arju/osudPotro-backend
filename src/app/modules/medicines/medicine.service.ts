import { IMedicine } from './medicine.interface';
import { Medicine } from './medicine.schema';

const createMedicineIntoDB = async (medicineData: IMedicine) => {
  const result = await Medicine.create(medicineData);
  return result;
};

const getAllStudentFromDB = async () => {
  const result = await Medicine.find();
  return result;
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
  getAllStudentFromDB,
  getStudentFromDB,
  deleteStudentFromDB,
};
