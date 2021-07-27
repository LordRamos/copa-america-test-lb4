import {Entity, hasMany, model, property} from '@loopback/repository';
import {Player} from './player.model';

@model({
  settings: {
    foreignKeys: {
      fk_c_stadiumId: {
        name: 'fk_c_stadiumId',
        entity: 'Stadium',
        entityKey: 'id',
        foreignKey: 'stadiumId',
      }
    }
  }
})
export class Club extends Entity {
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

  @property({
    type: 'string',
  })
  nickname?: string;

  @property({
    type: 'number',
  })
  stadiumId?: number;

  @hasMany(() => Player)
  players: Player[];

  constructor(data?: Partial<Club>) {
    super(data);
  }
}

export interface ClubRelations {
  // describe navigational properties here
}

export type ClubWithRelations = Club & ClubRelations;
