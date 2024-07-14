import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SanitizeMiddleware } from './MiddleWare/sanitizedMiddleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });

  app.use(new SanitizeMiddleware().use);
  await app.listen(3000);
}
bootstrap();
