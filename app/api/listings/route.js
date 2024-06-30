import getCurrentUser from "@/app/api/actions/getCurrentUser";
import {NextResponse} from "next/server";

export async function POST(request) {
    let currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();
    const {title, description, imageSrc, category, roomCount, bathroomCount, guestCount, location, price} = body;

    Object.keys(body).forEach((value) => {
        if (!body[value]) {
            NextResponse.error();
        }
    });

    const listing = await prisma.listing.create({
        data: {
            title, description, imageSrc, category, roomCount, bathroomCount, guestCount, locationValue: location.value, price: parseInt(price, 10), userId: currentUser.id,
        }
    });

    return  NextResponse.json(listing);
}
