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
  Stage,
} from '../models';
import {MatchRepository} from '../repositories';

export class MatchStageController {
  constructor(
    @repository(MatchRepository)
    public matchRepository: MatchRepository,
  ) { }

  @get('/matches/{id}/stage', {
    responses: {
      '200': {
        description: 'Stage belonging to Match',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Stage)},
          },
        },
      },
    },
  })
  async getStage(
    @param.path.number('id') id: typeof Match.prototype.id,
  ): Promise<Stage> {
    return this.matchRepository.stage(id);
  }
}
