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
  Team,
  LineUp,
} from '../models';
import {TeamRepository} from '../repositories';

export class TeamLineUpController {
  constructor(
    @repository(TeamRepository) protected teamRepository: TeamRepository,
  ) { }

  @get('/teams/{id}/line-ups', {
    responses: {
      '200': {
        description: 'Array of Team has many LineUp',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(LineUp)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<LineUp>,
  ): Promise<LineUp[]> {
    return this.teamRepository.lineUps(id).find(filter);
  }

  @post('/teams/{id}/line-ups', {
    responses: {
      '200': {
        description: 'Team model instance',
        content: {'application/json': {schema: getModelSchemaRef(LineUp)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Team.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LineUp, {
            title: 'NewLineUpInTeam',
            exclude: ['id'],
            optional: ['teamId']
          }),
        },
      },
    }) lineUp: Omit<LineUp, 'id'>,
  ): Promise<LineUp> {
    return this.teamRepository.lineUps(id).create(lineUp);
  }

  @patch('/teams/{id}/line-ups', {
    responses: {
      '200': {
        description: 'Team.LineUp PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LineUp, {partial: true}),
        },
      },
    })
    lineUp: Partial<LineUp>,
    @param.query.object('where', getWhereSchemaFor(LineUp)) where?: Where<LineUp>,
  ): Promise<Count> {
    return this.teamRepository.lineUps(id).patch(lineUp, where);
  }

  @del('/teams/{id}/line-ups', {
    responses: {
      '200': {
        description: 'Team.LineUp DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(LineUp)) where?: Where<LineUp>,
  ): Promise<Count> {
    return this.teamRepository.lineUps(id).delete(where);
  }
}
