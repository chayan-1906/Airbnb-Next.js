import Calendar from "@/app/components/inputs/Calendar";
import Button from "@/app/components/Button";

function ListingReservation({listing, totalPrice, dateRange, onDateChange, onSubmit, disabled, disabledDates}) {
    return (
        <div className={'bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden'}>
            <div className={'flex items-center gap-1 p-4'}>
                <div className={'text-2xl font-semibold'}>₹ {listing.price}</div>
                <div className={'font-light text-neutral-600'}>night</div>
            </div>
            <hr/>
            <Calendar value={dateRange} disabledDates={disabledDates} onChange={(value) => onDateChange(value.selection)}/>
            <hr/>
            <div className={'p-4'}>
                <Button disabled={disabled} label={'Reserve'} onClick={onSubmit}/>
            </div>
            <div className={'flex p-4 items-center justify-between font-semibold text-lg'}>
                <div>Total</div>
                <div>₹ {totalPrice}</div>
            </div>
        </div>
    );
}

export default ListingReservation;
