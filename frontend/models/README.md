Geralmente eu prefiro criar *models* e *value objects* com comportamento para ficar com algumas regras de cada um deles centralizada aqui.

Mas como o NextJS é um SSR ele tem uma limitação relacionada a transmissão de objetos do server para o client, uma das limitações é só passar atributos para um componente do client que sejam em _Plain Object_ e classes com comportamento não respeitam isso, então eu decidi criar modelos pobres que tenham algumas regras de criação usando um método estático chamado _create_ mas retornar apenas os atributos ja formatados.
