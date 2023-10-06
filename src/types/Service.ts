export class Service {
  public id: number;
  public name: string;
  public isEditing: boolean;

  constructor(id: number, name: string, isEditing: boolean) {
    this.id = id;
    this.name = name;
    this.isEditing = isEditing;
  }
}
