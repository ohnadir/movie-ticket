// Complete Booking Flow Example
// components/BookingFlow.jsx

import React, { useState } from 'react'
import Ticket from './TicketWithPDF'

const BookingFlow = () => {
    const [step, setStep] = useState('select-movie') // select-movie -> select-seats -> payment -> confirmation
    const [bookingData, setBookingData] = useState({
        movieName: 'Asterix: The Land of the Gods',
        language: 'ENGLISH - 3D',
        movieClass: 'Gold Class',
        date: '16 FEB',
        time: '9:30 PM',
        duration: '2h 20 min',
        seats: [],
        cinema: 'START CINEPLEX',
        location: 'SK TOWER, MOHAKHALI',
        bookingId: '',
        customerEmail: '',
        totalPrice: 0
    })
    const [isLoading, setIsLoading] = useState(false)
    const [ticketSent, setTicketSent] = useState(false)

    // Step 1: Movie Selection
    const handleSelectMovie = (movie) => {
        setBookingData(prev => ({
            ...prev,
            movieName: movie.name,
            language: movie.language,
            movieClass: movie.class,
            date: movie.date,
            time: movie.time,
            cinema: movie.cinema,
            location: movie.location
        }))
        setStep('select-seats')
    }

    // Step 2: Seat Selection
    const handleSelectSeats = (selectedSeats) => {
        const pricePerSeat = 500 // 500 টাকা প্রতি সিট
        setBookingData(prev => ({
            ...prev,
            seats: selectedSeats,
            totalPrice: selectedSeats.length * pricePerSeat
        }))
        setStep('payment')
    }

    // Step 3: Payment Processing
    const handlePaymentSuccess = async (paymentId) => {
        setIsLoading(true)
        try {
            // Booking confirm করুন
            const bookingId = `BK${Date.now()}`
            setBookingData(prev => ({
                ...prev,
                bookingId
            }))

            // Database এ save করুন
            await fetch('/api/save-booking', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    bookingId,
                    ...bookingData,
                    paymentId
                })
            })

            setStep('confirmation')
        } catch (error) {
            alert('Booking failed: ' + error.message)
        } finally {
            setIsLoading(false)
        }
    }

    // Step 4: Send Ticket Email
    const handleSendTicket = async () => {
        setIsLoading(true)
        try {
            const response = await fetch('/api/send-ticket-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: bookingData.customerEmail,
                    ticketData: {
                        bookingId: bookingData.bookingId,
                        movieName: bookingData.movieName,
                        language: bookingData.language,
                        movieClass: bookingData.movieClass,
                        date: bookingData.date,
                        time: bookingData.time,
                        duration: bookingData.duration,
                        seats: bookingData.seats,
                        cinema: bookingData.cinema,
                        location: bookingData.location
                    }
                })
            })

            if (response.ok) {
                setTicketSent(true)
                alert('✅ আপনার টিকিট email এ পাঠানো হয়েছে!')
            } else {
                alert('❌ Email পাঠাতে ব্যর্থ হয়েছে')
            }
        } catch (error) {
            alert('Error: ' + error.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Progress Bar */}
            <div className="bg-gray-900 p-4 sticky top-0 z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center justify-between mb-4">
                        <span className={`step ${step === 'select-movie' ? 'active' : ''}`}>
                            1. মুভি নির্বাচন
                        </span>
                        <span className={`step ${step === 'select-seats' ? 'active' : ''}`}>
                            2. সিট নির্বাচন
                        </span>
                        <span className={`step ${step === 'payment' ? 'active' : ''}`}>
                            3. পেমেন্ট
                        </span>
                        <span className={`step ${step === 'confirmation' ? 'active' : ''}`}>
                            4. নিশ্চিতকরণ
                        </span>
                    </div>
                    <div className="w-full bg-gray-700 h-1 rounded">
                        <div 
                            className="bg-green-600 h-1 rounded transition-all"
                            style={{
                                width: `${
                                    step === 'select-movie' ? '25%' :
                                    step === 'select-seats' ? '50%' :
                                    step === 'payment' ? '75%' : '100%'
                                }`
                            }}
                        ></div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-6xl mx-auto p-6">
                
                {/* Step 1: Select Movie */}
                {step === 'select-movie' && (
                    <div>
                        <h2 className="text-3xl font-bold mb-6">🎬 মুভি বেছে নিন</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                {
                                    name: 'Asterix: The Land of the Gods',
                                    language: 'ENGLISH - 3D',
                                    class: 'Gold Class',
                                    date: '16 FEB',
                                    time: '9:30 PM',
                                    cinema: 'START CINEPLEX',
                                    location: 'SK TOWER, MOHAKHALI',
                                    image: 'https://res.cloudinary.com/ddqovbzxy/image/upload/v1775355667/177400593321790_m9a1b6.jpg'
                                },
                                {
                                    name: 'Avatar: The Way of Water',
                                    language: 'ENGLISH - 3D',
                                    class: 'Premium',
                                    date: '16 FEB',
                                    time: '11:00 PM',
                                    cinema: 'DHAKA PREMIERE',
                                    location: 'GULSHAN',
                                    image: 'https://via.placeholder.com/300x400'
                                },
                                {
                                    name: 'Dune: Part Two',
                                    language: 'ENGLISH - IMAX',
                                    class: 'Gold Class',
                                    date: '17 FEB',
                                    time: '3:00 PM',
                                    cinema: 'BLOCKBUSTER CINEMA',
                                    location: 'BANANI',
                                    image: 'https://via.placeholder.com/300x400'
                                }
                            ].map((movie, idx) => (
                                <div 
                                    key={idx}
                                    className="bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all cursor-pointer"
                                    onClick={() => handleSelectMovie(movie)}
                                >
                                    <img src={movie.image} alt={movie.name} className="w-full h-64 object-cover" />
                                    <div className="p-4">
                                        <h3 className="font-bold text-lg mb-2">{movie.name}</h3>
                                        <p className="text-sm text-gray-400 mb-2">{movie.language}</p>
                                        <button className="w-full bg-green-600 hover:bg-green-700 py-2 rounded font-semibold">
                                            নির্বাচন করুন
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Step 2: Select Seats */}
                {step === 'select-seats' && (
                    <div>
                        <h2 className="text-3xl font-bold mb-6">🪑 সিট বেছে নিন</h2>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2 bg-gray-900 p-6 rounded-lg">
                                <div className="text-center mb-6">
                                    <p className="text-gray-400 text-sm mb-2">SCREEN</p>
                                    <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
                                </div>

                                {/* Seating Grid */}
                                <div className="space-y-2 max-w-md mx-auto">
                                    {Array.from({ length: 9 }).map((_, row) => (
                                        <div key={row} className="flex gap-2 justify-center items-center">
                                            <span className="w-6 text-center text-xs text-gray-500">
                                                {String.fromCharCode(65 + row)}
                                            </span>
                                            <div className="flex gap-1">
                                                {Array.from({ length: 16 }).map((_, col) => {
                                                    const seatId = `${String.fromCharCode(65 + row)}${col + 1}`
                                                    const isSelected = bookingData.seats.includes(seatId)
                                                    const isBooked = ['E6', 'E7', 'E8', 'E9'].includes(seatId)

                                                    return (
                                                        <button
                                                            key={seatId}
                                                            onClick={() => {
                                                                if (isBooked) return
                                                                const newSeats = isSelected
                                                                    ? bookingData.seats.filter(s => s !== seatId)
                                                                    : [...bookingData.seats, seatId]
                                                                setBookingData(prev => ({
                                                                    ...prev,
                                                                    seats: newSeats.sort()
                                                                }))
                                                            }}
                                                            disabled={isBooked}
                                                            className={`w-5 h-5 rounded text-xs font-bold transition-all ${
                                                                isBooked ? 'bg-red-600 cursor-not-allowed' :
                                                                isSelected ? 'bg-green-600' :
                                                                'bg-gray-600 hover:bg-gray-500'
                                                            }`}
                                                        >
                                                        </button>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Legend */}
                                <div className="mt-6 flex gap-6 justify-center text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 bg-gray-600 rounded"></div>
                                        <span>উপলব্ধ</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 bg-green-600 rounded"></div>
                                        <span>নির্বাচিত</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 bg-red-600 rounded"></div>
                                        <span>বুক করা</span>
                                    </div>
                                </div>
                            </div>

                            {/* Summary */}
                            <div className="bg-gray-900 p-6 rounded-lg h-fit sticky top-24">
                                <h3 className="text-xl font-bold mb-4">📋 সারসংক্ষেপ</h3>
                                <div className="space-y-3 text-sm mb-6">
                                    <div className="flex justify-between">
                                        <span>মুভি:</span>
                                        <span className="text-right max-w-xs">{bookingData.movieName}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>তারিখ ও সময়:</span>
                                        <span>{bookingData.date} | {bookingData.time}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>সিট:</span>
                                        <span className="text-green-400 font-bold">
                                            {bookingData.seats.length > 0 ? bookingData.seats.join(', ') : 'নির্বাচন করুন'}
                                        </span>
                                    </div>
                                    <hr className="border-gray-700" />
                                    <div className="flex justify-between text-lg font-bold">
                                        <span>মোট:</span>
                                        <span className="text-green-400">৳ {bookingData.totalPrice}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleSelectSeats(bookingData.seats)}
                                    disabled={bookingData.seats.length === 0}
                                    className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 py-3 rounded font-bold"
                                >
                                    পরবর্তী: পেমেন্ট
                                </button>

                                <button
                                    onClick={() => setStep('select-movie')}
                                    className="w-full bg-gray-700 hover:bg-gray-600 py-3 rounded font-bold mt-2"
                                >
                                    ফিরে যান
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 3: Payment */}
                {step === 'payment' && (
                    <div className="max-w-2xl mx-auto">
                        <h2 className="text-3xl font-bold mb-6">💳 পেমেন্ট</h2>
                        <div className="bg-gray-900 p-6 rounded-lg mb-6">
                            <h3 className="text-xl font-bold mb-4">অর্ডার সারসংক্ষেপ</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between pb-3 border-b border-gray-700">
                                    <span>টিকিট ({bookingData.seats.length}x ৳500)</span>
                                    <span>৳ {bookingData.totalPrice}</span>
                                </div>
                                <div className="flex justify-between pb-3 border-b border-gray-700">
                                    <span>প্রক্রিয়াকরণ ফি</span>
                                    <span>৳ 50</span>
                                </div>
                                <div className="flex justify-between text-lg font-bold pt-3">
                                    <span>মোট পেমেন্ট</span>
                                    <span>৳ {bookingData.totalPrice + 50}</span>
                                </div>
                            </div>
                        </div>

                        {/* Payment Methods */}
                        <div className="bg-gray-900 p-6 rounded-lg mb-6">
                            <h3 className="font-bold mb-4">পেমেন্ট পদ্ধতি বেছে নিন</h3>
                            <div className="space-y-3">
                                {['বিকাশ', 'নগদ', 'রকেট', 'ক্রেডিট কার্ড'].map((method) => (
                                    <label key={method} className="flex items-center p-3 border border-gray-700 rounded cursor-pointer hover:bg-gray-800">
                                        <input type="radio" name="payment" defaultChecked={method === 'বিকাশ'} className="mr-3" />
                                        <span>{method}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Email */}
                        <div className="bg-gray-900 p-6 rounded-lg mb-6">
                            <h3 className="font-bold mb-4">ইমেল ঠিকানা (টিকিটের জন্য)</h3>
                            <input
                                type="email"
                                placeholder="আপনার ইমেল..."
                                value={bookingData.customerEmail}
                                onChange={(e) => setBookingData(prev => ({
                                    ...prev,
                                    customerEmail: e.target.value
                                }))}
                                className="w-full bg-gray-800 text-white p-3 rounded border border-gray-700 focus:border-green-600 outline-none"
                            />
                        </div>

                        <button
                            onClick={() => handlePaymentSuccess('PAY' + Date.now())}
                            disabled={!bookingData.customerEmail || isLoading}
                            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 py-3 rounded font-bold text-lg mb-3"
                        >
                            {isLoading ? 'প্রক্রিয়াকরণ করছে...' : '✅ পেমেন্ট নিশ্চিত করুন'}
                        </button>

                        <button
                            onClick={() => setStep('select-seats')}
                            className="w-full bg-gray-700 hover:bg-gray-600 py-3 rounded font-bold"
                        >
                            ফিরে যান
                        </button>
                    </div>
                )}

                {/* Step 4: Confirmation */}
                {step === 'confirmation' && (
                    <div className="max-w-2xl mx-auto text-center">
                        <div className="text-6xl mb-6">✅</div>
                        <h2 className="text-4xl font-bold mb-4">আপনার বুকিং সফল!</h2>
                        <p className="text-gray-400 mb-8">আপনার টিকিট এখনই ডাউনলোড করুন বা ইমেলের জন্য অপেক্ষা করুন</p>

                        <div className="bg-gray-900 p-8 rounded-lg mb-8">
                            <Ticket {...bookingData} />
                        </div>

                        <div className="space-y-3 mb-8">
                            <button
                                onClick={handleSendTicket}
                                disabled={isLoading || ticketSent}
                                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 py-3 rounded font-bold"
                            >
                                {isLoading ? '📧 পাঠাচ্ছে...' : ticketSent ? '✅ ইমেল পাঠানো হয়েছে' : '📧 ইমেলে টিকিট পাঠান'}
                            </button>
                            <button
                                onClick={() => {
                                    const ticketRef = document.querySelector('[data-ticket]')
                                    if (ticketRef) {
                                        html2pdf().set({
                                            filename: `ticket-${bookingData.bookingId}.pdf`
                                        }).from(ticketRef).save()
                                    }
                                }}
                                className="w-full bg-green-600 hover:bg-green-700 py-3 rounded font-bold"
                            >
                                📥 PDF ডাউনলোড করুন
                            </button>
                        </div>

                        <button
                            onClick={() => window.location.href = '/'}
                            className="w-full bg-gray-700 hover:bg-gray-600 py-3 rounded font-bold"
                        >
                            হোম পেজে ফিরুন
                        </button>
                    </div>
                )}
            </div>

            <style jsx>{`
                .step {
                    @apply text-sm font-semibold text-gray-500 transition-all;
                }
                .step.active {
                    @apply text-green-500;
                }
            `}</style>
        </div>
    )
}

export default BookingFlow