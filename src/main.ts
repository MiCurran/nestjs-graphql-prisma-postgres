import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors();
  
  await app.listen(3000, () => {
    console.log(`
🚀 Server ready at: http://localhost:3000/graphql
⭐️ See sample queries in README
`)
  })
}
bootstrap()
