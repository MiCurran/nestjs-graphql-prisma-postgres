import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { PrismaService } from './prisma/prisma.service'
import { PlayerResolver } from './player/resolvers.player'
import { join } from 'path'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { PlayerModule } from './player/player.module';
import { AppService } from './app.service'
import { AppController } from './app.controller'
import { AppResolver } from './resolvers.app'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      buildSchemaOptions: { dateScalarMode: 'timestamp' },
    }),
    PlayerModule,
  ],
  controllers: [AppController],
  providers: [PrismaService, PlayerResolver, AppResolver, AppService],
})
export class AppModule {}
