import ClientOnly from "@/app/components/ClientOnly";
import Container from "@/app/components/navbar/Container";
import EmptyState from "@/app/components/EmptyState";
import getListings from "@/app/api/actions/getListings";
import ListingCard from "@/app/components/listings/ListingCard";
import getCurrentUser from "@/app/api/actions/getCurrentUser";

async function Home({searchParams}) {
    let listings = await getListings(searchParams);
    let currentUser = await getCurrentUser();

    if (listings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState showReset/>
            </ClientOnly>
        );
    }

    return (
        <ClientOnly>
            <Container>
                <div className={'pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'}>
                    {/*<div>*/}
                        {listings.map((listing) => (
                            <ListingCard key={listing.id} listing={listing} currentUser={currentUser}/>
                        ))}
                    {/*</div>*/}
                </div>
            </Container>
        </ClientOnly>
    );
}

export default Home;
