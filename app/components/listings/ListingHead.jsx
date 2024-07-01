import useCountries from "@/app/hooks/useCountries";
import Heading from "@/app/components/Heading";
import Image from "next/image";
import HeartButton from "@/app/components/HeartButton";
import ListingInfo from "@/app/components/listings/ListingInfo";

function ListingHead({listing, currentUser}) {
    let {id, title, imageSrc, locationValue, user, category, description, roomCount, bathroomCount, guestCount} = listing;

    let {getByValue} = useCountries();
    let location = getByValue(locationValue);

    return (
        <>
            <Heading title={title} subtitle={`${location?.region}, ${location?.label}`}/>
            <div className={'w-full h-[60vh] overflow-hidden rounded-xl relative'}>
                <Image src={imageSrc} alt={title} fill className={'w-full object-cover'}/>
                <div className={'absolute top-5 right-5'}>
                    <HeartButton listingId={id} currentUser={currentUser}/>
                </div>
            </div>
        </>
    );
}

export default ListingHead;
