import {useRouter, useSearchParams} from "next/navigation";
import {useCallback} from "react";
import qs from 'query-string';

function CategoryBox({label, description, icon: Icon, selected}) {
    let router = useRouter();
    let params = useSearchParams();

    const handleClick = useCallback(() => {
        let currentQuery = {};

        if (params) {
            currentQuery = qs.parse(params.toString());
        }

        const updatedQuery = {
            ...currentQuery,
            category: label,
        }

        /*if (params?.get('category') === label) {
            delete updatedQuery.category;
        }*/

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, {skipNull: true});

        router.push(url);
    }, [label, params, router]);

    return (
        <div onClick={handleClick} className={`flex flex-col flex-1 items-center justify-center text-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition
                        ${selected ? 'border-b-neutral-800 text-neutral-800 cursor-default' : 'border-transparent text-neutral-500 cursor-pointer'}`}>
            <Icon size={26}/>
            <div className={'text-nowrap font-medium text-sm'}>{label}</div>
        </div>
    );
}

export default CategoryBox;
