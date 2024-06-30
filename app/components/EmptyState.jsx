'use client';

import {useRouter} from "next/navigation";
import Heading from "@/app/components/Heading";
import Button from "@/app/components/Button";

function EmptyState({title = 'No exact matches', subtitle = 'Try changing or removing some of filters', showReset}) {
    let router = useRouter();

    return (
        <div className={'flex flex-col gap-2 justify-center items-center h-[60vh]'}>
            <Heading title={title} subtitle={subtitle} center/>
            <div className={'w-48 mt-4'}>
                {showReset && (
                    <Button outline label={'Remove all filters'} onClick={() => router.push('/')}/>
                )}
            </div>
        </div>
    );
}

export default EmptyState;
