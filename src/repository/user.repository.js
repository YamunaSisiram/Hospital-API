import { UserModel } from "../schema/user.schema.js";

export const registerUser= async(user)  =>{
    const newUser = new UserModel(user);
    return newUser.save(user);
}

export const findByPhoneNumber = async(phoneNumber) => {
    return await UserModel.findOne({phoneNumber});
}