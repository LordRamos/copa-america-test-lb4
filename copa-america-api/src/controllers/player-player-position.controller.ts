import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Player,
  PlayerPosition,
} from '../models';
import {PlayerRepository} from '../repositories';

export class PlayerPlayerPositionController {
  constructor(
    @repository(PlayerRepository)
    public playerRepository: PlayerRepository,
  ) { }

  @get('/players/{id}/player-position', {
    responses: {
      '200': {
        description: 'PlayerPosition belonging to Player',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PlayerPosition)},
          },
        },
      },
    },
  })
  async getPlayerPosition(
    @param.path.number('id') id: typeof Player.prototype.id,
  ): Promise<PlayerPosition> {
    return this.playerRepository.playerPosition(id);
  }
}
