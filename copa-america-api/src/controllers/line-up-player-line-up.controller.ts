import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  LineUpPlayer,
  LineUp,
} from '../models';
import {LineUpPlayerRepository} from '../repositories';

export class LineUpPlayerLineUpController {
  constructor(
    @repository(LineUpPlayerRepository)
    public lineUpPlayerRepository: LineUpPlayerRepository,
  ) { }

  @get('/line-up-players/{id}/line-up', {
    responses: {
      '200': {
        description: 'LineUp belonging to LineUpPlayer',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(LineUp)},
          },
        },
      },
    },
  })
  async getLineUp(
    @param.path.number('id') id: typeof LineUpPlayer.prototype.id,
  ): Promise<LineUp> {
    return this.lineUpPlayerRepository.lineUp(id);
  }
}
