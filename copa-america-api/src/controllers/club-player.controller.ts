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
  Club,
  Player,
} from '../models';
import {ClubRepository} from '../repositories';

export class ClubPlayerController {
  constructor(
    @repository(ClubRepository) protected clubRepository: ClubRepository,
  ) { }

  @get('/clubs/{id}/players', {
    responses: {
      '200': {
        description: 'Array of Club has many Player',
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
    return this.clubRepository.players(id).find(filter);
  }

  @post('/clubs/{id}/players', {
    responses: {
      '200': {
        description: 'Club model instance',
        content: {'application/json': {schema: getModelSchemaRef(Player)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Club.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Player, {
            title: 'NewPlayerInClub',
            exclude: ['id'],
            optional: ['clubId']
          }),
        },
      },
    }) player: Omit<Player, 'id'>,
  ): Promise<Player> {
    return this.clubRepository.players(id).create(player);
  }

  @patch('/clubs/{id}/players', {
    responses: {
      '200': {
        description: 'Club.Player PATCH success count',
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
    return this.clubRepository.players(id).patch(player, where);
  }

  @del('/clubs/{id}/players', {
    responses: {
      '200': {
        description: 'Club.Player DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Player)) where?: Where<Player>,
  ): Promise<Count> {
    return this.clubRepository.players(id).delete(where);
  }
}
