import {Entity, hasMany, hasOne, model, property} from '@loopback/repository';
import {City} from './city.model';
import {HostCountry} from './host-country.model';

@model()
export class Country extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @hasMany(() => City)
  cities: City[];

  @hasOne(() => HostCountry)
  hostCountry: HostCountry;



  constructor(data?: Partial<Country>) {
    super(data);
  }
}

export interface CountryRelations {
  // describe navigational properties here
}

export type CountryWithRelations = Country & CountryRelations;
