import { Module } from '@nestjs/common';
import { HttpModule } from './users/infrastructure/http/http.module';

import { ConfigModule } from '@nestjs/config';
import { envSchema } from './users/infrastructure/config/env';

@Module({
  imports: [ConfigModule.forRoot({
    validate: (env) => envSchema.parse(env),
    isGlobal: true, 
  }), HttpModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
