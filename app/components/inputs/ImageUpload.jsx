import {useCallback} from "react";
import {CldUploadWidget} from "next-cloudinary";
import {TbPhotoPlus} from "react-icons/tb";
import Image from "next/image";

function ImageUpload({value, onChange}) {
    const handleUpload = useCallback((result) => {
        onChange(result.info.secure_url);
    }, [onChange]);
    console.log(`imageUpload - ${value}`);

    return (
        <CldUploadWidget onUpload={handleUpload} uploadPreset={'mwljjs96'} options={{maxFiles: 1}}>
            {({open}) => {
                return (
                    <div onClick={() => open?.()}
                         className={'flex flex-col relative p-20 items-center justify-center gap-4 cursor-pointer hover:opacity-70 transition border-dashed border-2 border-neutral-300 text-neutral-600'}>
                        <TbPhotoPlus size={50}/>
                        <div className={'font-semibold text-lg'}>Click to upload</div>
                        {value && (
                            <div className={'absolute inset-0 w-full h-full'}>
                                <Image src={value} alt={'upload-image'} fill style={{objectFit: 'cover'}}/>
                            </div>
                        )}
                    </div>
                )
            }}
        </CldUploadWidget>
    );
}

export default ImageUpload;

// Cloud name - dylkxk97e