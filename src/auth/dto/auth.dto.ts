import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MinLength(8, { message: 'Too short, must contain 8 character' })
  @MaxLength(20, { message: 'Too Long, password must be under 20 character' })
  @IsNotEmpty()
  @Matches(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*])(?!.*\s).{8,}$/,
    {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one numeric digit, and one special character.',
    },
  )
  password: string;
}
