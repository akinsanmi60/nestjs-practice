import { ApiProperty } from "@nestjs/swagger";
import { IsAlpha, IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class LoginDto {
  @ApiProperty()
  @IsEmail({}, { message: "Please provide a valid email address." })
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNotEmpty({ message: "Password cannot be empty." })
  @MinLength(8, { message: "Password must be at least 8 characters long." })
  password: string;
}

export class RegisterDto {
  @ApiProperty()
  @IsEmail({}, { message: "Please provide a valid email address." })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: "Password cannot be empty." })
  @MinLength(8, { message: "Password must be at least 8 characters long." })
  password: string;

  @ApiProperty()
  @IsNotEmpty({ message: "First name cannot be empty." })
  @IsAlpha()
  first_name?: string;

  @ApiProperty()
  @IsNotEmpty({ message: "Last name cannot be empty." })
  @IsAlpha()
  last_name?: string;

  @ApiProperty()
  @IsNotEmpty({ message: "Role cannot be empty." })
  @IsAlpha()
  role: string;
}
