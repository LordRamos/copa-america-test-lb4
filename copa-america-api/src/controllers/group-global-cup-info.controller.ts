import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Group,
  GlobalCupInfo,
} from '../models';
import {GroupRepository} from '../repositories';

export class GroupGlobalCupInfoController {
  constructor(
    @repository(GroupRepository)
    public groupRepository: GroupRepository,
  ) { }

  @get('/groups/{id}/global-cup-info', {
    responses: {
      '200': {
        description: 'GlobalCupInfo belonging to Group',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(GlobalCupInfo)},
          },
        },
      },
    },
  })
  async getGlobalCupInfo(
    @param.path.number('id') id: typeof Group.prototype.id,
  ): Promise<GlobalCupInfo> {
    return this.groupRepository.globalCupInfo(id);
  }
}
