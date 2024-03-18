import jwt from "jsonwebtoken";

interface UserInfo {
    email: string;
    name: string;
}

export const signToken = (userInfo: UserInfo): string => {
    const { email, name } = userInfo;
    const token = jwt.sign(
        {
            email,
            name,
        },
        "secret",
        { expiresIn: "1h" }
    );
    return token;
};

export const verify = (token: string): UserInfo | null => {
    try {
        const decoded = jwt.verify(token, "secret") as UserInfo;
        return decoded;
    } catch (err) {
        console.error("Error verifying token:", err);
        return null;
    }
};