import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from 'src/modules/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import configurations from 'src/configurations';
import { User } from 'src/modules/user/models/user.model';
import { AuthModule } from 'src/modules/auth/auth.module';
import { TokenModule } from 'src/token/token.module';
import { WatchListModule } from 'src/modules/watch-list/watch-list.module';
import { WatchList } from 'src/modules/watch-list/model/watchList.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configurations],
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get('db_host'),
        port: configService.get('db_port'),
        username: configService.get('db_user'),
        password: configService.get('db_password'),
        database: configService.get('db_name'),
        synchronize: true,
        autoLoadModels: true,
        models: [User, WatchList],
      }),
    }),
    UserModule,
    AuthModule,
    TokenModule,
    WatchListModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
