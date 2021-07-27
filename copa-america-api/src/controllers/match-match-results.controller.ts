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
  Match,
  MatchResults,
} from '../models';
import {MatchRepository} from '../repositories';

export class MatchMatchResultsController {
  constructor(
    @repository(MatchRepository) protected matchRepository: MatchRepository,
  ) { }

  @get('/matches/{id}/match-results', {
    responses: {
      '200': {
        description: 'Match has one MatchResults',
        content: {
          'application/json': {
            schema: getModelSchemaRef(MatchResults),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<MatchResults>,
  ): Promise<MatchResults> {
    return this.matchRepository.matchResults(id).get(filter);
  }

  @post('/matches/{id}/match-results', {
    responses: {
      '200': {
        description: 'Match model instance',
        content: {'application/json': {schema: getModelSchemaRef(MatchResults)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Match.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MatchResults, {
            title: 'NewMatchResultsInMatch',
            exclude: ['id'],
            optional: ['matchId']
          }),
        },
      },
    }) matchResults: Omit<MatchResults, 'id'>,
  ): Promise<MatchResults> {
    return this.matchRepository.matchResults(id).create(matchResults);
  }

  @patch('/matches/{id}/match-results', {
    responses: {
      '200': {
        description: 'Match.MatchResults PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MatchResults, {partial: true}),
        },
      },
    })
    matchResults: Partial<MatchResults>,
    @param.query.object('where', getWhereSchemaFor(MatchResults)) where?: Where<MatchResults>,
  ): Promise<Count> {
    return this.matchRepository.matchResults(id).patch(matchResults, where);
  }

  @del('/matches/{id}/match-results', {
    responses: {
      '200': {
        description: 'Match.MatchResults DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(MatchResults)) where?: Where<MatchResults>,
  ): Promise<Count> {
    return this.matchRepository.matchResults(id).delete(where);
  }
}
