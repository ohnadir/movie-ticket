import { useState } from "react";

const PRICE = 250;

const LAYOUT = [
  { row: "J", groups: [[1,2,3,4,5,6,7],[8,9,10,11]],             booked: ["J7"] },
  { row: "H", groups: [[1,2],[0, 0], [3,4,5,6],[7,8,9,10]],              booked: ["H10"] },
  { row: "G", groups: [[1,2],[3,4,5,6,7,8,9,10,11,12,13,14]],   booked: [] },
  { row: "F", groups: [[1,2],[3,4,5,6,7,8,9,10,11,12,13,14]],   booked: ["F12"] },
  { row: "E", groups: [[1,2],[3,4,5,6,7,8,9,10,11,12,13,14]],   booked: [] },
  { row: "D", groups: [[1,2],[3,4,5,6,7,8,9,10,11,12,13,14]],   booked: [] },
  { row: "C", groups: [[1,2,3,4,5,6,7,8,9,10,11,12]],            booked: [] },
  { row: "B", groups: [[1,2,3,4,5,6,7,8,9,10,11,12]],            booked: ["B11"] },
  { row: "A", groups: [[1,2,3,4,5,6,7,8,9,10,11,12]],            booked: [] },
];

function getSeatClass(isBooked, isSelected) {
  const base =
    "w-[38px] h-[32px] rounded-[7px] border-[1.5px] flex items-center justify-center text-[9.5px] font-semibold tracking-wide transition-all duration-150 cursor-pointer font-sans p-0";

  if (isBooked)
    return `${base} bg-[#0d2018] border-[#166534] text-[#16a34a] cursor-not-allowed`;
  if (isSelected)
    return `${base} bg-[#0f2a1a] border-green-500 text-green-500 shadow-[0_0_6px_rgba(34,197,94,0.25)]`;
  return `${base} bg-[#1e1e1e] border-[#2a2a2a] text-[#555] hover:bg-[#252525] hover:border-green-500 hover:text-green-500`;
}

export default function MovieSeatPlan() {
  const [selected, setSelected] = useState(new Set());

  const toggle = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const total = selected.size * PRICE;
  const selectedList = [...selected].sort().join(", ");

  return (
    <div className="bg-[#0a0a0a] min-h-screen border max-w-4xl border-red-400 flex mx-auto flex-col items-center py-6 pb-32 font-sans">

      {/* Scroll Hint */}
      <p className="text-xs text-[#555] mb-5 tracking-wide">
        <span className="text-[#444]">←</span> Scroll Left &amp; Right to View All Seats <span className="text-[#444]">→</span>
      </p>

      {/* Seat Map */}
      <div className="w-full overflow-x-auto px-4">
        <div className="inline-block min-w-max px-2">
          <ul className="flex flex-col gap-1.5">
            {LAYOUT.map(({ row, groups, booked }) => {
              const bookedSet = new Set(booked);
              console.log(groups)
              console.log(row)
              return (
                <li key={row} className="flex items-center gap-1.5">

                  {/* Left label */}
                  <span className="w-5.5 text-center text-[11px] font-semibold text-[#444] shrink-0">
                    {row}
                  </span>

                  {/* Seat groups */}
                  <div className="flex gap-5 items-center">
                    {groups.map((nums, gi) => (
                      <ul key={gi} className="flex gap-1">
                        {nums.map((n) => {
                          const id = `${row}${n}`;
                          const isBooked = bookedSet.has(id);
                          const isSelected = selected.has(id);
                          return (
                            <li key={id}>
                              <button
                                className={getSeatClass(isBooked, isSelected)}
                                disabled={isBooked}
                                onClick={() => !isBooked && toggle(id)}
                                title={isBooked ? `${id} — Booked` : `${id} — Available`}
                              >
                                {id}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    ))}
                  </div>

                  {/* Right label */}
                  <span className="w-5.5 text-center text-[11px] font-semibold text-[#444] shrink-0">
                    {row}
                  </span>

                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Legend */}
      <ul className="flex gap-5 justify-center mt-6">
        <li className="flex items-center gap-1.5 text-[11.5px] text-[#555]">
          <span className="w-5.5 h-5 rounded-[5px] border-[1.5px] bg-[#1e1e1e] border-[#2a2a2a] inline-block" />
          Available
        </li>
        <li className="flex items-center gap-1.5 text-[11.5px] text-[#555]">
          <span className="w-5.5 h-5 rounded-[5px] border-[1.5px] bg-[#0f2a1a] border-green-500 inline-block" />
          Selected
        </li>
        <li className="flex items-center gap-1.5 text-[11.5px] text-[#555]">
          <span className="w-5.5 h-5 rounded-[5px] border-[1.5px] bg-[#0d2018] border-[#166534] inline-block" />
          Booked
        </li>
      </ul>

      {/* Summary Bar */}
      {selected.size > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-[#111] border-t border-[#222] px-6 py-4 flex items-center justify-between flex-wrap gap-3">
          <div className="flex flex-col gap-0.75">
            <span className="text-[11px] text-[#555]">Selected Seats</span>
            <span className="text-[13px] font-bold text-[#ccc]">
              {selected.size} Seat{selected.size > 1 ? "s" : ""}
            </span>
            <span className="text-[11px] text-[#555] max-w-70 truncate">
              {selectedList}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[22px] font-extrabold text-green-500">
              ৳ {total.toLocaleString()}
            </span>
            <button className="bg-green-500 hover:bg-green-600 text-white border-none rounded-lg px-5 py-2.25 font-bold text-[13px] tracking-wide cursor-pointer transition-colors duration-150">
              Confirm Booking
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


