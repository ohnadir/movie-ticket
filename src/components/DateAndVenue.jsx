import { useState } from 'react';
import { CalendarDays } from 'lucide-react';

const getNextDays = (count) => {
    const days = [];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const today = new Date();

    for (let i = 0; i < count; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() + i);
        days.push({
            day: dayNames[d.getDay()],
            date: d.getDate(),
            month: monthNames[d.getMonth()],
            fullDate: d.toISOString().split('T')[0],
        });
    }
    return days;
};

export const formatDisplay = (dateStr) => {
    if (!dateStr) return null;
    const d = new Date(dateStr + 'T00:00:00');
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return {
        day: dayNames[d.getDay()],
        date: d.getDate(),
        month: monthNames[d.getMonth()],
        year: String(d.getFullYear()).slice(-2),
    };
};

const today = new Date().toISOString().split('T')[0];

const DateAndVenue = ({ selectedDate, setSelectedDate, setReservationInformation }) => {
    const days = getNextDays(2);
    const [customDate, setCustomDate] = useState('');

    const customDisplay = customDate ? formatDisplay(customDate) : null;
    const upcommingDate = customDisplay ? customDisplay : formatDisplay(selectedDate);

    const handleCustomDate = (e) => {
        const val = e.target.value;
        setCustomDate(val);
        if (val) {
            setReservationInformation((prev) => ({
                ...prev,
                selectedDate: `${formatDisplay(val).date} ${formatDisplay(val).month}, ${formatDisplay(val).year}`
            }));
            setSelectedDate(val);
        }

    };

    return (
        <div>
            <h2 className="text-xl font-bold text-[#E5E7EB] mb-3">Select Date</h2>

            <div className="flex gap-3">
                {/* Quick day cards */}
                {days.map((d) => {
                    const isSelected = selectedDate === d.fullDate;
                    return (
                        <div
                            key={d.fullDate}
                            onClick={() => {
                                setSelectedDate(d.fullDate);
                                setCustomDate('');
                                setReservationInformation((prev) => ({
                                    ...prev,
                                    selectedDate: `${formatDisplay(d.fullDate).date} ${formatDisplay(d.fullDate).month}, ${formatDisplay(d.fullDate).year}`
                                }));
                            }}
                            className={`w-22.5 rounded-md px-3.5 py-2 cursor-pointer transition-all duration-200
                                ${isSelected
                                    ? 'border-2 border-[#16a34a] bg-white'
                                    : 'border-2 border-transparent bg-white'
                                }`}
                        >
                            <p className={`text-[13px] m-0 font-medium
                                ${isSelected ? ' text-[#16a34a]' : ' text-gray-400'}`}>
                                {d.day}
                            </p>
                            <p className="m-0 mt-0.5 leading-none flex items-baseline gap-0.75">
                                <span className={`text-[22px] font-bold
                                    ${isSelected ? 'text-[#16a34a]' : 'text-gray-800'}`}>
                                    {d.date}
                                </span>
                                <span className={`text-[13px] font-medium
                                    ${isSelected ? 'text-[#16a34a]' : 'text-gray-400'}`}>
                                    {d.month}
                                </span>
                            </p>
                        </div>
                    );
                })}

                {/* Custom date picker card */}
                <div
                    className={`
                    relative w-fit rounded-md p-1 cursor-pointer transition-all duration-200 overflow-hidden
                    border-2 border-transparent bg-white`}
                >

                    <div className='flex items-center justify-center h-full gap-2'>
                        <div>
                            <p className="text-[11px] font-medium text-gray-400 m-0 leading-snug">
                                Select Date
                            </p>
                            <p className='m-0 p-0 text-[#16a34a] text-[13px] font-semibold'> {upcommingDate?.date} {upcommingDate?.month}  </p>
                        </div>

                        <div className='bg-[#16a34a]/10 relative border border-[#16a34a]/20 rounded-sm  h-full w-8 flex items-center justify-center'>
                            <input
                                type="date"
                                value={customDate}
                                onChange={handleCustomDate}
                                min={today}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            />
                            <CalendarDays size={20} color="#16a34a" strokeWidth={1.8} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DateAndVenue;