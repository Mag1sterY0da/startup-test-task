import { Service } from './Service';

export class SubCategory {
  public id: number;
  public name: string;
  public isEditing: boolean;
  public subCategories?: SubCategory[];
  public services?: Service[];

  constructor(
    id: number,
    name: string,
    isEditing: boolean,
    subCategories?: SubCategory[],
    services?: Service[]
  ) {
    this.id = id;
    this.name = name;
    this.isEditing = isEditing;
    this.subCategories = subCategories;
    this.services = services;
  }
}
