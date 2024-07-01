'use client';

import {useMemo} from "react";
import {categories} from "@/app/components/navbar/Categories";
import Container from "@/app/components/navbar/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";

function ListingClient({reservations, listing, currentUser}) {
    const category = useMemo(() => {
        return categories.find((item) => item.label === listing.category);
    }, [listing]);

    // let {id, title, imageSrc, locationValue, user} = listing;

    return (
        <Container>
            <div className={'max-w-screen-lg mx-auto'}>
                <div className={'flex flex-col gap-6'}>
                    <ListingHead listing={listing} currentUser={currentUser}/>
                    <div className={'grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6'}>
                        <ListingInfo listing={listing} category={category}/>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default ListingClient;
