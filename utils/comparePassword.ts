import bcrypt from 'bcrypt';

export const comparePassword = async (password: string, currentPass: string): Promise<boolean> => {
    try {
        const match = await bcrypt.compare(password, currentPass);
        return match;
    } catch (err) {
        throw new Error(`Error comparing passwords: ${err}`);
    }
};
