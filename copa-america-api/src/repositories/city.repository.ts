import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {City, CityRelations, Country, Stadium} from '../models';
import {CountryRepository} from './country.repository';
import {StadiumRepository} from './stadium.repository';

export class CityRepository extends DefaultCrudRepository<
  City,
  typeof City.prototype.id,
  CityRelations
> {

  public readonly country: BelongsToAccessor<Country, typeof City.prototype.id>;

  public readonly stadiums: HasManyRepositoryFactory<Stadium, typeof City.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('CountryRepository') protected countryRepositoryGetter: Getter<CountryRepository>, @repository.getter('StadiumRepository') protected stadiumRepositoryGetter: Getter<StadiumRepository>,
  ) {
    super(City, dataSource);
    this.stadiums = this.createHasManyRepositoryFactoryFor('stadiums', stadiumRepositoryGetter,);
    this.country = this.createBelongsToAccessorFor('country', countryRepositoryGetter,);
  }
}
