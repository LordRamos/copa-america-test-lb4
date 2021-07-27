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
  Club,
} from '../models';
import {PlayerRepository} from '../repositories';

export class PlayerClubController {
  constructor(
    @repository(PlayerRepository)
    public playerRepository: PlayerRepository,
  ) { }

  @get('/players/{id}/club', {
    responses: {
      '200': {
        description: 'Club belonging to Player',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Club)},
          },
        },
      },
    },
  })
  async getClub(
    @param.path.number('id') id: typeof Player.prototype.id,
  ): Promise<Club> {
    return this.playerRepository.club(id);
  }
}
