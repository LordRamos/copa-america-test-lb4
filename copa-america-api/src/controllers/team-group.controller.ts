import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Team,
  Group,
} from '../models';
import {TeamRepository} from '../repositories';

export class TeamGroupController {
  constructor(
    @repository(TeamRepository)
    public teamRepository: TeamRepository,
  ) { }

  @get('/teams/{id}/group', {
    responses: {
      '200': {
        description: 'Group belonging to Team',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Group)},
          },
        },
      },
    },
  })
  async getGroup(
    @param.path.number('id') id: typeof Team.prototype.id,
  ): Promise<Group> {
    return this.teamRepository.group(id);
  }
}
