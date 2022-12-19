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

   async hitPlayer(data: {id: number}): Promise<any> {
        let currentHealth = (await this.findOne(data.id)).health
          return this.prismaService.player.update({
            where: {
              id: data.id,
            },
            data: {
              health: currentHealth - 1
            },
          })
    }

    async sendAttack(data: {id: number}): Promise<Player> {
        const sentAttacks = (await this.findOne(data.id)).sentAttacks;
        return this.prismaService.player.update({
            where: {
                id: data.id
            },
            data: {
                sentAttacks: sentAttacks + 1
            }
        })
    }
}