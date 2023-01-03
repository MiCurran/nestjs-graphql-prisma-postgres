import { Field, ArgsType, InputType, PickType } from '@nestjs/graphql';

@InputType()
class PrismaUpdateObj {
    @Field({nullable: true})
    sentAttacks?: number
    @Field({nullable: true})
    hits?: number
    @Field({nullable: true})
    gameId?: number
}

@InputType()
class UpdateArgs {
    @Field()
    idToUpdate: number
    @Field()
    dataToUpdate: PrismaUpdateObj
}
@ArgsType()
export class UpdatePlayerArgs {
  @Field()
  data: UpdateArgs
}

@InputType()
class HitArgs extends PickType(UpdateArgs, ["idToUpdate"] as const) {}

@ArgsType()
export class HitPlayerArgs {
    @Field()
    data: HitArgs
}
