import { SubCategory } from './SubCategory';

export class Category {
  public id: number;
  public name: string;
  public isEditing: boolean;
  public subCategories?: SubCategory[];

  constructor(
    id: number,
    name: string,
    isEditing: boolean,
    subCategories?: SubCategory[]
  ) {
    this.id = id;
    this.name = name;
    this.isEditing = isEditing;
    this.subCategories = subCategories;
  }
}
