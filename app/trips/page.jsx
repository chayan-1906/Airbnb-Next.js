import getCurrentUser from "@/app/api/actions/getCurrentUser";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import getReservations from "@/app/api/actions/getReservations";
import TripsClient from "@/app/trips/TripsClient";
import {keywords, webClientUrl} from "@/app/api/actions/constants";

export async function generateMetadata({params, searchParams}, parent) {
    let currentUser = await getCurrentUser();
    let reservations = await getReservations({userId: currentUser.id});

    const title = 'Trips';
    const description = '';
    const icons = (await parent).icons ?? {};

    const metadata = {
        title: title,
        description: description,
        url: webClientUrl,
        keywords: keywords,
        type: 'website',
        icons,
        openGraph: {
            title: title,
            description: description,
            url: webClientUrl,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: title,
            description: description,
            url: webClientUrl,
        },
    }

    return metadata;
}

async function TripsPage() {
    let currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState title={'Unauthorized'} subtitle={'Please login'}/>
            </ClientOnly>
        );
    }

    let reservations = await getReservations({userId: currentUser.id});

    if (reservations.length === 0) {
        return (
            <ClientOnly>
                <EmptyState title={'No trips found'} subtitle={'Looks like you haven\'t reserved any trips'}/>
            </ClientOnly>
        );
    }

    // console.log('reservations:', reservations);

    return (
        <ClientOnly>
            <TripsClient reservations={reservations} currentUser={currentUser}/>
        </ClientOnly>
    );
}

export default TripsPage;
