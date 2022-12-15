import { PrismaClient, Prisma } from '@prisma/client' 

const prisma = new PrismaClient()

async function main() {
  console.log(`Start cleaning ...`)
  await prisma.player.deleteMany({})
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
