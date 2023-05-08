import { IReview } from "./ReviewInterface";

export interface IElectronicProduct {
  id: number;
  name: string;
  brand: string;
  price: number;
  oldPrice?: number;
  description: string;
  image: string;
  stock: number;
  rating: number;
  salePercentage: number;
  isNew: boolean;
  category: string;
  comments?: IReview[];
  features: {
    screen?: string;
    processor?: string;
    ram?: string;
    storage?: string;
    os?: string;

    type?: string;
    connectivity?: string;
    impedance?: string;
    frequencyResponse?: string;
    sensitivity?: string;

    resolution?: string;
    sensor?: string;
    isoRange?: string;
    videoResolution?: string;
  };
}

export type ProductExtract = {
  id: number;
  name: string;
  price: number;
  image: string;
};

export interface CartExtract {
  id: number;
  quantity: number;
}

export interface CheckoutData {
  firstName: string;
  lastName: string;
  email: string;
  zipCode: string;
  logradouro: string;
  numberAddress: string;
  complemento: string;
  bairro: string;
  city: string;
  state: string;
  tel: string;
  paymentMethod: string;
  termsAgreed: boolean;
  createAccount: boolean;
  password: string;
  confirmPassword: string;
}
