/* eslint-disable no-unused-vars */
import { Armchair } from "lucide-react";
import { useEffect, useState } from "react";
import TicketSummary from "./TicketSummary";
import MovieList from "./MovieList";
import { Statistic } from 'antd';
import DateAndVenue, { formatDisplay } from "./DateAndVenue";
import SelectShowTime from "./ShowTime";
const { Timer } = Statistic;

const PRICE = 250;
const LAYOUT = [
    { row: "J", groups: [[1, 2, 3, 4, 5, 6], [0, 0, 0, 0, 0, 0], [7, 8, 9, 10, 11, 12]] },
    { row: "H", groups: [[1, 2], [0, 0], [3, 4, 5], [0, 0, 0, 0, 0], [6, 7], [0, 0], [9, 10]] },
    { row: "G", groups: [[1, 2], [0, 0], [3, 4, 5, 6, 7, 8, 9, 10, 11, 12], [0, 0], [13, 14]] },
    { row: "F", groups: [[1, 2], [0, 0], [3, 4, 5, 6, 7, 8, 9, 10, 11, 12], [0, 0], [13, 14]] },
    { row: "E", groups: [[1, 2], [0, 0], [3, 4, 5, 6, 7, 8, 9, 10, 11, 12], [0, 0], [13, 14]] },
    { row: "D", groups: [[1, 2], [0, 0], [3, 4, 5, 6, 7, 8, 9, 10, 11, 12], [0, 0], [13, 14]] },
    { row: "C", groups: [[1, 2], [0, 0], [3, 4, 5, 6, 7, 8, 9, 10, 11, 12], [0, 0], [13, 14]] },
    { row: "B", groups: [[1, 2], [0, 0], [3, 4, 5, 6, 7, 8, 9, 10, 11, 12], [0, 0], [13, 14]] },
    { row: "A", groups: [[1, 2], [0, 0], [3, 4, 5, 6, 7, 8, 9, 10, 11, 12], [0, 0], [13, 14]] },
];

function getSeatClass(isBooked, isSelected) {
    const base =
        "w-[38px] h-[32px] rounded-[7px] border-[1.5px] flex items-center justify-center transition-all duration-150 cursor-pointer";

    if (isBooked)
        return `${base} bg-[#0d2018] border-[#166534] text-[#16a34a] cursor-not-allowed`;
    if (isSelected)
        return `${base} bg-red-300 border-red-700 shadow-[0_0_6px_rgba(34,197,94,0.25)]`;
    return `${base} bg-[#1e1e1e] border-[#2a2a2a] text-[#555] hover:bg-[#252525] hover:border-green-500 hover:text-green-500`;
}


const getTime = () => {
    const result = Date.now() + 1000 * 60 * 2
    return result;
};

const getTomorrowDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return date.toISOString().split("T")[0];
};


export default function SeatPlan() {
    const [selectedDate, setSelectedDate] = useState(() => getTomorrowDate());
    const [selected, setSelected] = useState(new Set());
    const [bookedSeats, setBookedSeats] = useState(new Set(["J1", "J2", "H3", "H4", "G5", "G6, G7", "F8", "E9", "D10", "C11", "B12", "A13"]));
    const [selectedMovie, setSelectedMovie] = useState({});
    const [hall, setHall] = useState({});

    const formattedDate = formatDisplay(selectedDate);
    const [reservationInformation, setReservationInformation] = useState({
        selectedDate: `${formattedDate.date} ${formattedDate.month}, ${formattedDate.year}`
    });


    const toggle = (id) => {
        if (bookedSeats.has(id)) return;

        const next = new Set(selected);
        next.has(id) ? next.delete(id) : next.add(id);

        setSelected(next);
        setReservationInformation((prev) => ({
            ...prev,
            selectedSeats: [...next].sort(),
        }));
    };

    const total = selected.size * PRICE;
    const selectedList = [...selected].sort();

    console.log(reservationInformation);



    return (
        <div className="bg-[#0a0a0a] min-h-screen border w-full flex gap-5 mx-auto justify-center font-sans">

            <div className="max-w-222.5 overflow-x-auto">

                <div className="mt-8">
                    <DateAndVenue
                        reservationInformation={reservationInformation}
                        setReservationInformation={setReservationInformation}
                        selectedDate={selectedDate} setSelectedDate={setSelectedDate}
                    />
                </div>

                <div className="my-8">
                    <MovieList 
                        setReservationInformation={setReservationInformation}
                        reservationInformation={reservationInformation} 
                        selectedMovie={selectedMovie} 
                        setSelectedMovie={setSelectedMovie}
                    />
                </div>

                <div className="mb-8">
                    <SelectShowTime setReservationInformation={setReservationInformation} />
                </div>

                {/* Seat Map */}
                <div className="w-full flex items-center justify-between border-b border-[#555]/50 pb-6">
                    <Timer valueStyle={{ color: "#555", fontSize: "14px" }} format="mm:ss" type="countdown" value={getTime()} />
                    <div className="flex gap-5">
                        <div className="flex items-center gap-2">
                            <button className={"bg-[#0d2018] border-[#16a34a] w-9.5 h-8 rounded-[7px] border-[1.5px] flex items-center justify-center transition-all duration-150 cursor-pointer"}>
                                <Armchair color="#16a34a" />
                            </button>
                            <h6 className="text-sm  text-left leading-tight text-[#555]">Available</h6>
                        </div>
                        <div className="flex items-center gap-2">

                            <button className={"bg-red-300 border-red-700 w-9.5 h-8 rounded-[7px] border-[1.5px] flex items-center justify-center transition-all duration-150 cursor-pointer"}>
                                <Armchair className="fill-red-700 stroke-none" />
                            </button>
                            <h6 className="text-sm  text-left leading-tight text-[#555]">Selected</h6>
                        </div>
                        <div className="flex items-center  gap-2">
                            <button className={"bg-[#1e1e1e] border-[#2a2a2a] text-[#555] w-9.5 h-8 rounded-[7px] border-[1.5px] flex items-center justify-center transition-all duration-150 cursor-pointer"}>
                                <Armchair />
                            </button>
                            <h6 className="text-sm text-left leading-tight text-[#555]">Not Available</h6>
                        </div>
                    </div>
                </div>

                <div className="max-w-222.5 overflow-x-auto mt-10">
                    <div className="inline-block min-w-max">
                        <ul className="flex flex-col gap-1.5">

                            {LAYOUT.map(({ row, groups }) => {
                                return (
                                    <li key={row} className="flex items-center gap-1.5">

                                        {/* Left label */}
                                        <span className="w-5.5 text-center text-[11px] font-semibold text-[#444] shrink-0">
                                            {row}
                                        </span>

                                        {/* Seat groups */}
                                        <div className="flex gap-1.5 items-center">
                                            {groups.map((nums, gi) =>
                                                nums.map((n, index) => {
                                                    const id = `${row}${n}`;
                                                    const isHidden = n === 0;
                                                    const isBooked = bookedSeats.has(id);
                                                    const isSelected = selected.has(id);
                                                    return (
                                                        <button
                                                            key={index}
                                                            className={getSeatClass(isBooked, isSelected)}
                                                            disabled={isBooked}
                                                            onClick={() => toggle(id)}
                                                            style={{
                                                                visibility: isHidden ? 'hidden' : 'visible',
                                                                cursor: isBooked ? 'not-allowed' : 'pointer'
                                                            }}
                                                        >
                                                            <Armchair className={`${isSelected ? 'fill-red-700 stroke-none' : ''}`} />
                                                        </button>
                                                    );
                                                })
                                            )}
                                        </div>

                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>

            </div>
            <div className="w-75 shrink-0">
                <TicketSummary 
                    date={selectedDate}
                    reservationInformation={reservationInformation}
                    movieTitle={selectedMovie?.movieTitle || ""} 
                    moviePoster={selectedMovie?.moviePoster || ""} 
                    selectedSeats={selectedList} 
                    ticketQty={selectedList?.length} 
                    totalAmount={total}
                />
            </div>

        </div>
    );
}


