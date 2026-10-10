export type Category =
  | 'Fiction'
  | 'Science'
  | 'History'
  | 'Technology'
  | 'Fantasy'
  | 'Biography';

export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  category: Category;
  coverColor: string;
}

export type CategoryFilterValue = Category | 'All';

/** Map of book id -> quantity in the cart. */
export type CartItems = Record<Book['id'], number>;
