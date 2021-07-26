import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Ca2021DataSource} from '../datasources';
import {PlayerPosition, PlayerPositionRelations} from '../models';

export class PlayerPositionRepository extends DefaultCrudRepository<
  PlayerPosition,
  typeof PlayerPosition.prototype.id,
  PlayerPositionRelations
> {
  constructor(
    @inject('datasources.ca2021') dataSource: Ca2021DataSource,
  ) {
    super(PlayerPosition, dataSource);
  }
}
