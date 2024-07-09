'use client';

import {RiSearchLine} from "react-icons/ri";
import useSearchModal from "@/app/hooks/useSearchModal";
import {useSearchParams} from "next/navigation";
import useCountries from "@/app/hooks/useCountries";
import {useMemo} from "react";
import {differenceInDays} from "date-fns";

function Search() {
    let searchModal = useSearchModal();
    let searchParams = useSearchParams();
    let {getByValue} = useCountries();

    const locationValue = searchParams?.get('locationValue');
    const startDate = searchParams?.get('startDate');
    const endDate = searchParams?.get('endDate');
    const guestCount = searchParams?.get('guestCount');

    const locationLabel = useMemo(() => {
        if (locationValue) {
            return getByValue(locationValue)?.label;
        }

        return 'Anywhere';
    }, [getByValue, locationValue]);

    const durationLabel = useMemo(() => {
        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            let diff = differenceInDays(end, start);

            if (diff === 0) diff = 1;

            return `${diff} days`;
        }

        return 'Any Week';
    }, [endDate, startDate]);

    const guestLabel = useMemo(() => {
        if (guestCount) {
            return `${guestCount} Guests`;
        }
        return 'Add Guests';

    }, [guestCount]);

    return (
        <div onClick={searchModal.onOpen} className={'border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer'}>
            <div className={'flex items-center justify-between'}>
                <div className={'text-sm font-semibold px-6'}>{locationLabel}</div>
                <div className={'hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center'}>{durationLabel}</div>
                <div className={'flex items-center gap-3 text-sm pl-6 pr-2 text-gray-600'}>
                    <div className={'hidden sm:block'}>{guestLabel}</div>
                    <div className={'flex items-center justify-center p-2 bg-rose-500 rounded-full text-white font-bold'}><RiSearchLine size={18}/></div>
                </div>
            </div>
        </div>
    );
}

export default Search;
