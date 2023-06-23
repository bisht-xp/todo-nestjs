import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('v1/auth/signup')
  signup(@Body(new ValidationPipe()) dto: AuthDto) {
    console.log({dto});
    return this.authService.singup();
  }

  @Post('v1/auth/signin')
  signin() {
    return this.authService.singin();
  }
}
