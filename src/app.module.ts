import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { FightersModule } from './fighters/fighters.module';
import { EventsModule } from './events/events.module';
import { FightsModule } from './fights/fights.module';
import { RankingsModule } from './rankings/rankings.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'mma',
      autoLoadEntities: true,
      synchronize: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
    }),
    FightersModule,
    EventsModule,
    FightsModule,
    RankingsModule,
  ],
})
export class AppModule {}
