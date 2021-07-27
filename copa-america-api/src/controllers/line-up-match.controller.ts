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
  Match,
} from '../models';
import {LineUpRepository} from '../repositories';

export class LineUpMatchController {
  constructor(
    @repository(LineUpRepository)
    public lineUpRepository: LineUpRepository,
  ) { }

  @get('/line-ups/{id}/match', {
    responses: {
      '200': {
        description: 'Match belonging to LineUp',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Match)},
          },
        },
      },
    },
  })
  async getMatch(
    @param.path.number('id') id: typeof LineUp.prototype.id,
  ): Promise<Match> {
    return this.lineUpRepository.match(id);
  }
}
