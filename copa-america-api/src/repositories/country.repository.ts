import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, HasOneRepositoryFactory, repository} from '@loopback/repository';
import {Ca2021DataSource} from '../datasources';
import {City, Country, CountryRelations, HostCountry} from '../models';
import {CityRepository} from './city.repository';
import {HostCountryRepository} from './host-country.repository';

export class CountryRepository extends DefaultCrudRepository<
  Country,
  typeof Country.prototype.id,
  CountryRelations
> {

  public readonly cities: HasManyRepositoryFactory<City, typeof Country.prototype.id>;

  public readonly hostCountries: HasManyRepositoryFactory<HostCountry, typeof Country.prototype.id>;

  public readonly hostCountry: HasOneRepositoryFactory<HostCountry, typeof Country.prototype.id>;


  constructor(
    @inject('datasources.ca2021') dataSource: Ca2021DataSource, @repository.getter('CityRepository') protected cityRepositoryGetter: Getter<CityRepository>, @repository.getter('HostCountryRepository') protected hostCountryRepositoryGetter: Getter<HostCountryRepository>,
  ) {
    super(Country, dataSource);

    this.hostCountry = this.createHasOneRepositoryFactoryFor('hostCountry', hostCountryRepositoryGetter);
    this.hostCountries = this.createHasManyRepositoryFactoryFor('hostCountries', hostCountryRepositoryGetter,);
    this.cities = this.createHasManyRepositoryFactoryFor('cities', cityRepositoryGetter,);
    this.registerInclusionResolver('cities', this.cities.inclusionResolver);
  }
}
