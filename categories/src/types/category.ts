export interface Category {
  id: number;
  title: string;
}

export interface ICategory extends Category {
  subCategories?: string[];
}
