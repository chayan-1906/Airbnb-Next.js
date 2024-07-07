const prisma = require('../../libs/prismadb');

export default async function getListings(params) {
    const {userId} = params;

    let query = {};

    if (userId) {
        query.userId = userId;
    }

    try {
        const listings = await prisma.listing.findMany({
            where: query,
            orderBy: {
                // createdAt: 'desc'
                title: 'asc',
            }
        });

        return listings.map((listing) => ({
            ...listing,
            createdAt: listing.createdAt.toISOString(),
        }));
    } catch (e) {
        throw new Error(e);
    }
}
