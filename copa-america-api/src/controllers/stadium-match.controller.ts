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
  Stadium,
  Match,
} from '../models';
import {StadiumRepository} from '../repositories';

export class StadiumMatchController {
  constructor(
    @repository(StadiumRepository) protected stadiumRepository: StadiumRepository,
  ) { }

  @get('/stadiums/{id}/matches', {
    responses: {
      '200': {
        description: 'Array of Stadium has many Match',
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
    return this.stadiumRepository.matches(id).find(filter);
  }

  @post('/stadiums/{id}/matches', {
    responses: {
      '200': {
        description: 'Stadium model instance',
        content: {'application/json': {schema: getModelSchemaRef(Match)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Stadium.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Match, {
            title: 'NewMatchInStadium',
            exclude: ['id'],
            optional: ['stadiumId']
          }),
        },
      },
    }) match: Omit<Match, 'id'>,
  ): Promise<Match> {
    return this.stadiumRepository.matches(id).create(match);
  }

  @patch('/stadiums/{id}/matches', {
    responses: {
      '200': {
        description: 'Stadium.Match PATCH success count',
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
    return this.stadiumRepository.matches(id).patch(match, where);
  }

  @del('/stadiums/{id}/matches', {
    responses: {
      '200': {
        description: 'Stadium.Match DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Match)) where?: Where<Match>,
  ): Promise<Count> {
    return this.stadiumRepository.matches(id).delete(where);
  }
}
