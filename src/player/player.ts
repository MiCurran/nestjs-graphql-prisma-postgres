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

  @Field()
  name: string

  @Field((type) => Int)
  gameId: number

  @Field((type) => Boolean)
  isActive: boolean

  @Field((type) => Int)
  sentAttacks: number

}
