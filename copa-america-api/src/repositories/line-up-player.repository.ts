import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {LineUpPlayer, LineUpPlayerRelations, LineUp} from '../models';
import {LineUpRepository} from './line-up.repository';

export class LineUpPlayerRepository extends DefaultCrudRepository<
  LineUpPlayer,
  typeof LineUpPlayer.prototype.id,
  LineUpPlayerRelations
> {

  public readonly lineUp: BelongsToAccessor<LineUp, typeof LineUpPlayer.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('LineUpRepository') protected lineUpRepositoryGetter: Getter<LineUpRepository>,
  ) {
    super(LineUpPlayer, dataSource);
    this.lineUp = this.createBelongsToAccessorFor('lineUp', lineUpRepositoryGetter,);
  }
}
