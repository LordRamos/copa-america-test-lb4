import { inject, Getter } from '@loopback/core';
import { DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor } from '@loopback/repository';
import { DbDataSource } from '../datasources';
import { Group, GroupRelations, Team, GlobalCupInfo } from '../models';
import { TeamRepository } from './team.repository';
import { GlobalCupInfoRepository } from './global-cup-info.repository';

export class GroupRepository extends DefaultCrudRepository<
  Group,
  typeof Group.prototype.id,
  GroupRelations
> {

  public readonly teams: HasManyRepositoryFactory<Team, typeof Group.prototype.id>;

  public readonly globalCupInfo: BelongsToAccessor<GlobalCupInfo, typeof Group.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('TeamRepository') protected teamRepositoryGetter: Getter<TeamRepository>, @repository.getter('GlobalCupInfoRepository') protected globalCupInfoRepositoryGetter: Getter<GlobalCupInfoRepository>,
  ) {
    super(Group, dataSource);
    this.globalCupInfo = this.createBelongsToAccessorFor('globalCupInfo', globalCupInfoRepositoryGetter,);
    this.teams = this.createHasManyRepositoryFactoryFor('teams', teamRepositoryGetter,);
    this.registerInclusionResolver('teams', this.teams.inclusionResolver);

  }
}
