import {
  Body,
  Controller,
  Delete,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { WatchListService } from './watch-list.service';
import { WatchListDto } from './dto';
import { JwtAuthGuard } from 'src/guards/jwt-guard';

@Controller('watch-list')
export class WatchListController {
  constructor(private readonly watchListService: WatchListService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  createAsset(@Body() assetDto: WatchListDto, @Req() request) {
    const user = request.user;
    return this.watchListService.createAsset(user, assetDto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteAsset(@Query('id') idAsset: string, @Req() request): Promise<boolean> {
    const { id } = request.body;
    return this.watchListService.deleteAsset(id, idAsset);
  }
}
