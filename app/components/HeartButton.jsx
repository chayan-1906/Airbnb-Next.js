import {AiFillHeart, AiOutlineHeart} from "react-icons/ai";
import useFavorite from "@/app/hooks/useFavorite";

function HeartButton({listingId, currentUser}) {
    let {isFavourite, toggleFavourite} = useFavorite({listingId, currentUser});

    return (
        <div onClick={toggleFavourite} className={'relative hover:opacity-80 transition cursor-pointer'}>
            <AiOutlineHeart size={28} className={'absolute fill-white -top-[2px] -right-[2px]'}/>
            <AiFillHeart size={24} className={`${isFavourite ? 'fill-rose-500' : 'fill-neutral-500/70'}`}/>
        </div>
    );
}

export default HeartButton;
