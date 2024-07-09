import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { WatchList } from 'src/modules/watch-list/model/watchList.model';

@Table
export class User extends Model {
  @Column
  firstName: string;
  @Column
  userName: string;
  @Column
  email: string;
  @Column
  password: string;
  @HasMany((): any => WatchList, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  watchList: WatchList[];
}
