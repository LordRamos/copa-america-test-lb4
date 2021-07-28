import { inject, Getter } from '@loopback/core';
import { DefaultCrudRepository, repository, BelongsToAccessor } from '@loopback/repository';
import { DbDataSource } from '../datasources';
import { HostCountry, HostCountryRelations, GlobalCupInfo, Country } from '../models';
import { GlobalCupInfoRepository } from './global-cup-info.repository';
import { CountryRepository } from './country.repository';

export class HostCountryRepository extends DefaultCrudRepository<
  HostCountry,
  typeof HostCountry.prototype.id,
  HostCountryRelations
> {

  public readonly globalCupInfo: BelongsToAccessor<GlobalCupInfo, typeof HostCountry.prototype.id>;

  public readonly country: BelongsToAccessor<Country, typeof HostCountry.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('GlobalCupInfoRepository') protected globalCupInfoRepositoryGetter: Getter<GlobalCupInfoRepository>, @repository.getter('CountryRepository') protected countryRepositoryGetter: Getter<CountryRepository>,
  ) {
    super(HostCountry, dataSource);
    this.country = this.createBelongsToAccessorFor('country', countryRepositoryGetter,);
    this.registerInclusionResolver('country', this.country.inclusionResolver);

    this.globalCupInfo = this.createBelongsToAccessorFor('globalCupInfo', globalCupInfoRepositoryGetter,);
  }
}
