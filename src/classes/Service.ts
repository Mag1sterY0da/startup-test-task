export class Service {
  private _id: number;
  public name: string;
  private _isEditing: boolean;

  constructor() {
    this._id = Math.random();
    this.name = '';
    this._isEditing = false;
  }

  getId(): number {
    return this._id;
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
}
