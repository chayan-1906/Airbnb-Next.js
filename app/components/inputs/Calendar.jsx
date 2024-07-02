import {DateRange} from "react-date-range";

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

function Calendar({value, disabledDates, onChange}) {
    return (
        <DateRange rangeColors={['#262626']} ranges={[value]} date={new Date()} onChange={onChange} direction={'vertical'} showDateDisplay={false} minDate={new Date()} disabledDate={disabledDates}/>
    );
}

export default Calendar;
