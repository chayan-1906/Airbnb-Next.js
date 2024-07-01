import useCountries from "@/app/hooks/useCountries";
import Avatar from "@/app/components/Avatar";
import ListingCategory from "@/app/components/listings/ListingCategory";
import dynamic from "next/dynamic";

const Map = dynamic(() => import('../Map'), {
    ssr: false,
});

function ListingInfo({listing, category}) {
    let {id, title, imageSrc, locationValue, user, description, roomCount, bathroomCount, guestCount} = listing;

    console.log(listing);

    let {getByValue} = useCountries();
    let coordinates = getByValue(locationValue)?.latlng;

    return (
        <div className={'flex flex-col col-span-4 gap-8'}>
            <div className={'flex flex-col gap-2'}>
                <div className={'flex text-xl font-semibold items-center gap-2'}>
                    <div>Hosted by {user?.name}</div>
                    <Avatar src={user?.image}/>
                </div>
                <div className={'flex items-center gap-4 font-light text-neutral-500'}>
                    <div>{guestCount} guests</div>
                    <div>{roomCount} rooms</div>
                    <div>{bathroomCount} bathrooms</div>
                </div>
            </div>
            <hr/>
            {category && (
                <ListingCategory category={category}/>
            )}
            <hr/>
            <div className={'text-lg font-light text-neutral-500'}>{description}</div>
            <hr/>
            <Map center={coordinates}/>
        </div>
    );
}

export default ListingInfo;
