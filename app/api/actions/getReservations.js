import prisma from '../../libs/prismadb';

async function getReservations(params) {
    try {
        const {listingId, userId, authorId} = params;

        const query = {};

        if (listingId) {
            query.listingId = listingId;
        }

        if (userId) {
            query.userId = userId;
        }

        if (authorId) {
            query.listing = {userId: authorId}
        }

        const reservations = await prisma.reservation.findMany({
            where: query,
            include: {
                listing: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        const safeReservation = reservations.map((reservation) => ({
            ...reservation,
            createdAt: reservation.createdAt.toISOString(),
            startDate: reservation.startDate.toISOString(),
            endDate: reservation.endDate.toISOString(),
            listing: {
                ...reservation,
                createdAt: reservation.listing.createdAt.toISOString(),
            }
        }))

        return safeReservation;
    } catch (e) {
        throw new Error(e);
    }
}

export default getReservations;
