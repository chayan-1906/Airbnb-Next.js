import {Nunito} from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/navbar/Navbar";
import ClientOnly from "@/app/components/ClientOnly";
import RegisterModal from "@/app/components/modals/RegisterModal";
import ToasterProvider from "@/app/providers/ToasterProvider";
import LoginModal from "@/app/components/modals/LoginModal";
import getCurrentUser, {fetchFromWindow} from "@/app/api/actions/getCurrentUser";
import RentModal from "@/app/components/modals/RentModal";

const nunito = Nunito({subsets: ["latin"]});

export const metadata = {
    title: 'Airbnb',
    description: 'Holiday rentals, cabins, beach houses & more',
};

async function RootLayout({children}) {
    const currentUser = await getCurrentUser();
    console.log(`currentUser - ${JSON.stringify(currentUser)}`);

    return (
        <html lang="en">
        <body className={nunito.className}>
        <ClientOnly>
            <ToasterProvider/>
            <LoginModal/>
            <RegisterModal/>
            <RentModal/>
            <Navbar currentUser={currentUser}/>
        </ClientOnly>
        {children}
        </body>
        </html>
    );
}

export default RootLayout;
