import CartClient from './CartClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shopping Cart | Sri Ganesh Enterprises ENTERPRISES',
};

export default function CartPage() {
  return <CartClient />;
}