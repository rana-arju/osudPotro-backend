export interface IMedicine {
  name: string;
  images: string[];
  quantity: number;
  type: string;
  usege?: string;
  sideEffect?: string;
  precautions?: string;
  description: string;
  category: string;
  Dosage?: string;
  stockavailable: boolean;
  prescription: 'Yes' | 'No';
  expiryDate: Date;
  manufacturer: string;
}
