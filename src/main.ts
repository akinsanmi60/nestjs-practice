import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  // enable shutdown hook
  app.enableShutdownHooks();

 

  const config = new DocumentBuilder()
    .setTitle("Cats example")
    .setDescription("The pentrar API description")
    .setVersion("1.0")
    .addTag("pentrar")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.listen(5000);
}
bootstrap();
