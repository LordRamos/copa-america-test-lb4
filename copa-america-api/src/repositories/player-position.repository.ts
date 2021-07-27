import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {PlayerPosition, PlayerPositionRelations, Player} from '../models';
import {PlayerRepository} from './player.repository';

export class PlayerPositionRepository extends DefaultCrudRepository<
  PlayerPosition,
  typeof PlayerPosition.prototype.id,
  PlayerPositionRelations
> {

  public readonly players: HasManyRepositoryFactory<Player, typeof PlayerPosition.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('PlayerRepository') protected playerRepositoryGetter: Getter<PlayerRepository>,
  ) {
    super(PlayerPosition, dataSource);
    this.players = this.createHasManyRepositoryFactoryFor('players', playerRepositoryGetter,);
  }
}
