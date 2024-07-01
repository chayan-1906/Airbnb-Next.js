import useLoginModal from "@/app/hooks/useLoginModal";
import {useRouter} from "next/navigation";
import {useCallback, useMemo} from "react";
import axios from "axios";
import toast from "react-hot-toast";

function useFavorite({listingId, currentUser}) {
    let loginModal = useLoginModal();
    let router = useRouter();

    const isFavourite = useMemo(() => {
        const list = currentUser?.favoriteIds || [];

        return list.includes(listingId);
    }, [currentUser, listingId]);

    const toggleFavourite = useCallback(async (e) => {
        e.stopPropagation();

        if (!currentUser) {
            return loginModal.onOpen();
        }

        try {
            let request;

            if (isFavourite) {
                request = () => axios.delete(`/api/favorites/${listingId}`);
            } else {
                request = () => axios.post(`/api/favorites/${listingId}`);
            }

            await request();
            router.refresh();
            toast.success('Success');
        } catch (e) {
            toast.error('Something went wrong');
        }
    }, [currentUser, isFavourite, listingId, loginModal, router]);

    return {isFavourite, toggleFavourite}
}

export default useFavorite;
