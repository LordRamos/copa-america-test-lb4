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
  City,
  Stadium,
} from '../models';
import {CityRepository} from '../repositories';

export class CityStadiumController {
  constructor(
    @repository(CityRepository) protected cityRepository: CityRepository,
  ) { }

  @get('/cities/{id}/stadiums', {
    responses: {
      '200': {
        description: 'Array of City has many Stadium',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Stadium)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Stadium>,
  ): Promise<Stadium[]> {
    return this.cityRepository.stadiums(id).find(filter);
  }

  @post('/cities/{id}/stadiums', {
    responses: {
      '200': {
        description: 'City model instance',
        content: {'application/json': {schema: getModelSchemaRef(Stadium)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof City.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Stadium, {
            title: 'NewStadiumInCity',
            exclude: ['id'],
            optional: ['cityId']
          }),
        },
      },
    }) stadium: Omit<Stadium, 'id'>,
  ): Promise<Stadium> {
    return this.cityRepository.stadiums(id).create(stadium);
  }

  @patch('/cities/{id}/stadiums', {
    responses: {
      '200': {
        description: 'City.Stadium PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Stadium, {partial: true}),
        },
      },
    })
    stadium: Partial<Stadium>,
    @param.query.object('where', getWhereSchemaFor(Stadium)) where?: Where<Stadium>,
  ): Promise<Count> {
    return this.cityRepository.stadiums(id).patch(stadium, where);
  }

  @del('/cities/{id}/stadiums', {
    responses: {
      '200': {
        description: 'City.Stadium DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Stadium)) where?: Where<Stadium>,
  ): Promise<Count> {
    return this.cityRepository.stadiums(id).delete(where);
  }
}
