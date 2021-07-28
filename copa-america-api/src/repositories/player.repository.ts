import { inject, Getter } from '@loopback/core';
import { DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory } from '@loopback/repository';
import { DbDataSource } from '../datasources';
import { Player, PlayerRelations, Country, PlayerPosition, Team, Club, LineUpPlayer } from '../models';
import { CountryRepository } from './country.repository';
import { PlayerPositionRepository } from './player-position.repository';
import { TeamRepository } from './team.repository';
import { ClubRepository } from './club.repository';
import { LineUpPlayerRepository } from './line-up-player.repository';

export class PlayerRepository extends DefaultCrudRepository<
  Player,
  typeof Player.prototype.id,
  PlayerRelations
> {

  public readonly nationality: BelongsToAccessor<Country, typeof Player.prototype.id>;

  public readonly playerPosition: BelongsToAccessor<PlayerPosition, typeof Player.prototype.id>;

  public readonly team: BelongsToAccessor<Team, typeof Player.prototype.id>;

  public readonly club: BelongsToAccessor<Club, typeof Player.prototype.id>;

  public readonly lineUpPlayers: HasManyRepositoryFactory<LineUpPlayer, typeof Player.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('CountryRepository') protected countryRepositoryGetter: Getter<CountryRepository>, @repository.getter('PlayerPositionRepository') protected playerPositionRepositoryGetter: Getter<PlayerPositionRepository>, @repository.getter('TeamRepository') protected teamRepositoryGetter: Getter<TeamRepository>, @repository.getter('ClubRepository') protected clubRepositoryGetter: Getter<ClubRepository>, @repository.getter('LineUpPlayerRepository') protected lineUpPlayerRepositoryGetter: Getter<LineUpPlayerRepository>,
  ) {
    super(Player, dataSource);
    this.lineUpPlayers = this.createHasManyRepositoryFactoryFor('lineUpPlayers', lineUpPlayerRepositoryGetter,);
    this.club = this.createBelongsToAccessorFor('club', clubRepositoryGetter,);
    this.team = this.createBelongsToAccessorFor('team', teamRepositoryGetter,);
    this.playerPosition = this.createBelongsToAccessorFor('playerPosition', playerPositionRepositoryGetter,);
    this.registerInclusionResolver('playerPosition', this.playerPosition.inclusionResolver);

    this.nationality = this.createBelongsToAccessorFor('nationality', countryRepositoryGetter,);
  }

}
