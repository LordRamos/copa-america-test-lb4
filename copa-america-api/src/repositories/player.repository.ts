import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Ca2021DataSource} from '../datasources';
import {Player, PlayerRelations} from '../models';

export class PlayerRepository extends DefaultCrudRepository<
  Player,
  typeof Player.prototype.id,
  PlayerRelations
> {
  constructor(
    @inject('datasources.ca2021') dataSource: Ca2021DataSource,
  ) {
    super(Player, dataSource);
  }
}
