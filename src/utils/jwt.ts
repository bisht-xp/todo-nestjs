import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config()

export const EXPIRATION_TIME = '15m';

export const generateAccessToken = (data: {
  email?: string;
  address?: string;
  userId: string;
}) => {
  const jwtPayload = {
    email: data.email ? data.email : '',
    address: data.address ? data.address : '',
    userId: data.userId,
  };

  return jwt.sign(jwtPayload, process.env.JWT_SECRET_KEY, {
    expiresIn: EXPIRATION_TIME,
  });
};

export const verifyAccessToken = async (token: string) => {
  try {
    const data = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (data) {
      return data;
    }
    return null;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
