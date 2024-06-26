import {getServerSession} from "next-auth/next";
import {authOptions} from "@/pages/api/auth/[...nextauth]";

async function getSession() {
    console.log('getSession called');
    return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
    console.log('getCurrentUser called');
    try {
        const session = await getSession();

        if (!session?.user?.email) {
            return null;
        }

        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email
            }
        });

        if (!currentUser) {
            return null;
        }

        // console.log(`current user inside getCurrentUser - ${JSON.stringify(currentUser)}`);
        return {
            ...currentUser,
            createdAt: currentUser.createdAt.toISOString(),
            updatedAt: currentUser.updatedAt.toISOString(),
            emailVerified: currentUser.emailVerified?.toISOString() || null,
        };
    } catch (error) {
        return null;
    }
}
