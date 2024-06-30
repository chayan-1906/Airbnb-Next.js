'use client';

import Modal from "@/app/components/modals/Modal";
import useRentModal from "@/app/hooks/useRentModal";
import {useMemo, useState} from "react";
import Heading from "@/app/components/Heading";
import {categories} from "@/app/components/navbar/Categories";
import CategoryInput from "@/app/components/inputs/CategoryInput";
import {useForm} from "react-hook-form";
import CountrySelect from "@/app/components/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "@/app/components/inputs/Counter";
import ImageUpload from "@/app/components/inputs/ImageUpload";
import Input from "@/app/components/inputs/Input";
import axios from "axios";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
// import Map from "@/app/components/Map";

let STEPS = {
    CATEGORY: 0,
    LOCATION: 1,
    INFO: 2,
    IMAGES: 3,
    DESCRIPTION: 4,
    PRICE: 5,
};

function RentModal() {
    let rentModal = useRentModal();
    let router = useRouter();

    let {register, handleSubmit, setValue, watch, formState: {errors}, reset} = useForm({
        defaultValues: {
            category: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
            title: '',
            description: ''
        },
    });
    const [isLoading, setIsLoading] = useState(false);

    const category = watch('category');
    const location = watch('location');
    const guestCount = watch('guestCount');
    const roomCount = watch('roomCount');
    const bathroomCount = watch('bathroomCount');
    const imageSrc = watch('imageSrc');

    const Map = useMemo(() => dynamic(() => import('../Map'), {ssr: false}), [location]);

    const setCustomValue = (id, value) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
        });
    }

    const [step, setStep] = useState(STEPS.CATEGORY);

    const onBack = () => {
        setStep((value) => value - 1);
    }

    const onNext = () => {
        setStep((value) => value + 1);
    }

    const onSubmit = (data) => {
        if (step !== STEPS.PRICE) {
            return onNext();
        }

        setIsLoading(true);
        axios.post('/api/listings', data).then(r => {
            toast.success('Listing created');
            router.refresh();
            reset();
            setStep(STEPS.CATEGORY);
            rentModal.onClose();
        }).catch((error) => {
            toast.error('Something went wrong');
        }).finally(() => {
            setIsLoading(false);
        });
    }

    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) {
            return 'Create';
        }

        return 'Next';
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined;
        }

        return 'Back';
    }, [step]);

    let bodyContent = (
        <div className={'flex flex-col gap-4'}>
            <Heading title={'Which of these best describe your place?'} subtitle={'Pick a category'}/>
            <div className={'grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto'}>
                {categories.map((categoryItem) => (
                    <div key={categoryItem.label} className={'col-span-1'}>
                        <CategoryInput onClick={(category) => setCustomValue('category', category)} selected={category === categoryItem.label} label={categoryItem.label} icon={categoryItem.icon}/>
                    </div>
                ))}
            </div>
        </div>
    );

    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div className={'flex flex-col gap-4'}>
                <Heading title={'Where is your place located?'} subtitle={'Help guests find you!'}/>
                <CountrySelect value={location} onChange={(value) => setCustomValue('location', value)}/>
                <Map center={location?.latlng}/>
            </div>
        );
    }

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className={'flex flex-col gap-8'}>
                <Heading title={'Share some basics about your place'} subtitle={'What amenities do you have?'}/>
                <Counter title={'Guests'} subtitle={'How many guests do you allow?'} value={guestCount} onChange={(value) => setCustomValue('guestCount', value)}/>
                <hr/>
                <Counter title={'Rooms'} subtitle={'How many rooms do you have?'} value={roomCount} onChange={(value) => setCustomValue('roomCount', value)}/>
                <hr/>
                <Counter title={'Bathrooms'} subtitle={'How many bathrooms do you have?'} value={bathroomCount} onChange={(value) => setCustomValue('bathroomCount', value)}/>
                <hr/>
            </div>
        );
    }

    if (step === STEPS.IMAGES) {
        bodyContent = (
            <div className={'flex flex-col gap-8'}>
                <Heading title={'Add a photo of your place'} subtitle={'Show guests what your place looks like!'}/>
                <ImageUpload value={imageSrc} onChange={(value) => setCustomValue('imageSrc', value)}/>
            </div>
        );
    }

    if (step === STEPS.DESCRIPTION) {
        bodyContent = (
            <div className={'flex flex-col gap-8'}>
                <Heading title={'How would you describe your place?'} subtitle={'Short and sweet works best!'}/>
                <Input id={'title'} label={'Title'} disabled={isLoading} register={register} errors={errors} required/>
                <hr/>
                <Input id={'description'} label={'Description'} disabled={isLoading} register={register} errors={errors} required/>
            </div>
        );
    }

    if (step === STEPS.PRICE) {
        bodyContent = (
            <div className={'flex flex-col gap-8'}>
                <Heading title={'Now, set your price'} subtitle={'How much do you charge per night?'}/>
                <Input id={'price'} label={'Price'} formatPrice type={'number'} disabled={isLoading} register={register} errors={errors} required/>
            </div>
        );
    }

    return (
        <Modal
            isOpen={rentModal.isOpen}
            title={'Airbnb your home'}
            onClose={rentModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            body={bodyContent}
        />
    );
}

export default RentModal;
