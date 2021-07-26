import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Stage,
  Match,
} from '../models';
import {StageRepository} from '../repositories';

export class StageMatchController {
  constructor(
    @repository(StageRepository) protected stageRepository: StageRepository,
  ) { }

  @get('/stages/{id}/matches', {
    responses: {
      '200': {
        description: 'Array of Stage has many Match',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Match)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Match>,
  ): Promise<Match[]> {
    return this.stageRepository.matches(id).find(filter);
  }

  @post('/stages/{id}/matches', {
    responses: {
      '200': {
        description: 'Stage model instance',
        content: {'application/json': {schema: getModelSchemaRef(Match)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Stage.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Match, {
            title: 'NewMatchInStage',
            exclude: ['id'],
            optional: ['stageId']
          }),
        },
      },
    }) match: Omit<Match, 'id'>,
  ): Promise<Match> {
    return this.stageRepository.matches(id).create(match);
  }

  @patch('/stages/{id}/matches', {
    responses: {
      '200': {
        description: 'Stage.Match PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Match, {partial: true}),
        },
      },
    })
    match: Partial<Match>,
    @param.query.object('where', getWhereSchemaFor(Match)) where?: Where<Match>,
  ): Promise<Count> {
    return this.stageRepository.matches(id).patch(match, where);
  }

  @del('/stages/{id}/matches', {
    responses: {
      '200': {
        description: 'Stage.Match DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Match)) where?: Where<Match>,
  ): Promise<Count> {
    return this.stageRepository.matches(id).delete(where);
  }
}
