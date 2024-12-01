export class Category {
  readonly id!: number;
  readonly name!: string;
  readonly description!: string;
  readonly image!: string;

  static create({ id, name, description, image }: Category) {
    return {
      id: id,
      name: name,
      description: description,
      image: image,
    };
  }
}
