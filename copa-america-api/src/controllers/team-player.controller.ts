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
  Player,
} from '../models';
import {TeamRepository} from '../repositories';

export class TeamPlayerController {
  constructor(
    @repository(TeamRepository) protected teamRepository: TeamRepository,
  ) { }

  @get('/teams/{id}/players', {
    responses: {
      '200': {
        description: 'Array of Team has many Player',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Player)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Player>,
  ): Promise<Player[]> {
    return this.teamRepository.players(id).find(filter);
  }

  @post('/teams/{id}/players', {
    responses: {
      '200': {
        description: 'Team model instance',
        content: {'application/json': {schema: getModelSchemaRef(Player)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Team.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Player, {
            title: 'NewPlayerInTeam',
            exclude: ['id'],
            optional: ['teamId']
          }),
        },
      },
    }) player: Omit<Player, 'id'>,
  ): Promise<Player> {
    return this.teamRepository.players(id).create(player);
  }

  @patch('/teams/{id}/players', {
    responses: {
      '200': {
        description: 'Team.Player PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Player, {partial: true}),
        },
      },
    })
    player: Partial<Player>,
    @param.query.object('where', getWhereSchemaFor(Player)) where?: Where<Player>,
  ): Promise<Count> {
    return this.teamRepository.players(id).patch(player, where);
  }

  @del('/teams/{id}/players', {
    responses: {
      '200': {
        description: 'Team.Player DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Player)) where?: Where<Player>,
  ): Promise<Count> {
    return this.teamRepository.players(id).delete(where);
  }
}
