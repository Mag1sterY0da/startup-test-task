import { Service } from './Service';

export class SubCategory {
  private _id: number;
  public name: string;
  private _isEditing: boolean;
  public subCategories: SubCategory[];
  public services: Service[];

  constructor() {
    this._id = Math.random();
    this.name = '';
    this._isEditing = true;
    this.subCategories = [];
    this.services = [];
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
    subCategory.setName('Category');
    this.subCategories.push(subCategory);
  }

  addService(service: Service): void {
    service.setName('ervice');
    this.services.push(service);
  }
}
