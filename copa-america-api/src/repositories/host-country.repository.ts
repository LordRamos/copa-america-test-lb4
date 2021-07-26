import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Ca2021DataSource} from '../datasources';
import {HostCountry, HostCountryRelations, Country} from '../models';
import {CountryRepository} from './country.repository';

export class HostCountryRepository extends DefaultCrudRepository<
  HostCountry,
  typeof HostCountry.prototype.id,
  HostCountryRelations
> {

  public readonly country: BelongsToAccessor<Country, typeof HostCountry.prototype.id>;

  constructor(
    @inject('datasources.ca2021') dataSource: Ca2021DataSource, @repository.getter('CountryRepository') protected countryRepositoryGetter: Getter<CountryRepository>,
  ) {
    super(HostCountry, dataSource);
    this.country = this.createBelongsToAccessorFor('country', countryRepositoryGetter,);
  }
}
