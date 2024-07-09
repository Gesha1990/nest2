import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { WatchList } from './model/watchList.model';

@Injectable()
export class WatchListService {
  constructor(
    @InjectModel(WatchList)
    private readonly watchListRepository: typeof WatchList,
  ) {}
  async createAsset(user, dto) {
    const watchList = {
      user: user.id,
      name: dto.name,
      assetId: dto.assetId,
    };
    await this.watchListRepository.create(watchList);
    return watchList;
  }
  async deleteAsset(userId: string, assetId: string): Promise<boolean> {
    await this.watchListRepository.destroy({
      where: {
        id: assetId,
        user: userId,
      },
    });
    return true;
  }
}
