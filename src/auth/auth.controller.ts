import { Body, Controller, Post, Request, Response } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  login(@Body() dto: LoginDto, @Request() req, @Response() res) {
    return this.authService.login(dto, req, res);
  }
  @Post("register")
  register(@Body() dto: RegisterDto, @Request() req, @Response() res) {
    return this.authService.register(dto, req, res);
  }
}
