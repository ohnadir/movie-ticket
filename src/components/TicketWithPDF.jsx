import { PartyPopper } from 'lucide-react'
import { useState, useRef } from 'react'
import html2pdf from 'html2pdf.js'

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

const Ticket = ({ 
    movieName = "Asterix: The Land of the Gods",
    language = "ENGLISH - 3D",
    movieClass = "Gold Class",
    date = "16 FEB",
    time = "9:30 PM",
    duration = "2h 20 min",
    seats = ["E6", "E7", "E8", "E9"],
    cinema = "START CINEPLEX",
    location = "SK TOWER, MOHAKHALI",
    bookingId = "BK2025041451293",
    backgroundImage = "https://res.cloudinary.com/ddqovbzxy/image/upload/v1775355667/177400593321790_m9a1b6.jpg"
}) => {
    const ticketRef = useRef(null)
    const [bookedSeats, setBookedSeats] = useState(new Set(seats))

    const downloadPDF = () => {
        if (!ticketRef.current) return

        const options = {
            margin: 5,
            filename: `ticket-${bookingId}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
        }

        html2pdf().set(options).from(ticketRef.current).save()
    }

    const sendPDFbyEmail = async () => {
        try {
            // এই ফাংশন আপনার backend API কে call করবে
            const response = await fetch('/api/send-ticket-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    bookingId,
                    movieName,
                    seats,
                    email: 'customer@example.com', // dynamic email যুক্ত করুন
                    ticketData: {
                        movieName,
                        language,
                        movieClass,
                        date,
                        time,
                        duration,
                        cinema,
                        location
                    }
                })
            })

            if (response.ok) {
                alert('Ticket email ভেজা হয়েছে!')
            }
        } catch (error) {
            console.error('Email পাঠাতে ত্রুটি:', error)
        }
    }

    return (
        <div className="min-h-screen bg-black p-4 flex items-center justify-center flex-col">
            {/* PDF Download Button */}
            <div className="mb-6 flex gap-4">
                <button
                    onClick={downloadPDF}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
                >
                    📥 PDF Download করুন
                </button>
                <button
                    onClick={sendPDFbyEmail}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                >
                    📧 Email এ পাঠান
                </button>
            </div>

            {/* Ticket Container - Reference for PDF */}
            <div ref={ticketRef} className="flex gap-5 bg-black p-4 rounded-lg" style={{ width: '800px' }}>
                
                {/* Left Ticket Card */}
                <div className="w-full max-w-75">
                    <div
                        className="relative bg-cover bg-center h-75 text-white flex items-end rounded-t-2xl"
                        style={{
                            backgroundImage: `url('${backgroundImage}')`,
                            WebkitMaskImage: `
                                radial-gradient(circle 15px at 0 0, transparent 98%, black 100%),
                                radial-gradient(circle 15px at 100% 0, transparent 98%, black 100%),
                                radial-gradient(circle 15px at 0 100%, transparent 98%, black 100%),
                                radial-gradient(circle 15px at 100% 100%, transparent 98%, black 100%),
                                linear-gradient(black, black)
                            `,
                            WebkitMaskComposite: "destination-out",
                            maskComposite: "exclude"
                        }}
                    >
                        <div className='bg-black/30 backdrop-blur-[2px] h-full w-full flex items-baseline-last p-6 rounded-t-2xl'>
                            <div>
                                <div className="bg-[#16a34a] text-white w-fit rounded-2xl px-2 py-1 text-xs font-bold tracking-widest mb-2">
                                    {movieClass}
                                </div>
                                <h1 className="text-white text-2xl font-bold leading-tight drop-shadow-lg">
                                    {movieName}
                                </h1>
                                <div className="text-white text-xs font-bold mt-2">
                                    {language}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* White Card Section */}
                    <div
                        className="bg-white rounded-b-2xl"
                        style={{
                            WebkitMaskImage: `
                                radial-gradient(circle 15px at 0 0, transparent 98%, black 100%),
                                radial-gradient(circle 15px at 100% 0, transparent 98%, black 100%),
                                radial-gradient(circle 15px at 0 100%, transparent 98%, black 100%),
                                radial-gradient(circle 15px at 100% 100%, transparent 98%, black 100%),
                                linear-gradient(black, black)
                            `,
                            WebkitMaskComposite: "destination-out",
                            maskComposite: "exclude"
                        }}
                    >
                        {/* Date & Time Row */}
                        <div className="flex items-center justify-between p-6">
                            <div>
                                <div className="text-[11px] uppercase text-gray-500 font-bold tracking-tight">
                                    Date
                                </div>
                                <div className="text-[16px] font-bold text-gray-900">{date}</div>
                            </div>
                            <div>
                                <div className="text-[11px] uppercase text-gray-500 font-bold tracking-tight">
                                    Time
                                </div>
                                <div className="text-[16px] font-bold text-gray-900">{time}</div>
                            </div>
                            <div>
                                <div className="text-[11px] uppercase text-gray-500 font-bold tracking-tight">
                                    Duration
                                </div>
                                <div className="text-[16px] font-bold text-gray-900">{duration}</div>
                            </div>
                        </div>

                        <div className='p-6 bg-[#16a34a]/10 flex items-center justify-between'>
                            <div>
                                <div className="text-[11px] uppercase text-gray-500 font-bold tracking-tight">
                                    Seats
                                </div>
                                <div className="text-[16px] font-bold text-gray-900">{seats.join(", ")}</div>
                            </div>
                            <PartyPopper stroke="#16a34a" size={40} strokeOpacity={0.3} />
                        </div>

                        {/* Cinema & Location */}
                        <div className='p-6'>
                            <div>
                                <div className="text-[11px] uppercase text-gray-500 font-bold tracking-tight">
                                    Cinema
                                </div>
                                <div className="text-[16px] font-bold text-gray-900">{cinema}</div>
                            </div>
                            <div className="text-xs text-gray-600">{location}</div>
                            <div className="text-xs text-gray-500 mt-4">
                                Booking ID: {bookingId}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Seating Card */}
                <div className="w-full max-w-75">
                    <div
                        className="relative h-75 bg-white rounded-t-2xl"
                        style={{
                            WebkitMaskImage: `
                                radial-gradient(circle 15px at 0 0, transparent 98%, black 100%),
                                radial-gradient(circle 15px at 100% 0, transparent 98%, black 100%),
                                radial-gradient(circle 15px at 0 100%, transparent 98%, black 100%),
                                radial-gradient(circle 15px at 100% 100%, transparent 98%, black 100%),
                                linear-gradient(black, black)
                            `,
                            WebkitMaskComposite: "destination-out",
                            maskComposite: "exclude"
                        }}
                    >
                        <div className='bg-black/30 backdrop-blur-[2px] h-full w-full flex items-baseline-last p-6 rounded-t-2xl'>
                            <div>
                                <div className="text-white text-xs font-bold mt-2">
                                    SHOW TIME
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* White Card Section */}
                    <div
                        className="bg-white rounded-b-2xl"
                        style={{
                            WebkitMaskImage: `
                                radial-gradient(circle 15px at 0 0, transparent 98%, black 100%),
                                radial-gradient(circle 15px at 100% 0, transparent 98%, black 100%),
                                radial-gradient(circle 15px at 0 100%, transparent 98%, black 100%),
                                radial-gradient(circle 15px at 100% 100%, transparent 98%, black 100%),
                                linear-gradient(black, black)
                            `,
                            WebkitMaskComposite: "destination-out",
                            maskComposite: "exclude"
                        }}
                    >
                        <div className="min-w-max p-6">
                            <ul className="flex flex-col gap-0.5">
                                {LAYOUT.map(({ row, groups }) => {
                                    return (
                                        <li key={row} className="flex items-center gap-0.5">
                                            <span className="w-4 text-center text-[9px] font-semibold text-[#444] shrink-0">
                                                {row}
                                            </span>
                                            <div className="flex gap-0.5 items-center">
                                                {groups.map((nums, gi) =>
                                                    nums.map((n, index) => {
                                                        const id = `${row}${n}`;
                                                        const isHidden = n === 0;
                                                        const isBooked = bookedSeats.has(id);
                                                        return (
                                                            <button
                                                                key={index}
                                                                style={{
                                                                    visibility: isHidden ? 'hidden' : 'visible',
                                                                }}
                                                                className={`w-2.75 h-2.75 rounded-xs ${isBooked ? "bg-[#16a34a]" : "bg-gray-400"}`}
                                                            >
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
            </div>
        </div>
    )
}

export default Ticket