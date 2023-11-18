// Node libs
import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Example {

  @PrimaryKey()
  id!: number;

  @Property()
  key!: string;

  @Property()
  value!: string;
}