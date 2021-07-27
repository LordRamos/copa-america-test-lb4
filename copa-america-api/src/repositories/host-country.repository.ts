import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {HostCountry, HostCountryRelations} from '../models';

export class HostCountryRepository extends DefaultCrudRepository<
  HostCountry,
  typeof HostCountry.prototype.id,
  HostCountryRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(HostCountry, dataSource);
  }
}
