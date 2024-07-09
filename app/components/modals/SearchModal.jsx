'use client';

import {useCallback, useMemo, useState} from "react";
import Modal from "@/app/components/modals/Modal";
import {useRouter, useSearchParams} from "next/navigation";
import useSearchModal from "@/app/hooks/useSearchModal";
import dynamic from "next/dynamic";
import qs from "query-string";
import {formatISO} from "date-fns";
import Heading from "@/app/components/Heading";
import CountrySelect from "@/app/components/CountrySelect";
import Calendar from "@/app/components/inputs/Calendar";
import Counter from "@/app/components/inputs/Counter";

const STEPS = {
    LOCATION: 0,
    DATE: 1,
    INFO: 2,
}

function SearchModal() {
    let router = useRouter();
    let searchModal = useSearchModal();
    let params = useSearchParams();

    const [location, setLocation] = useState('');
    const [step, setStep] = useState(STEPS.LOCATION);
    const [guestCount, setGuestCount] = useState(1);
    const [roomCount, setRoomCount] = useState(1);
    const [bathroomCount, setBathroomCount] = useState(1);
    const [dateRange, setDateRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    });

    const Map = useMemo(() => dynamic(() => import('../Map'), {ssr: false}), [location]);

    let onBack = useCallback(() => {
        setStep((value) => value - 1);
    }, []);

    let onNext = useCallback(() => {
        setStep((value) => value + 1);
    }, []);

    let onSubmit = useCallback(() => {
        if (step !== STEPS.INFO) {
            return onNext();
        }

        let currentQuery = {};
        if (params) {
            currentQuery = qs.parse(params.toString());
        }

        const updatedQuery = {
            ...currentQuery,
            locationValue: location?.value,
            guestCount,
            roomCount,
            bathroomCount,
        }

        if (dateRange.startDate) {
            updatedQuery.startDate = formatISO(dateRange.startDate);
        }

        if (dateRange.endDate) {
            updatedQuery.endDate = formatISO(dateRange.endDate);
        }

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery,
        }, {skipNull: true});

        setStep(STEPS.LOCATION);
        searchModal.onClose();

        router.push(url);
    }, [bathroomCount, dateRange.endDate, dateRange.startDate, guestCount, location?.value, onNext, params, roomCount, router, searchModal, step]);

    let actionLabel = useMemo(() => {
        if (step === STEPS.INFO) {
            return 'Search';
        }

        return 'Next';
    }, [step]);

    let secondaryActionLabel = useMemo(() => {
        if (step === STEPS.LOCATION) {
            return undefined;
        }

        return 'Back';
    }, [step]);

    let bodyContent = (
        <div className={'flex flex-col gap-8'}>
            <Heading title={'Where do you wanna go?'} subtitle={'Find the perfect location!'}/>
            <CountrySelect value={location} onChange={(value) => setLocation(value)}/>
            <hr/>
            <Map center={location?.latlng}/>
        </div>
    );

    if (step === STEPS.DATE) {
        bodyContent = (
            <div className={'flex flex-col gap-8'}>
                <Heading title={'When do you plan to go?'} subtitle={'Make sure everyone is free!'}/>
                <Calendar value={dateRange} onChange={(value) => setDateRange(value.selection)}/>
            </div>
        );
    }

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className={'flex flex-col gap-8'}>
                <Heading title={'More Information'} subtitle={'Find your perfect place!'}/>
                <Counter title={'Guests'} subtitle={'How many guests are coming?'} value={guestCount} onChange={(value) => setGuestCount(value)}/>
                <Counter title={'Rooms'} subtitle={'How many rooms do you need?'} value={roomCount} onChange={(value) => setRoomCount(value)}/>
                <Counter title={'Bathrooms'} subtitle={'How many bathrooms do you need?'} value={bathroomCount} onChange={(value) => setBathroomCount(value)}/>
            </div>
        );
    }

    return (
        <Modal
            isOpen={searchModal.isOpen}
            title={'Filters'}
            body={bodyContent}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
            onClose={searchModal.onClose}
            onSubmit={onSubmit}
        />
    );
}

export default SearchModal;
