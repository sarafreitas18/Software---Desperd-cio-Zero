
export interface Store {
  id: number;
  name: string;
  location: string;
  logoUrl: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  originalPrice: number;
  discountedPrice: number;
  storeId: number;
  expiryDate: string;
  quantity: number;
}
