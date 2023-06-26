import NextAuth from "next-auth/next";
import GooogleProvider from 'next-auth/providers/google';
import { ConnectToDb } from "@utils/database";
import User from '@models/user';
console.log({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
})

const handler = NextAuth({
    providers: [
        GooogleProvider({
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET
        })
    ],
    session: async ({ session }) => {
        const sessionUser = await User.findOne({email: session.user.email});
        session.user.id = sessionUser._id.toString();
        return session;
    },
    signIn: async ({ profile }) => {
        try {
            await ConnectToDb();
            const userExists = await User.findOne({email: profile.email});
            if (!userExists) {
                const user = new User({
                    username: profile.name.replace(" ", "").toLowerCase(),
                    email: profile.email,
                    image: profile.picture
                })
            }
        }catch(error){
            console.log(error)
            return false;
        }
    }
});
export { handler as GET, handler as POST };