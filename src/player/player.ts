import 'reflect-metadata'
import { ObjectType, Field, Int, Mutation } from '@nestjs/graphql'

//if possible we want this file to be auto-generated?

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

  @Field((type) => Number)
  health: number
}
