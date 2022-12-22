import { MinLength } from 'class-validator';
import { Field, ArgsType, InputType } from '@nestjs/graphql';

@InputType()
class InputData {
    @Field()
    gameId: number
}
@ArgsType()
export class InitPlayerArgs {
  @Field()
  data: InputData
}