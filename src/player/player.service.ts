import { Injectable, Logger } from '@nestjs/common';
import { Player } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { isGameActive } from 'src/utils';
import { UpdatePlayerArgs, InitPlayerArgs } from './dto';

@Injectable()
export class PlayerService {
    constructor(private prismaService: PrismaService) {}
    private readonly logger = new Logger('logger')

    findOne(id: number): Promise<Player> {
       this.logger.log(`Server Queried: finding one player with id: ${id}`)
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
        return this.prismaService.player.create({
            data: {
                ...args.data, 
            }
        })
    }

    rollDoesAttackHit(): boolean {
        return Math.random() < 0.5;
    }
      
    async sendAttack(id: number): Promise<Player> {
        const playerCurrent = (await this.findOne(id));
        let updatedPlayer = playerCurrent
        if (await isGameActive(playerCurrent.gameId) === true) {
            const doesHit = this.rollDoesAttackHit()
            if (doesHit === true) {
                //attack hit increment sentAttacks and hits
                const dataToUpdate = {
                    sentAttacks: playerCurrent.sentAttacks + 1, 
                    hits: playerCurrent.hits + 1 
                }
                const dto = {data: {idToUpdate: id, dataToUpdate: dataToUpdate}}
                updatedPlayer = await this.updateOne(dto);
            } else {
                // attack missed just increment sentAttacks
                const dataToUpdate = {
                    sentAttacks: playerCurrent.sentAttacks + 1, 
                }
                const dto = {data: {idToUpdate: id, dataToUpdate: dataToUpdate}}
                updatedPlayer = await this.updateOne(dto);
            }
        }
        return updatedPlayer
   }
}