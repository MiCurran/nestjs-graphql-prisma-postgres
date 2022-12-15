// import { Injectable, OnModuleInit, INestApplication, Global } from '@nestjs/common'
// import { PrismaClient } from '@prisma/client'

// @Global()
// @Injectable()
// export class PrismaService extends PrismaClient implements OnModuleInit {
//   async onModuleInit() {
//     await this.$connect()
//   }

//   async enableShutdownHooks(app: INestApplication) {
//     this.$on('beforeExit', async () => {
//       await app.close()
//     })
//   }
// }

import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super();
  }
}