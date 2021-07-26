import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Stadium,
  City,
} from '../models';
import {StadiumRepository} from '../repositories';

export class StadiumCityController {
  constructor(
    @repository(StadiumRepository)
    public stadiumRepository: StadiumRepository,
  ) { }

  @get('/stadiums/{id}/city', {
    responses: {
      '200': {
        description: 'City belonging to Stadium',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(City)},
          },
        },
      },
    },
  })
  async getCity(
    @param.path.number('id') id: typeof Stadium.prototype.id,
  ): Promise<City> {
    return this.stadiumRepository.city(id);
  }
}
