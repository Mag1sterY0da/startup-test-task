import { SubCategory } from './SubCategory';

export class Category {
  private _id: number;
  public name: string;
  private _isEditing: boolean;
  public subCategories: SubCategory[];

  constructor() {
    this._id = Math.random();
    this.name = '';
    this._isEditing = true;
    this.subCategories = [];
  }

  getId(): number {
    return this._id;
  }

  setId(id: number): void {
    this._id = id;
  }

  getIsEditing(): boolean {
    return this._isEditing;
  }

  setIsEditing(isEditing: boolean): void {
    this._isEditing = isEditing;
  }

  setName(name: string): void {
    this.name = name;
  }

  addSubCategory(subCategory: SubCategory): void {
    this.subCategories.push(subCategory);
  }

  removeSubCategory(id: number): void {
    this.subCategories = this.subCategories.filter(
      (subCat: SubCategory) => subCat.getId() !== id
    );
  }

  approveSubCategoryEditing(id: number, name: string): void {
    this.subCategories = this.subCategories.map((subCat: SubCategory) => {
      if (subCat.getId() === id) {
        subCat.setIsEditing(false);
        subCat.setName(name);
      }
      return subCat;
    });
  }

  renameSubCategory(id: number, name: string): void {
    this.subCategories = this.subCategories.map((subCat: SubCategory) => {
      if (subCat.getId() === id) {
        subCat.setName(name);
      }
      return subCat;
    });
  }

  editSubCategory(id: number): void {
    this.subCategories = this.subCategories.map((subCat: SubCategory) => {
      if (subCat.getId() === id) {
        subCat.setIsEditing(true);
      }
      return subCat;
    });
  }
}
