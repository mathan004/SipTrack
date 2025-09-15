import { Controller } from '@nestjs/common';
import { Post,Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/create-auth.dto';



@Controller('/api/auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }
    
    
    
    
    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        const user = await this.authService.validateUser(loginDto.email, loginDto.password);
         return this.authService.login(user);
  }
}


