'use client';

import Container from "@/app/components/navbar/Container";
import Heading from "@/app/components/Heading";
import {useRouter} from "next/navigation";
import ListingCard from "@/app/components/listings/ListingCard";
import {useCallback, useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";

function PropertiesClient({propertyListings, currentUser}) {
    let router = useRouter();

    const [deletingId, setDeletingId] = useState('');

    let onCancel = useCallback((id) => {
        setDeletingId(id);

        axios.delete(`/api/listings/${id}`)
            .then(r => {
                toast.success('Property deleted');
                router.refresh();
            })
            .catch((error) => toast.error(error?.response?.data?.error))
            .finally(() => setDeletingId(''));
    }, [router]);

    return (
        <Container>
            <Heading title={'Properties'} subtitle={'List of your properties'}/>
            <div className={'mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'}>
                {
                    propertyListings.map((property) => (
                        <ListingCard
                            key={property.id}
                            listing={property}
                            actionId={property.id}
                            onAction={onCancel}
                            disabled={deletingId === property.id}
                            actionLabel={'Delete property'}
                            currentUser={currentUser}
                        />
                    ))
                }
            </div>
        </Container>
    );
}

export default PropertiesClient;
