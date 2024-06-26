'use client';

import {LuSearch} from "react-icons/lu";
import {RiSearchLine} from "react-icons/ri";

function Search() {
    return (
        <div className={'border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer'}>
            <div className={'flex items-center justify-between'}>
                <div className={'text-sm font-semibold px-6'}>Anywhere</div>
                <div className={'hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center'}>Any Week</div>
                <div className={'flex items-center gap-3 text-sm pl-6 pr-2 text-gray-600'}>
                    <div className={'hidden sm:block'}>Add Guests</div>
                    <div className={'flex items-center justify-center p-2 bg-rose-500 rounded-full text-white font-bold'}><RiSearchLine size={18}/></div>
                </div>
            </div>
        </div>
    );
}

export default Search;
