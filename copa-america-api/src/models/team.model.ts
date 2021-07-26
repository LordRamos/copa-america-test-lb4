import {belongsTo, hasMany, Model, model, property} from '@loopback/repository';
import {Group} from './group.model';
import {Match} from './match.model';
import {Player} from './player.model';

@model()
export class Team extends Model {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  matchNumber?: number;

  @property({
    type: 'string',
    required: true,
  })
  nickname: string;
  @property({
    type: 'string',
    required: true,
  })
  clubName: string;


  @property({
    type: 'number',
  })
  countryId?: number;


  @belongsTo(() => Group)
  groupId: number;

  @hasMany(() => Match, {keyTo: 'homeTeamId'})
  homeMatches: Match[];

  @hasMany(() => Match, {keyTo: 'awayTeamId'})
  awayMatches: Match[];

  @hasMany(() => Player)
  players: Player[];



  constructor(data?: Partial<Team>) {
    super(data);
  }
}

export interface TeamRelations {
  // describe navigational properties here
}

export type TeamWithRelations = Team & TeamRelations;
