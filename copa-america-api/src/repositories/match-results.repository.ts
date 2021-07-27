import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {MatchResults, MatchResultsRelations} from '../models';

export class MatchResultsRepository extends DefaultCrudRepository<
  MatchResults,
  typeof MatchResults.prototype.id,
  MatchResultsRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(MatchResults, dataSource);
  }
}
