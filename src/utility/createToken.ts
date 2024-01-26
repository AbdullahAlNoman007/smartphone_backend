import jwt from 'jsonwebtoken';
import { TjwtPayLoad } from '../Moduler/user/user.interface';


export const createToken = (
    jwtPayLoad: TjwtPayLoad,
    secret: string,
    expiresIn: string,
) => {
    return jwt.sign(jwtPayLoad, secret, { expiresIn });
};
