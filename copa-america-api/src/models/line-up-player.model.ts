import {belongsTo, Entity, model, property} from '@loopback/repository';
import {LineUp} from './line-up.model';

@model({
  settings: {
    foreignKeys: {
      fk_lup_playerId: {
        name: 'fk_lup_playerId',
        entity: 'Player',
        entityKey: 'id',
        foreignKey: 'playerId',
      }, fk_lup_lineUpId: {
        name: 'fk_lup_lineUpId',
        entity: 'LineUp',
        entityKey: 'id',
        foreignKey: 'lineUpId',
      }
    }
  }
})
export class LineUpPlayer extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'boolean',
    required: true,
  })
  isStarter: boolean;

  @property({
    type: 'number',
    required: true,
  })
  lineupNumber: number;

  @belongsTo(() => LineUp)
  lineUpId: number;

  @property({
    type: 'number',
  })
  playerId?: number;

  constructor(data?: Partial<LineUpPlayer>) {
    super(data);
  }
}

export interface LineUpPlayerRelations {
  // describe navigational properties here
}

export type LineUpPlayerWithRelations = LineUpPlayer & LineUpPlayerRelations;
