interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

interface Product {
  _id: string;
  title: string;
  imageCover: string;
  quantity: number;
  ratingsAverage: number;
  id: string;
  brand: Brand;
  category: Category;
  subcategory: Subcategory[];
}

interface CartProduct {
  count: number;
  price: number;
  product: Product;
  _id: string;
}

export interface CartData {
  _id: string;
  cartOwner: string;
  products: CartProduct[];
  totalCartPrice: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  numOfCartItems?: number;
}
