import { ObjectId } from "mongodb";
import { usersCollection } from "../db";
import { comparePassword } from "../utils/comparePassword";
import { generateToken } from "../utils/token";
import { ILoginPayload } from "../interface/loginPayload";

export const loginService = async (payload: ILoginPayload): Promise<string> => {
    const user = await usersCollection.findOne({ userName: payload.userName });

    if (user) {
        const matchedPass = await comparePassword(payload.password, user.password);
        if (matchedPass) {
            const token = generateToken({ _id: String(user._id), role: user.role });
            return token;
        } else {
            throw new Error("Invalid password");
        }
    } else {
        throw new Error("Couldn't find user");
    }
};

export const updateUserService = async (data: { email: string, name: string }) => {
    const email = data.email
    const name = data.name
    const options = { upsert: true };
    const updateDoc = {
        $set: {
            email,
            name
        }
    };
    return await usersCollection.updateOne({ email }, updateDoc, options)
}

export const makeAdminService = async (id: string) => {
    const updateDoc = {
        $set: {
            Admin: true
        }
    }
    return await usersCollection.updateOne(
        { _id: new ObjectId(id) },
        updateDoc)
}