import {Nunito} from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/navbar/Navbar";
import ClientOnly from "@/app/components/ClientOnly";
import RegisterModal from "@/app/components/modals/RegisterModal";
import ToasterProvider from "@/app/providers/ToasterProvider";
import LoginModal from "@/app/components/modals/LoginModal";
import getCurrentUser from "@/app/api/actions/getCurrentUser";
import RentModal from "@/app/components/modals/RentModal";
import SearchModal from "@/app/components/modals/SearchModal";

const nunito = Nunito({subsets: ["latin"]});

export const metadata = {
    // title: 'Airbnb | Holiday rentals, cabins, beach houses & more',
    title: {
        absolute: '',
        default: 'Airbnb | Holiday rentals, cabins, beach houses & more',
        template: '%s | Airbnb',
    },
    description: 'Holiday rentals, cabins, beach houses & more',
}

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
            <SearchModal/>
            <RentModal/>
            <Navbar currentUser={currentUser}/>
        </ClientOnly>
        <div className={'pb-20 pt-28'}>
            {children}
        </div>
        </body>
        </html>
    );
}

export default RootLayout;
