/** Normalmente eu prefiro criar classes sem método */
export class CurrencyVO {
  value!: number;
  formatted!: string;

  static create(value: number): CurrencyVO {
    return {
      value,
      formatted: value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      }),
    };
  }
}
