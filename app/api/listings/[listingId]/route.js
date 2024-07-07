import getCurrentUser from "@/app/api/actions/getCurrentUser";
import {NextResponse} from "next/server";

export async function DELETE(request, {params}) {
    let currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const {listingId} = params;

    if (!listingId || typeof listingId !== 'string') {
        throw new Error('Invalid ID');
    }

    const listing = await prisma.listing.deleteMany({
        where: {
            id: listingId,
            userId: currentUser.id,
        }
    });

    return NextResponse.json(listing);
}
