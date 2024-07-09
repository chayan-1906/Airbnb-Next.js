const prisma = require('../../libs/prismadb');

export default async function getListings(params) {
    const {userId, guestCount, roomCount, bathroomCount, startDate, endDate, locationValue, category} = params;

    let query = {};

    if (userId) {
        query.userId = userId;
    }

    if (category) {
        query.category = category;
    }

    if (guestCount) {
        query.guestCount = {
            gte: +guestCount
        }
    }

    if (roomCount) {
        query.roomCount = {
            gte: +roomCount
        }
    }

    if (bathroomCount) {
        query.bathroomCount = {
            gte: +bathroomCount
        };
    }

    if (locationValue) {
        query.locationValue = locationValue;
    }

    if (startDate && endDate) {
        query.NOT = {
            reservations: {
                some: {
                    OR: [
                        {
                            endDate: {gte: startDate},
                            startDate: {lte: startDate},
                        },
                        {
                            startDate: {lte: endDate},
                            endDate: {gte: endDate},
                        },
                    ]
                }
            }
        }
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
