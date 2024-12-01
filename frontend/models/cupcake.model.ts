import { Category } from "./category.model";
import { CurrencyVO } from "./currency-vo";

export class Cupcake {
  readonly id!: number;
  readonly name!: string;
  readonly description!: string;
  readonly ingredients!: string;
  readonly value!: CurrencyVO;
  readonly image!: string;
  readonly categories!: Category[];

  static create({
    id,
    name,
    description,
    ingredients,
    value,
    image,
    categories,
  }: Cupcake.Input) {
    return {
      id: id,
      name: name,
      description: description,
      ingredients: ingredients,
      value: CurrencyVO.create(Number(value)),
      image: image,
      categories: categories,
    };
  }
}

export namespace Cupcake {
  export type Input = {
    readonly id: number;
    readonly name: string;
    readonly description: string;
    readonly ingredients: string;
    readonly value: number | string;
    readonly image: string;
    readonly categories: Category[];
  };
}
