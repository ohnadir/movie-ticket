import {PartyPopper } from 'lucide-react'
import { useState } from 'react'


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


const Ticket = () => {
    const [bookedSeats, setBookedSeats] = useState(new Set(["E6", "E7", "E8", "E9"]));
    return (
        <div className="min-h-screen bg-black p-4 flex items-center justify-center">
            <div className="w-full max-w-75">

                <div
                    className="relative bg-cover bg-center h-75 text-white flex items-end"
                    style={{
                        backgroundImage: "url('https://res.cloudinary.com/ddqovbzxy/image/upload/v1775355667/177400593321790_m9a1b6.jpg')",
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
                    <div className='bg-black/30 backdrop-blur-[2px] h-full w-full flex items-baseline-last p-6'>
                        <div >
                            <div className="bg-[#16a34a] text-white w-fit rounded-2xl px-2 py-1 text-xs font-bold tracking-widest mb-2">
                                Gold Class
                            </div>
                            <h1 className="text-white text-2xl font-bold leading-tight drop-shadow-lg">
                                Asterix: The Land of the Gods
                            </h1>
                            <div className="text-white text-xs font-bold mt-2">
                                ENGLISH - 3D
                            </div>
                        </div>
                    </div>
                </div>

                {/* White Card Section */}
                <div
                    className="bg-white"
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
                            <div className="text-[16px] font-bold text-gray-900">16 FEB</div>
                        </div>
                        <div>
                            <div className="text-[11px] uppercase text-gray-500 font-bold tracking-tight">
                                Time
                            </div>
                            <div className="text-[16px] font-bold text-gray-900">9:30 PM</div>
                        </div>

                        {/* Duration Row */}
                        <div>
                            <div className="text-[11px] uppercase text-gray-500 font-bold tracking-tight">
                                Duration
                            </div>
                            <div className="text-[16px] font-bold text-gray-900">2h 20 min</div>
                        </div>
                    </div>

                    <div className='p-6 bg-[#16a34a]/10 flex items-center justify-between'>
                        <div>
                            <div className="text-[11px] uppercase text-gray-500 font-bold tracking-tight">
                                Seats
                            </div>
                            <div className="text-[16px] font-bold text-gray-900">E6, E7, E8, E9</div>
                        </div>
                        <PartyPopper stroke="#16a34a" size={40} strokeOpacity={0.3} />
                    </div>



                    {/* Cinema & Location */}
                    <div className='p-6'>
                        <div>
                            <div className="text-[11px] uppercase text-gray-500 font-bold tracking-tight">
                                Cinema
                            </div>
                            <div className="text-[16px] font-bold text-gray-900">START CINEPLEX</div>
                        </div>
                        <div className="text-xs text-gray-600">SK TOWER, MOHAKHALI</div>
                    </div>
                </div>
            </div>
            
            <div className="w-full max-w-75 ml-5">

                <div
                    className="relative h-75 bg-white"
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
                    <div className='bg-black/30 backdrop-blur-[2px] h-full w-full flex items-baseline-last p-6'>
                        <div>
                            <div className="text-white text-xs font-bold mt-2">
                                SHOW TIME
                            </div>
                        </div>
                    </div>
                </div>

                {/* White Card Section */}
                <div
                    className="bg-white"
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
                        <ul className="flex flex-col gap-0.5" >

                            {LAYOUT.map(({ row, groups }) => {
                                return (
                                    <li key={row} className="flex items-center gap-0.5">

                                        {/* Left label */}
                                        <span className="w-4 text-center text-[9px] font-semibold text-[#444] shrink-0">
                                            {row}
                                        </span>

                                        {/* Seat groups */}
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
    )
}

export default Ticket