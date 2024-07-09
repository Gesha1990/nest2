import { Module } from '@nestjs/common';
import { WatchListController } from './watch-list.controller';
import { WatchListService } from './watch-list.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { WatchList } from './model/watchList.model';

@Module({
  imports: [SequelizeModule.forFeature([WatchList])],
  controllers: [WatchListController],
  providers: [WatchListService],
})
export class WatchListModule {}
