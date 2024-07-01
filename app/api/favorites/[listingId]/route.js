import getCurrentUser from "@/app/api/actions/getCurrentUser";
import {NextResponse} from "next/server";

export async function POST(request, {params}) {
    let currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const {listingId} = params;

    if (!listingId || typeof listingId !== 'string') {
        throw new Error(`Invalid ID - ${listingId}`);
    }

    let favoriteIds = [...(currentUser.favoriteIds || [])];

    favoriteIds.push(listingId);

    const user = await prisma.user.update({
        where: {
            id: currentUser.id,
        },
        data: {
            favoriteIds,
        }
    });

    return NextResponse.json(user);
}

export async function DELETE(request, {params}) {
    let currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const {listingId} = params;

    if (!listingId || typeof listingId !== 'string') {
        throw new Error(`Invalid ID - ${listingId}`);
    }

    let favoriteIds = [...(currentUser.favoriteIds || [])];

    favoriteIds = favoriteIds.filter((id) => id !== listingId);

    const user = await prisma.user.update({
        where: {
            id: currentUser.id,
        },
        data: {
            favoriteIds,
        }
    });

    return NextResponse.json(user);
}
