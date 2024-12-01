import { CurrencyVO } from "./currency-vo";

export class OrderCupcake {
  id!: number;
  name!: string;
  image!: string;
  value!: CurrencyVO;
  quantity!: number;
  description!: string;
  ingredients!: string;

  static create({
    id,
    name,
    image,
    value,
    quantity,
    description,
    ingredients,
  }: OrderCupcake.Input) {
    return {
      id: id,
      name: name,
      image: image,
      value: CurrencyVO.create(Number(value)),
      quantity: quantity,
      description: description,
      ingredients: ingredients,
    };
  }
}

export namespace OrderCupcake {
  export type Input = {
    id: number;
    name: string;
    image: string;
    value: number;
    quantity: number;
    description: string;
    ingredients: string;
  };
}
