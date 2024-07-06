import getCurrentUser from "@/app/api/actions/getCurrentUser";
import {NextResponse} from "next/server";

export async function DELETE(request, {params}) {
    let currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const {reservationId} = params;

    if (!reservationId || typeof reservationId !== 'string') {
        throw new Error('Invalid ID');
    }

    const reservation = await prisma.reservation.deleteMany({
        where: {
            id: reservationId,
            OR: [
                {userId: currentUser.id},
                {listing: {userId: currentUser.id}},
            ],
        },
    });

    return NextResponse.json(reservation);
}
