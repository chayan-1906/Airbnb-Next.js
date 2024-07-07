'use client';

import {AiOutlineMenu} from "react-icons/ai";
import Avatar from "@/app/components/Avatar";
import {useCallback, useState} from "react";
import MenuItem from "@/app/components/navbar/MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import {signOut} from "next-auth/react";
import useRentModal from "@/app/hooks/useRentModal";
import {useRouter} from "next/navigation";

function UserMenu({currentUser}) {
    const [isOpened, setIsOpened] = useState(false);
    let registerModal = useRegisterModal();
    let loginModal = useLoginModal();
    let rentModal = useRentModal();
    let router = useRouter();

    const toggleOpen = useCallback(() => {
        setIsOpened((value) => !value);
    }, []);

    const onRent = useCallback(() => {
        if (!currentUser) {
            return loginModal.onOpen();
        }

        rentModal.onOpen();
    }, [currentUser, loginModal, rentModal]);

    return (
        <div className={'relative'}>
            <div className={'flex items-center gap-3'}>
                <div onClick={onRent} className={'hidden md:block px-4 py-3 rounded-full hover:bg-neutral-100 transition cursor-pointer text-sm font-semibold'}>
                    Airbnb your home
                </div>
                <div onClick={toggleOpen} className={'flex items-center gap-3 rounded-full p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 cursor-pointer hover:shadow-md transition'}>
                    <AiOutlineMenu/>
                    <div className={'hidden md:block'}><Avatar src={currentUser?.image}/></div>
                </div>
            </div>

            {isOpened && (
                <div className={'absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden top-12 right-0 text-sm'}>
                    <div className={'flex flex-col cursor-pointer'}>
                        <>
                            {currentUser ? (
                                <>
                                    <MenuItem onClick={() => {
                                        router.push('/trips');
                                        setIsOpened(false);
                                    }} label={'My Trips'}/>
                                    <MenuItem onClick={() => {
                                        router.push('/favorites');
                                        setIsOpened(false);
                                    }} label={'My favorites'}/>
                                    <MenuItem onClick={() => {
                                        router.push('/reservations');
                                        setIsOpened(false);
                                    }} label={'My reservations'}/>
                                    <MenuItem onClick={() => {}} label={'My properties'}/>
                                    <MenuItem onClick={rentModal.onOpen} label={'Airbnb my home'}/>
                                    <hr/>
                                    <MenuItem onClick={() => signOut()} label={'Logout'}/>
                                </>
                            ) : (
                                <>
                                    <MenuItem onClick={() => {
                                        loginModal.onOpen();
                                        setIsOpened(false);
                                    }} label={'Login'}/>
                                    <MenuItem onClick={() => {
                                        registerModal.onOpen();
                                        setIsOpened(false);
                                    }} label={'Sign Up'}/>
                                </>
                            )}
                        </>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserMenu;
