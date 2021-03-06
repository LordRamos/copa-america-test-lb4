import {belongsTo, Entity, model, property, hasMany} from '@loopback/repository';
import {Country} from './country.model';
import {Stadium} from './stadium.model';

@model({
  settings: {
    foreignKeys: {
      fk_countryId: {
        name: 'fk_countryId',
        entity: 'Country',
        entityKey: 'id',
        foreignKey: 'countryId',
      }
    }
  }
})
export class City extends Entity {
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

  @belongsTo(() => Country)
  countryId: number;

  @hasMany(() => Stadium)
  stadiums: Stadium[];

  constructor(data?: Partial<City>) {
    super(data);
  }
}

export interface CityRelations {
  // describe navigational properties here
}

export type CityWithRelations = City & CityRelations;
