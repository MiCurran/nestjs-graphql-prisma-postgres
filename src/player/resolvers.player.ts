import 'reflect-metadata'
import {
  Resolver,
  Query,
  Mutation,
  Args,
} from '@nestjs/graphql'
import { Player } from './player'
import { PlayerService } from './player.service'
import { HitPlayerArgs, InitPlayerArgs, UpdatePlayerArgs } from './dto/'

@Resolver(Player)
export class PlayerResolver {
  constructor(
    private playerService: PlayerService
    ) {}

@Query((returns) => Player)
  async findPlayer(
    @Args('id') id: number
    ): Promise<Player> {
    return await this.playerService.findOne(id)
  }

  @Mutation((returns) => Player)
  async updateOne(
    @Args() args: UpdatePlayerArgs
    ): Promise<Player> {
    return await this.playerService.updateOne({...args})
  }

  @Mutation((returns) => Player)
  async initPlayer(
    @Args() args: InitPlayerArgs
  ): Promise<Player> {
    return await this.playerService.initPlayer({...args})
  }


}
