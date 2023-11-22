import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { LoginDto, RegisterDto } from "./dto/auth.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import { Role } from "@prisma/client";

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) { }

    async hashPassword(password: string) {
        const saltOrRounds = 10;

        return await bcrypt.hash(password, saltOrRounds);
    }

    async comparePasswords(args: { hash: string; password: string }) {
        return await bcrypt.compare(args.password, args.hash);
    }

    async signToken(args: { userId: string; email: string }) {
        const payload = {
            id: args.userId,
            email: args.email,
        };

        // const token = await this.jwt.signAsync(payload, {
        //   secret: jwtSecret,
        // });

        return payload;
    }

    async login(dto: LoginDto, req: Request, res: Response) {
        const { email, password } = dto;

        const foundUser = await this.prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (!foundUser) {
            throw new BadRequestException("Wrong credentials");
        }

        const compareSuccess = await this.comparePasswords({
            password,
            hash: foundUser.password,
        });

        if (!compareSuccess) {
            throw new BadRequestException("Wrong credentials");
        }

        const token = await this.signToken({
            userId: foundUser.id,
            email: foundUser.email,
        });

        if (!token) {
            throw new ForbiddenException("Could not signin");
        }

        res.cookie("token", token, {});

        return res.send({ message: "Logged in succefully" });
    }

    async register(dto: RegisterDto, req: Request, res: Response) {
        const { email, password, first_name, role, last_name } = req.body as typeof dto;
        console.log(req.body)

        await this.createUserIfNotExists(email, password, first_name, role, last_name);

        res.status(200).json({ message: "User created succefully" })
    }

    private async createUserIfNotExists(email: string, password: string, first_name: string, role: string, last_name: string) {
        const userExists = await this.prisma.user.findUnique({
            where: { email },
        });

        if (userExists) {
            throw new BadRequestException("Email already exists");
        }

        const hashedPassword = await this.hashPassword(password);

        await this.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                first_name,
                role: Role[role as keyof typeof Role],
                last_name,
            },
        });
    }
}