import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "./DatePicker.css";

import "react-datepicker/dist/react-datepicker.css";

function DateCmp() {
    const [startDate, setStartDate] = useState(new Date());
    function onChangeDateHandler(value) {
        setStartDate(value);
    }
    return (
        <>
            <DatePicker
                selected={startDate}
                onchange={onChangeDateHandler}
                dateFormat="dd MMM yyy"
            />
        </>
    )
}

export default DateCmp