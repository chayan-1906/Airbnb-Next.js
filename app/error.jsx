'use client';

import {useEffect} from "react";
import EmptyState from "@/app/components/EmptyState";

function Error({error}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div>
            <EmptyState title={'Uh Oh'} subtitle={'Something went wrong!'}/>
        </div>
    );
}

export default Error;
