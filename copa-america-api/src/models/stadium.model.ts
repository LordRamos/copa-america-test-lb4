import {belongsTo, Entity, hasOne, model, property, hasMany} from '@loopback/repository';
import {City} from './city.model';
import {Club} from './club.model';
import {Match} from './match.model';

@model({
  settings: {
    foreignKeys: {
      fk_s_cityId: {
        name: 'fk_s_cityId',
        entity: 'City',
        entityKey: 'id',
        foreignKey: 'cityId',
      }
    }
  }
})
export class Stadium extends Entity {
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

  @hasOne(() => Club)
  club: Club;

  @belongsTo(() => City)
  cityId: number;

  @hasMany(() => Match)
  matches: Match[];

  constructor(data?: Partial<Stadium>) {
    super(data);
  }
}

export interface StadiumRelations {
  // describe navigational properties here
}

export type StadiumWithRelations = Stadium & StadiumRelations;
