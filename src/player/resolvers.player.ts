import 'reflect-metadata'
import {
  Resolver,
  Query,
  Mutation,
  Args,
  InputType,
  Field,
} from '@nestjs/graphql'
import { Inject } from '@nestjs/common'
import { Player } from './player'
import { PrismaService } from '../prisma/prisma.service'

@InputType()
class PlayerC {
  @Field()
  id: number
  @Field()
  name: string
}

@InputType()
class PlayerEditInput {
  @Field()
  player: PlayerC
}

@Resolver(Player)
export class PlayerResolver {
  //could we also use the player service so we can store business logic there
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

@Query((returns) => Player)
  initializePlayer(id: number): any {
    const result = this.prismaService.player.findFirst({
        where: {
          id: id
        },
      })
    return result
  }


  @Mutation((returns) => Player)
  async hitPlayer(
    @Args('data') data: PlayerEditInput,
  ): Promise<Player> {
    // --TODO-- Extract logic to service?
    let currentHealth = (await this.prismaService.player.findFirst({
      where: {
        id: data.player.id
      }
    })).health
    return this.prismaService.player.update({
      where: {
        id: data.player.id,
      },
      data: {
        health: currentHealth - 1
      },
    })
  }
}
