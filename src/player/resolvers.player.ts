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
  // this should call the game service to roll an attack and 
  // or should send attack just be a frontend function
  // so we click button --send Attack to server--> will have a from player param ---> roll attack on server 
  async sendAttack(
    @Args() args: HitPlayerArgs,
  ): Promise<Player> {
    return await this.playerService.sendAttack({...args})
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

  @Mutation((returns) => Player)
  async setPlayerActive(
    @Args('id') id: number
    ): Promise<Player> {
    return await this.playerService.togglePlayerActive(id)
  }

}
