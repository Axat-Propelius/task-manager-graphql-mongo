import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { seedDevDatabase } from './seed.dev.service';
import { seedTestDatabase } from './seed.test.service';

async function bootstrap() {
  // Determine the service to use based on NODE_ENV
  const env = process.argv[2] || 'development';

  if (env === 'development') {
    await seedDevDatabase();
  } else if (env === 'test') {
    await seedTestDatabase();
  } else if (env === 'production') {
    console.log('Seeding is disabled in production environment.');
  } else {
    console.error(
      'Unknown environment. Pass valid environment in argument : development, test or production.',
    );
    process.exit(1);
  }
}

bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
