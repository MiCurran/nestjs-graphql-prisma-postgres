import { PrismaClient, Prisma } from '@prisma/client' 

const prisma = new PrismaClient()
const playerData: Prisma.PlayerCreateInput[] = [
  {
    name: 'Ryu',
    health: 10
  },
  {
    name: 'Ken',
    health: 10
  },
  {
    name: 'Chun-Li', 
    health: 10 
  },
]

async function main() {
  console.log(`Start seeding ...`)
  for (const p of playerData) {
    const player = await prisma.player.create({
      data: p,
    })
    console.log(`Created player with id: ${player.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
