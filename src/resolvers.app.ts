import 'reflect-metadata'
import {
  Resolver,
  Query,
  Mutation,
  Args,
  InputType,
  Field,
} from '@nestjs/graphql'
import { Inject } from '@nestjs/common'


@Resolver(AppResolver)
export class AppResolver {

  @Query(() => String)
  sayHello(): string {
    return 'Hello from graphql in nestjs';
  }
}
