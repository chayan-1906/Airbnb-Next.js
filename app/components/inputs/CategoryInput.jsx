function CategoryInput({label, icon: Icon, selected, onClick}) {
    return (
        <div className={`flex flex-col gap-3 rounded-xl border-2 p-4 cursor-pointer transition hover:border-gray-400 ${selected ? 'border-gray-400' : 'border-neutral-200'}`} onClick={() => onClick(label)}>
            <Icon size={30}/>
            <div className={'font-semibold'}>{label}</div>
        </div>
    );
}

export default CategoryInput;
