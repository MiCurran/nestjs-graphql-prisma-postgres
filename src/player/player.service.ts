import { Injectable, Inject } from '@nestjs/common';
import { Player } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PlayerService {
    constructor(private prismaService: PrismaService) {}

    findOne(id: number): Promise<Player> {
       return this.prismaService.player.findFirst({
        where: {
          id: id
        },
      })
    }

   async hitPlayer(data: {player: {id: number}}): Promise<any> {
        let currentHealth = (await this.findOne(data.player.id)).health
          return this.prismaService.player.update({
            where: {
              id: data.player.id,
            },
            data: {
              health: currentHealth - 1
            },
          })
    }
}
