import { NestFactory } from '@nestjs/core';
import { ProductModule } from './product.module';

async function bootstrap() {
  const app = await NestFactory.create(ProductModule);
  app.enableCors({
    origin: 'http://localhost:3000',
  });
  await app.listen(8080);
}
bootstrap();
