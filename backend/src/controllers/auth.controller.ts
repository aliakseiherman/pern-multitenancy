import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import * as passwordHelper from '../helpers/password.helper';
import TenantService from '../services/tenant.service';
import { jwt as jwtConfig } from '../config.json';
import { knex } from '../database';
import UserService from '../services/user.service';

class AuthController {
  public tenantService: TenantService = new TenantService();
  public userService: UserService = new UserService();

  public logIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { username, password, rememberMe } = req.body;

      let user = await this.userService.getByName(username);

      if (!user) {
        res.sendStatus(401);
        return;
      }

      if (passwordHelper.isMatched(password, user.salt, user.password)) {

        let tenant = await this.tenantService.getTenantBySubdomain(req.headers.origin);

        let expiresIn = rememberMe ? '7d' : '20m';

        const token = jwt.sign(
          { userId: user.id, tenantId: tenant.id },
          jwtConfig.secret,
          { expiresIn }
        );

        res.json({ token });

      } else {
        res.sendStatus(401);
      }
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;