import getListingById from "@/app/api/actions/getListingById";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import getCurrentUser from "@/app/api/actions/getCurrentUser";
import ListingClient from "@/app/listings/[listingId]/ListingClient";
import getReservations from "@/app/api/actions/getReservations";
import {keywords, webClientUrl} from "@/app/api/actions/constants";

export async function generateMetadata({params, searchParams}, parent) {
    let listing = await getListingById(params);

    const title = listing?.title;
    const description = listing?.description;
    const imageUrl = listing?.imageSrc;
    const imageAlt = `${listing?.title}-image`;
    const icons = (await parent).icons ?? {};

    const metadata = {
        title: title,
        description: description,
        image: {url: imageUrl, alt: imageAlt},
        url: webClientUrl,
        keywords: keywords,
        type: 'website',
        icons,
        openGraph: {
            title: title,
            description: description,
            images: [
                {
                    url: imageUrl,
                    alt: imageAlt,
                    width: 800,
                    height: 600,
                },
            ],
            url: webClientUrl,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: title,
            description: description,
            images: [
                {
                    url: imageUrl,
                    alt: imageAlt,
                },
            ],
            url: webClientUrl,
        },

    }

    return metadata;
}

async function ListingPage({params}) {
    let listing = await getListingById(params);
    let reservations = await getReservations(params);
    let currentUser = await getCurrentUser();

    if (!listing) {
        return (
            <ClientOnly>
                <EmptyState/>
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <ListingClient listing={listing} currentUser={currentUser} reservations={reservations}/>
        </ClientOnly>
    );
}

export default ListingPage;
