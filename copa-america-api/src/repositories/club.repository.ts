import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Club, ClubRelations, Player} from '../models';
import {PlayerRepository} from './player.repository';

export class ClubRepository extends DefaultCrudRepository<
  Club,
  typeof Club.prototype.id,
  ClubRelations
> {

  public readonly players: HasManyRepositoryFactory<Player, typeof Club.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('PlayerRepository') protected playerRepositoryGetter: Getter<PlayerRepository>,
  ) {
    super(Club, dataSource);
    this.players = this.createHasManyRepositoryFactoryFor('players', playerRepositoryGetter,);
  }
}
