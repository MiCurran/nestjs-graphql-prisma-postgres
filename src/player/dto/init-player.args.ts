import { MinLength } from 'class-validator';
import { Field, ArgsType, InputType } from '@nestjs/graphql';

@InputType()
class InputData {
    @Field()
    @MinLength(2)
    name: string
}
@ArgsType()
export class InitPlayerArgs {
  @Field()
  data: InputData
}