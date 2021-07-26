import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Ca2021DataSource} from '../datasources';
import {Country, CountryRelations, City} from '../models';
import {CityRepository} from './city.repository';

export class CountryRepository extends DefaultCrudRepository<
  Country,
  typeof Country.prototype.id,
  CountryRelations
> {

  public readonly cities: HasManyRepositoryFactory<City, typeof Country.prototype.id>;

  constructor(
    @inject('datasources.ca2021') dataSource: Ca2021DataSource, @repository.getter('CityRepository') protected cityRepositoryGetter: Getter<CityRepository>,
  ) {
    super(Country, dataSource);
    this.cities = this.createHasManyRepositoryFactoryFor('cities', cityRepositoryGetter,);
    this.registerInclusionResolver('cities', this.cities.inclusionResolver);
  }
}
