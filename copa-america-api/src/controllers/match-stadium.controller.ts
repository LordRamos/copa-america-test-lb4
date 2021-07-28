import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Match,
  Stadium,
} from '../models';
import {MatchRepository} from '../repositories';

export class MatchStadiumController {
  constructor(
    @repository(MatchRepository)
    public matchRepository: MatchRepository,
  ) { }

  @get('/matches/{id}/stadium', {
    responses: {
      '200': {
        description: 'Stadium belonging to Match',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Stadium)},
          },
        },
      },
    },
  })
  async getStadium(
    @param.path.number('id') id: typeof Match.prototype.id,
  ): Promise<Stadium> {
    return this.matchRepository.stadium(id);
  }
}
