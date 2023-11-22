import { Module, Global } from "@nestjs/common";
import { PrismaService } from "./prisma.service";

@Global() //this will prevent import the primsa every time. This will make it available globally
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
