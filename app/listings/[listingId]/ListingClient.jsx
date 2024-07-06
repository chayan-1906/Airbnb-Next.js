'use client';

import {useCallback, useEffect, useMemo, useState} from "react";
import {categories} from "@/app/components/navbar/Categories";
import Container from "@/app/components/navbar/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import useLoginModal from "@/app/hooks/useLoginModal";
import {useRouter} from "next/navigation";
import {differenceInCalendarDays, eachDayOfInterval} from "date-fns";
import axios from "axios";
import toast from "react-hot-toast";
import ListingReservation from "@/app/components/listings/ListingReservation";

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
}

function ListingClient({reservations = [], listing, currentUser}) {
    const category = useMemo(() => {
        return categories.find((item) => item.label === listing.category);
    }, [listing]);

    let loginModal = useLoginModal();
    let router = useRouter();

    const disabledDates = useMemo(() => {
        let dates = [];

        reservations.forEach((reservation) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate),
            });
            dates = [...dates, ...range];
        });

        return dates;
    }, [reservations]);

    const [isLoading, setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(listing.price);
    const [dateRange, setDateRange] = useState(initialDateRange);

    const onCreateReservation = useCallback(() => {
        if (!currentUser) {
            return loginModal.onOpen();
        }

        setIsLoading(true);

        axios.post(`/api/reservations`, {
            totalPrice,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            listingId: listing?.id,
        }).then(r => {
            toast.success('Listing reserved');
            setDateRange(initialDateRange);
            router.push('/trips');
            router.refresh();
        }).catch((error) => {
            toast.error('Something went wrong');
            console.log('inside catch of onCreateReservation:', error);
        }).finally(() => {
            setIsLoading(false);
        });
    }, [currentUser, dateRange, listing?.id, loginModal, router, totalPrice]);

    useEffect(() => {
        if (dateRange.startDate && dateRange.endDate) {
            const dayCount = differenceInCalendarDays(dateRange.endDate, dateRange.startDate);

            if (dayCount && listing.price) {
                setTotalPrice(dayCount * listing.price);
            } else {
                setTotalPrice(listing.price);
            }
        }
    }, [dateRange, listing.price]);

    // let {id, title, imageSrc, locationValue, user} = listing;

    return (
        <Container>
            <div className={'max-w-screen-lg mx-auto'}>
                <div className={'flex flex-col gap-6'}>
                    <ListingHead listing={listing} currentUser={currentUser}/>
                    <div className={'grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6'}>
                        <ListingInfo listing={listing} category={category}/>
                        <div className={'order-first mb-10 md:order-last md:col-span-3'}>
                            <ListingReservation
                                listing={listing}
                                totalPrice={totalPrice}
                                dateRange={dateRange}
                                onDateChange={(value) => setDateRange(value)}
                                onSubmit={onCreateReservation}
                                disabled={isLoading}
                                disabledDates={disabledDates}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default ListingClient;
