import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { PrismaService } from "./prisma/prisma.service";
// import { PrismaModule, loggingMiddleware } from "nestjs-prisma";

@Module({
  imports: [AuthModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
//  PrismaModule.forRoot({
//       isGlobal: true,
//       prismaServiceOptions: {
//         middlewares: [
//           // configure your prisma middleware
//           loggingMiddleware({
//             logger: new Logger("PrismaMiddleware"),
//             logLevel: "log",
//           }),
//         ],
//       },
//     }),
