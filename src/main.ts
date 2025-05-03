import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService)

  const config = new DocumentBuilder()
    .setTitle('Bem-vindo à documentação da API de autenticação! Aqui você pode testar os endpoints da API.\n\n' +
      '**Informações importantes:**\n' +
      '- Já existe um usuário administrador cadastrado. Use o endpoint /login para autenticar-se como administrador.\n' +
      '- Você pode criar um usuário comum utilizando o endpoint /create/users e, em seguida, fazer login com ele.\n\n' +
      '**Passos para usar o Swagger:**\n' +
      '1. Realize o login utilizando o endpoint /login para obter um token JWT.\n' +
      '2. Clique no botão **Authorize** no canto superior direito da interface do Swagger.\n' +
      '3. Insira o token JWT.\n' +
      '4. Após autorizado, você poderá testar as rotas protegidas.')
    .setVersion('1.0')
    .addTag('users')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = configService.get('PORT')
  await app.listen(port);
}
bootstrap();
