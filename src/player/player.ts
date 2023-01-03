import 'reflect-metadata'
import { ObjectType, Field, Int, Mutation } from '@nestjs/graphql'

@ObjectType()
export class Player {
  @Field((type) => Int)
  id: number

  @Field((type) => Date)
  createdAt: Date

  @Field((type) => Date)
  updatedAt: Date

  @Field((type) => Int)
  gameId: number

  @Field((type) => Int)
  sentAttacks: number

  @Field((type) => Int)
  hits: number

}
