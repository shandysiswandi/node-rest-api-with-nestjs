import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

// login payload
export class LoginPayload {
  @IsNotEmpty()
  login: string;

  @IsNotEmpty()
  password: string;
}

// register payload
export class RegisterPayload {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  username: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;
}
