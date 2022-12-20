import { Injectable, Inject } from '@nestjs/common';
import { Player } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePlayerArgs, InitPlayerArgs, HitPlayerArgs } from './dto';

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

    updateOne(dto: UpdatePlayerArgs): Promise<Player> {
        const {dataToUpdate, idToUpdate} = {...dto.data}
        return this.prismaService.player.update({
            where: {
                id: idToUpdate
            },
            data: {
                ...dataToUpdate
            }
        })
    }

    initPlayer(args: InitPlayerArgs): Promise<Player> {
        /// this will get called by the game service
        // an argument will be the gameId to set below
        return this.prismaService.player.create({
            data: {
                ...args.data, 
                gameId: 2, 
            }
        })
    }

    async sendAttack(data: HitPlayerArgs): Promise<Player> {
        const sentAttacks = (await this.findOne(data.data.idToUpdate)).sentAttacks;
        return this.prismaService.player.update({
            where: {
                id: data.data.idToUpdate
            },
            data: {
                sentAttacks: sentAttacks + 1
            }
        })
    }
}