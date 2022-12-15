import 'reflect-metadata'
import { ObjectType, Field, Int } from '@nestjs/graphql'

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
