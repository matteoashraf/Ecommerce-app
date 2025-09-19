interface Review {
    _id: string;
    user: string;
    rating: number;
    comment: string;
    createdAt: string;
}

export interface ProductDetails {
    brand: Brand;
    category: Category;
    createdAt: string;
    description: string;
    id: string;
    imageCover: string;
    images: string[];
    price: number;
    quantity: number;
    ratingsAverage: number;
    ratingsQuantity: number;
    reviews: Review[];
    slug: string;
    sold: number;
    subcategory: Subcategory[];
    title: string;
    updatedAt: string;
    __v: number;
    _id: string;
}

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
