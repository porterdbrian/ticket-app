import express, { Request, Response} from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import {validateRequest} from '../middlewares/validate-request';
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';
import {Password} from '../utils/password';

const router = express.Router();

router.post('/api/users/signin', 
    [
        body('email')
            .isEmail()
            .withMessage('Email must be valid.'),
        body('password')
            .trim()
            .notEmpty()
            .withMessage('You must supply a password.')
    ]
    , 
    validateRequest,
    async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const existingUser = await User.findOne({email: email});
        if (!existingUser) {
            console.log('No existingUser')
            throw new BadRequestError('Invalid credentials.');
        }

        const passwordsMatch = await Password.compare(
            existingUser.password, 
            password
        );
        if (!passwordsMatch) {
            console.log('Password mismatch')
            throw new BadRequestError('Invalid credentials.');
        }

        //  Generate jwt
        const userJwt = jwt.sign({
            id: existingUser.id,
            email: existingUser.email
        }, process.env.JWT_KEY!
        );

        // Store in session object
        req.session = {
            jwt: userJwt
        };

        res.status(200).send(existingUser);
    }
);

export { router as signinRouter };