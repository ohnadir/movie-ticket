import { useState } from "react";
import { Check } from "lucide-react";

export default function TicketSummary({
    location = "SMS",
    reservationInformation = {},
}) {
    const [ticketFor, setTicketFor] = useState("YOU");
    const [othersName, setOthersName] = useState("");
    const [othersMobile, setOthersMobile] = useState("");
    const totalAmount = reservationInformation?.price * reservationInformation?.ticketQty;


    const rows = [
        { label: "Location", value: location, purple: true },
        { label: "Show Date", value: reservationInformation?.selectedDate || "--" },
        { label: "Hall Name", value: reservationInformation?.movieTitle && reservationInformation?.movieTitle?.length > 18 ? reservationInformation?.movieTitle?.slice(0, 18) + "..." : reservationInformation?.movieTitle || "--" },
        { label: "Show Time", value: reservationInformation?.selectedTime|| "--"  },
        { label: "Seat Type", value: reservationInformation?.seatType || "--", purple: true },
        { label: "Ticket Quantity", value: reservationInformation?.ticketQty || "--"  },
        { label: "Selected Seat", value: reservationInformation?.selectedSeats?.length ? reservationInformation?.selectedSeats?.map((seat) => seat).join(", ") : "--" },
        { label: "Total Amount", value: `${totalAmount ? totalAmount : "0"} BDT`, purple: true },
    ];

    const handlePurchase = () => {
        const purchaseData = {
            ...reservationInformation,
            ticketFor,
            othersName: ticketFor === "OTHERS" ? othersName : null,
            othersMobile: ticketFor === "OTHERS" ? othersMobile : null,
        }

        console.log(purchaseData);
    };
    

    return (
        <div className="bg-white rounded-2xl p-5 max-w-sm shadow-md font-sans">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Tickets Summary</h2>

            {/* Movie Block */}
            <div className="rounded-xl p-3 flex gap-3 mb-5 bg-[#16a34a]/10  border border-[#16a34a]/20">
                <div className="w-20 shrink-0 rounded-md border border-red-600">
                    <img
                        src={reservationInformation?.moviePoster}
                        alt={reservationInformation?.movieTitle}
                        style={{
                            overflowClipMargin: "content-box",
                            overflow: "clip",
                            verticalAlign: "middle",
                            height: "110px",
                            maxWidth: "100%",
                            width: "100%",
                            display: "block"
                        }}
                        className=" overflow-clip float-left rounded-md"
                    />
                </div>
                <div >
                    <span className="text-xs font-semibold text-[#16a34a] bg-[#16a34a]/10 px-2 py-0.5 rounded border border-[#16a34a]/20">
                        {reservationInformation?.screenType}
                    </span>
                    <p className="text-[#16a34a] font-bold text-sm my-2 text-left leading-tight ">{reservationInformation?.movieTitle} </p>
                    <p className="text-gray-400 text-xs">Duration - {reservationInformation?.duration}</p>
                </div>
            </div>

            {/* Info Rows */}
            {
                rows.map(({ label, value, purple }) => (
                    <div key={label} className="flex justify-between items-center py-2.5 border-b border-[#16a34a]/20 last:border-0">
                        <span className="text-gray-500 text-sm">{label}</span>
                        <span className={`text-sm font-semibold ${purple ? "text-[#16a34a]" : "text-gray-900"}`}>
                            {value}
                        </span>
                    </div>
                ))
            }

            {/* Ticket For */}
            <div className="flex items-center gap-3 mt-4">
                <span className="text-gray-500 text-sm flex-1">Ticket For</span>
                {["YOU", "OTHERS"].map((opt) => (
                    <button
                        key={opt}
                        onClick={() => setTicketFor(opt)}
                        className="cursor-pointer flex items-center gap-1.5 text-[12px] font-semibold text-gray-800"
                    >
                        <div
                            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${ticketFor === opt ? "bg-[#16a34a] border-[#16a34a]" : "border-gray-300"
                                }`}
                        >
                            {ticketFor === opt && <Check size={10} color="white" strokeWidth={3} />}
                        </div>
                        {opt}
                    </button>
                ))}
            </div>

            {/* Others Fields */}
            {
                ticketFor === "OTHERS" && (
                    <div className="mt-3 flex flex-col gap-2">
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={othersName}
                            onChange={(e) => setOthersName(e.target.value)}
                            className="w-full border border-[#16a34a]/20 rounded-lg px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-[#16a34a] focus:ring-1 focus:ring-[#16a34a]/30"
                        />
                        <input
                            type="tel"
                            placeholder="Mobile Number"
                            value={othersMobile}
                            onChange={(e) => setOthersMobile(e.target.value)}
                            className="w-full border border-[#16a34a]/20 rounded-lg px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-[#16a34a] focus:ring-1 focus:ring-[#16a34a]/30"
                        />
                    </div>
                )
            }

            {/* Purchase Button */}
            <button
                onClick={handlePurchase}
                className="w-full cursor-pointer bg-[#16a34a] hover:bg-[#16a34a]/90 text-white font-bold tracking-widest text-sm py-3 rounded-xl mt-4"
            >
                PURCHASE TICKET
            </button>

            <p className="text-xs text-gray-400 text-center mt-3 leading-relaxed">
                By clicking the Purchase Tickets you are accepting {" "}
                <a href="#" className="text-[#16a34a] underline">
                    Terms & Conditions
                </a> {" "}
                of Star Cineplex.
            </p>
        </div >
    );
}