import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  LineUp,
  Team,
} from '../models';
import {LineUpRepository} from '../repositories';

export class LineUpTeamController {
  constructor(
    @repository(LineUpRepository)
    public lineUpRepository: LineUpRepository,
  ) { }

  @get('/line-ups/{id}/team', {
    responses: {
      '200': {
        description: 'Team belonging to LineUp',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Team)},
          },
        },
      },
    },
  })
  async getTeam(
    @param.path.number('id') id: typeof LineUp.prototype.id,
  ): Promise<Team> {
    return this.lineUpRepository.team(id);
  }
}
