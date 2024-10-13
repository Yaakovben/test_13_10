import { Request } from 'express';

interface NewUserDto {
    user_name: string;
    password: string;
    email: string;
    class_name: string;
}

interface LoginDto {
    user_name: string;
    password: string;
}

interface gradeDto {
    title: string
    score: number
}


interface RequestWithToken extends Request {
    user?: {
      userId: string;
      role: string;
    };
  }
export {NewUserDto, gradeDto, RequestWithToken, LoginDto}