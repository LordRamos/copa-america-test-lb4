import {belongsTo, Entity, model, property, hasMany} from '@loopback/repository';
import {Country} from './country.model';
import {Match} from './match.model';

@model({
  settings: {
    foreignKeys: {
      fk_rf_countryId: {
        name: 'fk_rf_countryId',
        entity: 'Country',
        entityKey: 'id',
        foreignKey: 'countryId',
      }
    }
  }
})
export class Referee extends Entity {
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

  @hasMany(() => Match)
  matches: Match[];

  constructor(data?: Partial<Referee>) {
    super(data);
  }
}

export interface RefereeRelations {
  // describe navigational properties here
}

export type RefereeWithRelations = Referee & RefereeRelations;
