'use client';

import {PuffLoader} from "react-spinners";

function Loader() {
    return (
        <div className={'flex flex-col h-[70vh] justify-center items-center'}>
            <PuffLoader size={100} color={'red'}/>
        </div>
    );
}

export default Loader;
