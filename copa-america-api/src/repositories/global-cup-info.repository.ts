import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Ca2021DataSource} from '../datasources';
import {GlobalCupInfo, GlobalCupInfoRelations} from '../models';

export class GlobalCupInfoRepository extends DefaultCrudRepository<
  GlobalCupInfo,
  typeof GlobalCupInfo.prototype.id,
  GlobalCupInfoRelations
> {
  constructor(
    @inject('datasources.ca2021') dataSource: Ca2021DataSource,
  ) {
    super(GlobalCupInfo, dataSource);
  }
}
