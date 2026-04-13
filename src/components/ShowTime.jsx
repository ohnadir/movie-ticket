import { useState } from "react";
import { Halls } from "../mock/MockData";
import { Minus, Plus } from "lucide-react";

const MAX_TICKETS = 5;
export default function SelectShowTime({ setReservationInformation }) {
    const [selectedTimeKey, setSelectedTimeKey] = useState(null);
    const [selectedSeat, setSelectedSeat] = useState(null);
    const [ticketCount, setTicketCount] = useState(1);

    const selectedTimeObj = Halls
        .flatMap((h) => h.times.map((t) => ({ key: `${h.id}-${t.label}`, ...t })))
        .find((t) => t.key === selectedTimeKey);

    const handleTimeClick = (hallV, timeObj) => {
        const key = `${hallV.id}-${timeObj.label}`;
        if (selectedTimeKey === key) {
            setSelectedTimeKey(null);
            setSelectedSeat(null);
        } else {
            setSelectedTimeKey(key);
            setSelectedSeat(null);
            setReservationInformation((prev) => ({
                ...prev,
                ...hallV,
                selectedTime: timeObj?.label,
            }));
        }
    };

    const changeCount = (delta) => {
        setTicketCount((prev) => Math.max(0, Math.min(MAX_TICKETS, prev + delta)));
        setReservationInformation((prev) => ({
            ...prev,
            ticketQty: Math.max(0, Math.min(MAX_TICKETS, ticketCount + delta))
        }));
    };

    const handleChangeSeatType = (type) => {

        setReservationInformation((prev) => ({
            ...prev,
            seatType: type.type,
            price: type.price,
        }));
    }

    return (
        <div >

            <h2 className='text-2xl font-bold text-[#E5E7EB] mb-4'>Select Show Time</h2>

            <div className="flex flex-col gap-3">
                {Halls.map((hall) => (
                    <div
                        key={hall.id}
                        className="bg-[#E5E7EB] rounded-lg px-6 py-5 flex items-center justify-between"
                        style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}
                    >
                        <span className="text-base font-bold">
                            {hall.name}
                        </span>

                        <div className="flex gap-2 flex-wrap justify-end">
                            {hall.times.map((timeObj) => {
                                const key = `${hall.id}-${timeObj.label}`;
                                const isSel = selectedTimeKey === key;
                                return (
                                    <button
                                        key={timeObj.label}
                                        onClick={() => handleTimeClick(hall, timeObj)}
                                        className={`px-4 py-2 font-medium cursor-pointer rounded-md text-sm transition-all duration-200  border-[1.5px]
                                            ${isSel ? ' border-[#16a34a] bg-[#16a34a]/10 text-[#16a34a]' : 'border-[#9CA3AF] bg-transparent text-[#444]'
                                            }`
                                        }
                                    >
                                        {timeObj.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {/* Select Seat Type */}
            {selectedTimeObj && (
                <div className="w-full mt-6 gap-5 flex items-center justify-between">

                    {/* Seat Types with price */}
                    <div className="w-full">
                        <h2 className='text-2xl font-bold text-[#E5E7EB] mb-4'>Select Seat Type</h2>
                        <div className=" w-full flex items-center">

                            <div className="w-full flex flex-wrap gap-6 bg-[#E5E7EB] rounded-lg px-6 py-5">
                                {selectedTimeObj.seats.map((seat) => {
                                    const isSel = selectedSeat === seat.type;
                                    return (
                                        <div
                                            key={seat.type}
                                            onClick={() => { setSelectedSeat(seat.type); handleChangeSeatType(seat) }}
                                            className="flex items-center gap-3 cursor-pointer"
                                        >
                                            {/* Custom Radio */}
                                            <div
                                                className="shrink-0 rounded-full"
                                                style={{
                                                    width: 20,
                                                    height: 20,
                                                    border: isSel ? "6px solid #16a34a" : "2px solid #16a34a",
                                                    backgroundColor: "white",
                                                    boxSizing: "border-box",
                                                    transition: "border 0.15s",
                                                }}
                                            />
                                            <div>
                                                <p className="text-sm font-bold" style={{ fontFamily: "Georgia, serif", color: "#111" }}>
                                                    {seat.type}
                                                </p>
                                                <p className="text-xs text-[#6a707c]">
                                                    BDT {seat.price} Tk
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Ticket Quantity */}
                    <div className="w-full">
                        <h2 className='text-2xl font-bold text-[#E5E7EB] mb-4'>Ticket Quantity</h2>
                        <div
                            className="bg-[#E5E7EB] rounded-lg px-5 py-5 flex items-center gap-3"
                            style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}
                        >
                            {/* Minus */}
                            <button
                                onClick={() => changeCount(-1)}
                                className=" bg-[#16a34a]/30 flex items-center justify-center shrink-0 rounded-xl text-2xl font-bold transition-opacity"
                                style={{
                                    width: 42, height: 42,
                                    border: "none",
                                    cursor: ticketCount === 0 ? "not-allowed" : "pointer",
                                    opacity: ticketCount === 0 ? 0.5 : 1,
                                }}
                            >
                                <Minus color="#16a34a" size={22} />
                            </button>

                            {/* Count */}
                            <div className="flex-1 text-center">
                                <p className="font-bold" >
                                    {ticketCount} Ticket{ticketCount !== 1 ? "s" : ""}
                                </p>
                                <p className="text-xs text-[#6a707c]">
                                    Max {MAX_TICKETS} Tickets
                                </p>
                            </div>

                            {/* Plus */}
                            <button
                                onClick={() => changeCount(1)}
                                className="flex items-center justify-center shrink-0 rounded-xl text-2xl font-bold transition-opacity"
                                style={{
                                    width: 42, height: 42,
                                    background: "#16a34a",
                                    color: "white",
                                    border: "none",
                                    cursor: ticketCount === MAX_TICKETS ? "not-allowed" : "pointer",
                                    opacity: ticketCount === MAX_TICKETS ? 0.5 : 1,
                                }}

                                disabled={ticketCount === MAX_TICKETS}
                            >
                                <Plus size={22} />
                            </button>
                        </div>
                    </div>
                </div>

            )}
        </div>
    );
}