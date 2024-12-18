'use client';

import {useRouter} from "next/navigation";
import useCountries from "@/app/hooks/useCountries";
import {useCallback, useMemo} from "react";
import {format} from "date-fns";
import Image from "next/image";
import HeartButton from "@/app/components/HeartButton";
import Button from "@/app/components/Button";
import Link from "next/link";

function ListingCard({listing, currentUser, reservation, onAction, disabled, actionLabel, actionId}) {
    let {id, title, imageSrc, locationValue, category} = listing || {};
    let router = useRouter();
    let {getByValue} = useCountries();

    const location = getByValue(locationValue);

    const handleCancel = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();

        if (disabled) return;

        onAction?.(actionId);
    }, [actionId, disabled, onAction]);

    const price = useMemo(() => {
        if (reservation) {
            return reservation.totalPrice;
        }

        return listing.price;
    }, [listing.price, reservation]);

    const reservationDate = useMemo(() => {
        if (!reservation) return null;

        const start = new Date(reservation.startDate);
        const end = new Date(reservation.endDate);

        return `${format(start, 'PP')} - ${format(end, 'PP')}`;
    }, [reservation]);

    return (
        <Link href={`/listings/${id}`} target={'_blank'} className={'col-span-1 cursor-pointer group'}>
            <div className={'flex flex-col gap-1 w-full'}>
                <div className={'aspect-square w-full relative overflow-hidden rounded-xl'}>
                    <Image src={imageSrc} alt={title} fill className={'object-cover h-full w-full group-hover:scale-110 transition'}/>
                    <div className={'absolute top-3 right-3'}>
                        <HeartButton listingId={id} currentUser={currentUser}/>
                    </div>
                </div>
                <div className={'font-semibold text-lg'}>{location?.region}, {location?.label}</div>
                <div className={'font-light text-neutral-500'}>{reservationDate || category}</div>
                <div className={'flex items-center gap-1'}>
                    <div className={'font-semibold'}>₹ {price} /</div>
                    {!reservationDate && (
                        <div className={'font-light'}>night</div>
                    )}
                </div>
                {onAction && actionLabel && (
                    <Button disable={disabled} small label={actionLabel} onClick={handleCancel}/>
                )}
            </div>
        </Link>
    );
}

export default ListingCard;
