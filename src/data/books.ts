import type { Book, Category } from '../types';

export const CATEGORIES: Category[] = [
  'Fiction',
  'Science',
  'History',
  'Technology',
  'Fantasy',
  'Biography',
];

export const BOOKS: Book[] = [
  { id: '1', title: 'The Silent River', author: 'Elena Marsh', price: 14.99, category: 'Fiction', coverColor: '#2f5d62' },
  { id: '2', title: 'Midnight Library Tales', author: 'Jonah Reed', price: 12.5, category: 'Fiction', coverColor: '#5e3c58' },
  { id: '3', title: 'Cosmos Explained', author: 'Dr. Priya Nair', price: 22.0, category: 'Science', coverColor: '#1d3557' },
  { id: '4', title: 'The Gene Code', author: 'Marcus Hale', price: 19.99, category: 'Science', coverColor: '#386641' },
  { id: '5', title: 'Empires of Sand', author: 'Leila Haddad', price: 24.75, category: 'History', coverColor: '#9c6644' },
  { id: '6', title: 'The Long War', author: 'Thomas Byrne', price: 18.0, category: 'History', coverColor: '#6b705c' },
  { id: '7', title: 'Clean TypeScript', author: 'Ava Chen', price: 34.99, category: 'Technology', coverColor: '#1d63c9' },
  { id: '8', title: 'Designing the Web', author: 'Samuel Ortiz', price: 29.5, category: 'Technology', coverColor: '#b8472c' },
  { id: '9', title: 'Dragons of Eldoria', author: 'Fiona Blake', price: 16.25, category: 'Fantasy', coverColor: '#7b2cbf' },
  { id: '10', title: 'The Iron Crown', author: 'Kai Morgan', price: 15.0, category: 'Fantasy', coverColor: '#9d0208' },
  { id: '11', title: 'A Life in Letters', author: 'Grace Whitman', price: 21.0, category: 'Biography', coverColor: '#8f5119' },
  { id: '12', title: 'Becoming Bold', author: 'Nadia Osei', price: 17.99, category: 'Biography', coverColor: '#264653' },
];
