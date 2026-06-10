// Sri Ganesh Enterprises — Core TypeScript Types
// Validates: Requirements 1.1

export type ProductCategory =
  | 'electrical-appliances'
  | 'electronics'
  | 'mobile-accessories'
  | 'computer-accessories'
  | 'chargers'
  | 'earphones'
  | 'smart-devices';

export type OrderStatus =
  | 'pending'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  shortDescription: string;
  /** Price in INR (rupees) */
  price: number;
  /** Original price before discount, if applicable */
  originalPrice?: number;
  category: ProductCategory;
  brand: string;
  /** Array of image URLs */
  images: string[];
  /** Rating from 0 to 5 */
  rating: number;
  reviewCount: number;
  stock: number;
  specifications: Record<string, string>;
  tags: string[];
  isFeatured: boolean;
  /** ISO date string */
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface WishlistItem {
  product: Product;
  /** ISO date string */
  addedAt: string;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: OrderStatus;
  /** ISO date string */
  createdAt: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  /** ISO date string */
  registeredAt: string;
  totalOrders: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface FilterState {
  category: ProductCategory | null;
  minPrice: number | null;
  maxPrice: number | null;
  minRating: number | null;
  searchQuery: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  /** ISO date string */
  createdAt: string;
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
  website?: string;
}

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
}



export interface SalesDataPoint {
  month: string;
  revenue: number;
  orders: number;
}
