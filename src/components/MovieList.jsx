import { Check } from 'lucide-react';

const movies = [
    {
        movieTitle: "THey Will Kill you",
        duration: "2h33 min",
        screenType: "3D",
        moviePoster: "https://image.cineplexbd.com/movies/177487017467712.webp"
    },
    {
        movieTitle: "Bonolota Express",
        duration: "2h15 min",
        screenType: "2D",
        moviePoster: "https://image.cineplexbd.com/movies/177400351957899.webp"
    },
    {
        movieTitle: "Domm",
        duration: "2h00 min",
        screenType: "2D",
        moviePoster: "https://image.cineplexbd.com/movies/177400354480384.webp"
    },
    {
        movieTitle: "Prince: Once upon a time in dhaka",
        duration: "2h20 min",
        screenType: "2D",
        moviePoster: "https://res.cloudinary.com/ddqovbzxy/image/upload/v1775355788/177400381422656_nogcjb.jpg"
    },
    {
        movieTitle: "Pressure Cooker",
        duration: "2h10 min",
        screenType: "3D",
        moviePoster: "https://res.cloudinary.com/ddqovbzxy/image/upload/v1775355667/177400593321790_m9a1b6.jpg"
    },

]

const MovieList = ({ selectedMovie, setSelectedMovie, setReservationInformation, reservationInformation }) => {


    return (
        <div >
            {/* Movie List */}
            <div>
                <h2 className='text-2xl font-bold text-[#E5E7EB] mb-4'>Select Movies ({movies?.length})</h2>
                <ul className='flex gap-4 overflow-x-auto pb-2'>
                    {movies.map((movie, index) => {
                        const { movieTitle, moviePoster } = movie;
                        return (
                            <li
                                key={index}
                                className='flex flex-col shrink-0 cursor-pointer'
                                style={{ width: "120px" }}
                                onClick={() => 
                                    setReservationInformation((prev) => ({ 
                                        ...prev, 
                                        movieTitle: movie.movieTitle,
                                        duration: movie.duration,
                                        screenType: movie.screenType, 
                                        moviePoster: movie.moviePoster
                                    }))
                                }
                            >
                                {/* Poster */}
                                <div className='relative w-full'>
                                    <div
                                        style={{
                                            width: "120px",
                                            borderRadius: "6px"
                                        }}
                                        className={`border border-transparent`}
                                    >

                                        <img
                                            src={moviePoster}
                                            alt={movieTitle}
                                            style={{
                                                overflowClipMargin: "content-box",
                                                overflow: "clip",
                                                verticalAlign: "middle",
                                                width: "100%",
                                                height: "180px",
                                                display: "block"
                                            }}
                                            className=" overflow-clip float-left  rounded-lg "
                                        />
                                        {reservationInformation?.movieTitle === movieTitle && (
                                            <>
                                                <div
                                                    className='absolute inset-0 rounded-lg'
                                                    style={{ background: "rgba(22,163,74,0.35)" }}
                                                />
                                                <div
                                                    className='absolute inset-0 rounded-lg border-2 border-[#16a34a]'
                                                />
                                                <div
                                                    className='absolute inset-0 flex items-center justify-center'
                                                >
                                                    <div className='bg-[#16a34a] rounded-full w-8 h-8 flex items-center justify-center'>
                                                        <Check size={16} color='white' strokeWidth={3} />
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>

                                </div>

                                {/* Title */}
                                <h3 className={`text-sm mt-2 text-left leading-tight  ${reservationInformation?.movieTitle === movieTitle ? 'text-[#16a34a]' : 'text-[#E5E7EB]'} font-semibold`}>
                                    {movieTitle}
                                </h3>
                            </li>
                        );
                    })}
                </ul>

            </div>
        </div>
    )
}

export default MovieList
