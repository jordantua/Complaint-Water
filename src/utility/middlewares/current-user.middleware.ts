import { Injectable, NestMiddleware } from '@nestjs/common';
import { isArray } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { UserEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

declare global {
  namespace Express{
    interface Request{
      currentUser?:UserEntity;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private readonly usersService:UsersService){}
  // constructor(private readonly usersService:UsersService){}
  
  async use(req: Request, res: Response, next: NextFunction) {
    // console.log(req);
    // next();

    const authHeader = req.headers.authorization || req.headers.Authorization;
    if(!authHeader || isArray(authHeader) || !authHeader.startsWith('Bearer ')){
      req.currentUser = null;
      // console.log(authHeader);
      next();
      return;
    }else {
      try{
        const token = authHeader.split(' ')[1];
        // console.log(token);
        // next();

        const {id} = <JwtPayLoad>verify(token,process.env.ACCESS_TOKEN_SECRET_KEY);
        const currentUser = await this.usersService.findOne(+id);
        req.currentUser=currentUser;
        // console.log(currentUser);
      next();
      }catch(err){
        req.currentUser = null;
        // console.log(authHeader);
        next();
      }
    }
  }
}

interface JwtPayLoad{
  username:string,
  id: number;
}