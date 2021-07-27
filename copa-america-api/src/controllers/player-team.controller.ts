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
  Team,
} from '../models';
import {PlayerRepository} from '../repositories';

export class PlayerTeamController {
  constructor(
    @repository(PlayerRepository)
    public playerRepository: PlayerRepository,
  ) { }

  @get('/players/{id}/team', {
    responses: {
      '200': {
        description: 'Team belonging to Player',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Team)},
          },
        },
      },
    },
  })
  async getTeam(
    @param.path.number('id') id: typeof Player.prototype.id,
  ): Promise<Team> {
    return this.playerRepository.team(id);
  }
}
