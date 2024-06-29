import useCountries from "@/app/hooks/useCountries";
import Select from "react-select";

function CountrySelect({value, onChange}) {
    let {getAll, getByValue} = useCountries();

    return (
        <div>
            <Select
                value={value}
                onChange={(value) => onChange(value)}
                placeholder={'Anywhere'}
                isClearable
                options={getAll()}
                formatOptionLabel={(option) => (
                    <div className={'flex items-center gap-3'}>
                        <div>{option.flag}</div>
                        <div>{option.label}, <span className={'text-neutral-500 ml-1'}>{option.region}</span></div>
                    </div>
                )}
                classNames={{
                    // control: () => 'p-3 border-2',
                    input: () => 'text-lg',
                    option: () => 'text-lg'
                }}
                theme={(theme)=> ({
                    ...theme, borderRadius: 6, colors: {...theme.colors, primary: 'black', primary25: '#FFE4E6'},
                })}
            />
        </div>
    );
}

export default CountrySelect;
