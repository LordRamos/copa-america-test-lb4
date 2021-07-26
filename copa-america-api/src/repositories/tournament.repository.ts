import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Ca2021DataSource} from '../datasources';
import {Tournament, TournamentRelations} from '../models';

export class TournamentRepository extends DefaultCrudRepository<
  Tournament,
  typeof Tournament.prototype.id,
  TournamentRelations
> {
  constructor(
    @inject('datasources.ca2021') dataSource: Ca2021DataSource,
  ) {
    super(Tournament, dataSource);
  }
}
