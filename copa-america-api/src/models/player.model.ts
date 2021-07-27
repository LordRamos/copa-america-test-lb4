import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Club} from './club.model';
import {Country} from './country.model';
import {LineUpPlayer} from './line-up-player.model';
import {PlayerPosition} from './player-position.model';
import {Team} from './team.model';

@model({
  settings: {
    foreignKeys: {
      fk_p_nationalityId: {
        name: 'fk_p_nationalityId',
        entity: 'Country',
        entityKey: 'id',
        foreignKey: 'nationalityId',
      }, fk_p_playerPositionId: {
        name: 'fk_p_playerPositionId',
        entity: 'PlayerPosition',
        entityKey: 'id',
        foreignKey: 'playerPositionId',
      }, fk_p_teamId: {
        name: 'fk_p_teamId',
        entity: 'Team',
        entityKey: 'id',
        foreignKey: 'teamId',
      },
      fk_p_clubId: {
        name: 'fk_p_clubId',
        entity: 'Club',
        entityKey: 'id',
        foreignKey: 'clubId',
      }
    }
  }
})
export class Player extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  shirtNumber: number;

  @property({
    type: 'string',
    required: true,
  })
  firstName: string;

  @property({
    type: 'string',
    required: true,
  })
  lastName: string;

  @property({
    type: 'string',
    required: true,
  })
  nickName: string;

  @property({
    type: 'string',
    required: true,
  })
  nameOnShirt: string;

  @property({
    type: 'date',
    required: true,
  })
  birthDate: string;

  @property({
    type: 'number',
    required: true,
  })
  passportNumber: number;

  @property({
    type: 'date',
    required: true,
  })
  passportExpirationDate: string;

  @property({
    type: 'number',
    required: true,
  })
  weight: number;

  @property({
    type: 'number',
    required: true,
  })
  height: number;

  @property({
    type: 'boolean',
    required: true,
  })
  isCoach: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  isOnFinalList: boolean;


  @belongsTo(() => Country)
  nationalityId: number;

  @belongsTo(() => PlayerPosition)
  playerPositionId: number;

  @belongsTo(() => Team)
  teamId: number;

  @belongsTo(() => Club)
  clubId: number;

  @hasMany(() => LineUpPlayer)
  lineUpPlayers: LineUpPlayer[];

  constructor(data?: Partial<Player>) {
    super(data);
  }
}

export interface PlayerRelations {
  // describe navigational properties here
}

export type PlayerWithRelations = Player & PlayerRelations;
