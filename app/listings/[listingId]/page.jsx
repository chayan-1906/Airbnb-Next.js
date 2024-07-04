import getListingById from "@/app/api/actions/getListingById";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import getCurrentUser from "@/app/api/actions/getCurrentUser";
import ListingClient from "@/app/listings/[listingId]/ListingClient";
import getReservations from "@/app/api/actions/getReservations";

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
