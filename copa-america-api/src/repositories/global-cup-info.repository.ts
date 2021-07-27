import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {GlobalCupInfo, GlobalCupInfoRelations} from '../models';

export class GlobalCupInfoRepository extends DefaultCrudRepository<
  GlobalCupInfo,
  typeof GlobalCupInfo.prototype.id,
  GlobalCupInfoRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(GlobalCupInfo, dataSource);
  }
}
