import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, MongooseError } from 'mongoose';
import { User } from 'src/model/user.model';
import { AuthDto } from './dto';
import * as argon2 from 'argon2';
import { generateAccessToken } from 'src/utils/jwt';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async singup(dto: AuthDto) {
    //generate new password hash
    const hash = await argon2.hash(dto.password);
    try {
      //save new user into db
      let newUser = await this.userModel.create({
        email: dto.email,
        password: hash,
      });
      //return the new user
      newUser = await newUser.save();
      delete newUser.password;
      return {
        success: true,
        message: 'Successfully created!',
        newUser,
      };
    } catch (error) {
      if (error.code === 11000) {
        throw new ForbiddenException('User Already Exist!!');
      }
      throw error;
    }
  }

  async singin(dto: AuthDto) {
    try {
      //Check the user by email
      let user = await this.userModel.findOne({ email: dto.email });

      //If user does not exist throw error
      if (!user) {
        throw new ForbiddenException('User does not exist!!');
      }
      //Compare password and if password is incorre  ct throw error
      if (!(await argon2.verify(user.password, dto.password))) {
        throw new ForbiddenException('Email and password does not match!');
      }

      const jwt = await generateAccessToken({
        userId: user.id,
      });

      //If All good return user
      return {
        status: true,
        message: 'Successful Login',
        access_token: jwt,
      };
    } catch (error) {
      throw error;
    }
  }
}
