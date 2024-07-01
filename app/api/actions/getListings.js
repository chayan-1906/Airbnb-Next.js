export default async function getListings() {
    try {
        const listings = await prisma.listing.findMany({
            orderBy: {createdAt: 'desc'}
        });

        return listings.map((listing) => ({
            ...listing,
            createdAt: listing.createdAt.toISOString(),
        }));
    } catch (e) {
        throw new Error(e);
    }
}
