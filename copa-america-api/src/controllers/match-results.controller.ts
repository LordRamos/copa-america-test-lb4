import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {MatchResults} from '../models';
import {MatchResultsRepository} from '../repositories';

export class MatchResultsController {
  constructor(
    @repository(MatchResultsRepository)
    public matchResultsRepository : MatchResultsRepository,
  ) {}

  @post('/match-results')
  @response(200, {
    description: 'MatchResults model instance',
    content: {'application/json': {schema: getModelSchemaRef(MatchResults)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MatchResults, {
            title: 'NewMatchResults',
            exclude: ['id'],
          }),
        },
      },
    })
    matchResults: Omit<MatchResults, 'id'>,
  ): Promise<MatchResults> {
    return this.matchResultsRepository.create(matchResults);
  }

  @get('/match-results/count')
  @response(200, {
    description: 'MatchResults model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(MatchResults) where?: Where<MatchResults>,
  ): Promise<Count> {
    return this.matchResultsRepository.count(where);
  }

  @get('/match-results')
  @response(200, {
    description: 'Array of MatchResults model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(MatchResults, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(MatchResults) filter?: Filter<MatchResults>,
  ): Promise<MatchResults[]> {
    return this.matchResultsRepository.find(filter);
  }

  @patch('/match-results')
  @response(200, {
    description: 'MatchResults PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MatchResults, {partial: true}),
        },
      },
    })
    matchResults: MatchResults,
    @param.where(MatchResults) where?: Where<MatchResults>,
  ): Promise<Count> {
    return this.matchResultsRepository.updateAll(matchResults, where);
  }

  @get('/match-results/{id}')
  @response(200, {
    description: 'MatchResults model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(MatchResults, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(MatchResults, {exclude: 'where'}) filter?: FilterExcludingWhere<MatchResults>
  ): Promise<MatchResults> {
    return this.matchResultsRepository.findById(id, filter);
  }

  @patch('/match-results/{id}')
  @response(204, {
    description: 'MatchResults PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MatchResults, {partial: true}),
        },
      },
    })
    matchResults: MatchResults,
  ): Promise<void> {
    await this.matchResultsRepository.updateById(id, matchResults);
  }

  @put('/match-results/{id}')
  @response(204, {
    description: 'MatchResults PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() matchResults: MatchResults,
  ): Promise<void> {
    await this.matchResultsRepository.replaceById(id, matchResults);
  }

  @del('/match-results/{id}')
  @response(204, {
    description: 'MatchResults DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.matchResultsRepository.deleteById(id);
  }
}
