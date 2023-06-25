import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('v1/auth/signup')
  signup(
    @Body(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    dto: AuthDto,
  ) {
    // console.log({ dto });
    return this.authService.singup(dto);
  }

  @Post('v1/auth/signin')
  signin(@Body() dto: AuthDto) {
    return this.authService.singin(dto);
  }
}
