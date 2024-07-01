export default async function getListingById(params) {
    console.log(`params inside getListingById - ${JSON.stringify(params)}`);

    try {
        const {listingId} = params;

        const listing = await prisma.listing.findUnique({
            where: {
                id: listingId,
            },
            include: {
                user: true,
            }
        });

        if (!listing) return null;

        return {
            ...listing,
            createdAt: listing.createdAt.toISOString(),
            user: {
                ...listing.user,
                createdAt: listing.user.createdAt.toISOString(),
                updatedAt: listing.user.updatedAt.toISOString(),
                emailVerified: listing.user.emailVerified?.toISOString() || null,
            }
        };
    } catch (e) {
        console.log(`inside catch of getListingById - ${e}`);
        return null;
        // throw new Error(e);
    }
}
