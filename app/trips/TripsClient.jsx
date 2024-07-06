'use client';

import Container from "@/app/components/navbar/Container";
import Heading from "@/app/components/Heading";
import {useRouter} from "next/navigation";
import {useCallback, useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "@/app/components/listings/ListingCard";

function TripsClient({reservations, currentUser}) {
    let router = useRouter();
    const [deletingId, setDeletingId] = useState('');

    let onCancel = useCallback((id) => {
        setDeletingId(id);

        axios.delete(`/api/reservations/${id}`)
            .then(r => {
                toast.success('Reservation cancelled');
                router.refresh();
            })
            .catch((error) => toast.error(error?.response?.data?.error))
            .finally(() => setDeletingId(''));
    }, [router]);

    return (
        <Container>
            <Heading title={'Trips'} subtitle={'Where you\'ve been and where you\'re going'}/>
            <div className={'mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'}>
                {
                    reservations.map((reservation) => (
                        <ListingCard
                            key={reservation.id}
                            listing={reservation.listing.listing}
                            reservation={reservation}
                            actionId={reservation.id}
                            disabled={deletingId === reservation.id}
                            onAction={onCancel}
                            actionLabel={'Cancel Reservation'}
                            currentUser={currentUser}
                        />
                    ))
                }
            </div>
        </Container>
    );
}

export default TripsClient;
