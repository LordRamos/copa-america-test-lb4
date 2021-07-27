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
  Club,
} from '../models';
import {StadiumRepository} from '../repositories';

export class StadiumClubController {
  constructor(
    @repository(StadiumRepository) protected stadiumRepository: StadiumRepository,
  ) { }

  @get('/stadiums/{id}/club', {
    responses: {
      '200': {
        description: 'Stadium has one Club',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Club),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Club>,
  ): Promise<Club> {
    return this.stadiumRepository.club(id).get(filter);
  }

  @post('/stadiums/{id}/club', {
    responses: {
      '200': {
        description: 'Stadium model instance',
        content: {'application/json': {schema: getModelSchemaRef(Club)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Stadium.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Club, {
            title: 'NewClubInStadium',
            exclude: ['id'],
            optional: ['stadiumId']
          }),
        },
      },
    }) club: Omit<Club, 'id'>,
  ): Promise<Club> {
    return this.stadiumRepository.club(id).create(club);
  }

  @patch('/stadiums/{id}/club', {
    responses: {
      '200': {
        description: 'Stadium.Club PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Club, {partial: true}),
        },
      },
    })
    club: Partial<Club>,
    @param.query.object('where', getWhereSchemaFor(Club)) where?: Where<Club>,
  ): Promise<Count> {
    return this.stadiumRepository.club(id).patch(club, where);
  }

  @del('/stadiums/{id}/club', {
    responses: {
      '200': {
        description: 'Stadium.Club DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Club)) where?: Where<Club>,
  ): Promise<Count> {
    return this.stadiumRepository.club(id).delete(where);
  }
}
