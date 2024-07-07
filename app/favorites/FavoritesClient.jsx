import Container from "@/app/components/navbar/Container";
import Heading from "@/app/components/Heading";
import ListingCard from "@/app/components/listings/ListingCard";

function FavoritesClient({favoriteListings, currentUser}) {
    return (
        <Container>
            <Heading title={'Favorites'} subtitle={'List of places you have in favorites!'}/>
            <div className={'mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'}>
                {
                    favoriteListings.map((favListing) => (
                        <ListingCard
                            key={favListing.id}
                            listing={favListing}
                            currentUser={currentUser}
                        />
                    ))
                }
            </div>
        </Container>
    );
}

export default FavoritesClient;
