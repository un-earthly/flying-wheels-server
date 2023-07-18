
interface IData {
    linkedin: string;
    email: string;
    education: string;
    location: string;
    phone: string;
    img: string;
    name: string;
}

export const getUserService = async () => {
    // return await usersCollection.find().toArray();
};

export const getUserByEmailService = async (email: string) => {
    // return await usersCollection.findOne({ email });
};

export const updateUserService = async (data: Partial<IData>) => {
    const { name, email } = data;
    const options = { upsert: true };
    const updateDoc = {
        $set: { email, name }
    };
    // return await usersCollection.updateOne({ email }, updateDoc, options);
};

export const updateProfileService = async (data: IData) => {
    const { linkedin, email, education, location, phone, img, name } = data;
    const options = { upsert: true };
    const updateDoc = {
        $set: { name, email, linkedin, img, phone, location, education }
    };
    // return await usersCollection.updateOne({ email }, updateDoc, options);
};

export const makeAdminService = async (id: string) => {
    const updateDoc = {
        $set: {
            Admin: true
        }
    };
    // const result = await usersCollection.updateOne({ _id: new ObjectId(id) }, updateDoc);
    // return result;
};

export const ReviewService = async (email: string) => {
    // return await reviewsCollection.findOne({ email });
};


export const createUserService = () => {
    return {}
}