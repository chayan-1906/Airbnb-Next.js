import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import getFavoriteListings from "@/app/api/actions/getFavoriteListings";
import getCurrentUser from "@/app/api/actions/getCurrentUser";
import FavoritesClient from "@/app/favorites/FavoritesClient";

async function FavoritesPage() {
    let favoriteListings = await getFavoriteListings();
    let currentUser = await getCurrentUser();

    if (favoriteListings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState title={'No favorites found'} subtitle={'Looks like you have no favorite listings'}/>
            </ClientOnly>
        );
    }

    return (
        <ClientOnly>
            <FavoritesClient favoriteListings={favoriteListings} currentUser={currentUser}/>
        </ClientOnly>
    );
}

export default FavoritesPage;
