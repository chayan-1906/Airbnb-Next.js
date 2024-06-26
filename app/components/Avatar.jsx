import Image from "next/image";

function Avatar({src}) {
    return (
        <div>
            <Image src={src || '/images/avatar.png'} alt={'Avatar'} height={'30'} width={'30'} className={'rounded-full'}/>
        </div>
    );
}

export default Avatar;
