'use client';

import Image from "next/image";
import {useRouter} from "next/navigation";

function Logo() {
    let router = useRouter();

    return (
        <div className={'flex'} onClick={() => router.push('/')}>
            <Image src={'/images/logo-name.png'} alt={'Logo'} className={'hidden md:block cursor-pointer'} height={'100'} width={'100'}/>
            <Image src={'/images/logo.png'} alt={'Logo'} className={'block md:hidden cursor-pointer'} height={'50'} width={'50'}/>
        </div>
    )
}

export default Logo;
