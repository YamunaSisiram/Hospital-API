import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { findByPhoneNumber, registerUser } from "../repository/user.repository.js"

export const registerDoctor = async(req, res, next) => {
    try{
        console.log(req.body)
        const {name, phoneNumber, password} = req.body;
        if(!password){
            throw new Error('password required')
        }
        const hashedPwd = await bcrypt.hash(password, 12)
        const result = await registerUser({name, phoneNumber, password: hashedPwd, role: 'Doctor'});
        if(result){
            return res.status(201).send('Registration succesfull!')
        }
    }catch(error){
        console.log('error registering user', error)
        console.log(error)
        return res.status(500).json('error registering user');
    }
}

export const loginDoctor = async(req, res, next) => {
    const {phoneNumber, password} = req.body;
    try{
        const user = await findByPhoneNumber(phoneNumber);
        if(!user){
            throw new error('User not found');
        }

        console.log(password, user);
        const result = bcrypt.compare(password, user.password);
        if(!result){
            throw new error('Invalid credentials');
        }

        const token = jwt.sign(
            {_id: user._id},
            'someSecretKey', 
            {
                expiresIn: '1h'
            }
        )

        res.cookie('jwtToken', token, { maxAge: 1 * 60 * 60 * 1000, httpOnly: true })
        .json({"msg": 'Login successful', token})
    }catch(error){
        console.log(error)
        return res.status(500).json('Error');
    }
}