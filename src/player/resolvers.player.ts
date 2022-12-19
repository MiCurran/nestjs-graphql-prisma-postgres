import 'reflect-metadata'
import {
  Resolver,
  Query,
  Mutation,
  Args,
  InputType,
  Field,
} from '@nestjs/graphql'
import { Player } from './player'
import { PlayerService } from './player.service'

@InputType()
class PlayerEditInput {
  @Field()
  id: number
}

@Resolver(Player)
export class PlayerResolver {
  constructor(
    private playerService: PlayerService
    ) {}

@Query((returns) => Player)
  async findPlayer(id: number): Promise<Player> {
    return await this.playerService.findOne(id)
  }


  @Mutation((returns) => Player)
  async hitPlayer(
    @Args('data') data: PlayerEditInput,
  ): Promise<Player> {
    return await this.playerService.hitPlayer({...data})
  }

  @Mutation((returns) => Player)
  async sendAttack(
    @Args('data') data: PlayerEditInput,
  ): Promise<Player> {
    return await this.playerService.sendAttack({...data})
  }

}
