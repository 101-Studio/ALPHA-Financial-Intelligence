import React, { useState } from 'react';
import { EconomicEvent } from '../types';
import { Calendar as CalendarIcon, Clock, Globe, ArrowUpDown } from 'lucide-react';

interface EconomicCalendarProps {
  events: EconomicEvent[];
}

export const EconomicCalendar: React.FC<EconomicCalendarProps> = ({ events }) => {
  const [filterImportance, setFilterImportance] = useState<'all' | 'high' | 'medium'>('all');

  const filtered = events.filter((e) => {
    if (filterImportance === 'high') return e.importance === 'High';
    if (filterImportance === 'medium') return e.importance === 'High' || e.importance === 'Medium';
    return true;
  });

  return (
    <div className="mb-14">
      {/* Section Header */}
      <div className="border-b-2 border-stone-900 pb-3 mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-800">
            Global Macro & Policy Schedule
          </span>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-stone-950">
            Global Economic Calendar
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Central bank rate announcements, inflation indices, employment data, and ministerial summits formatted in Europe/Pristina local time.
          </p>
        </div>

        {/* Importance Filter */}
        <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg">
          {(['all', 'high', 'medium'] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => setFilterImportance(lvl)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors capitalize ${
                filterImportance === lvl
                  ? 'bg-white text-stone-950 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {lvl === 'all' ? 'All Events' : `${lvl} Impact`}
            </button>
          ))}
        </div>
      </div>

      {/* Calendar Table */}
      <div className="bg-white border border-stone-200 rounded-md overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200 text-[11px] font-bold text-stone-700 tracking-wider uppercase font-sans">
                <th className="py-3 px-4">Time (Pristina / EST)</th>
                <th className="py-3 px-4">Jurisdiction</th>
                <th className="py-3 px-4">Macro Event</th>
                <th className="py-3 px-4 text-center">Impact</th>
                <th className="py-3 px-4 text-right">Previous</th>
                <th className="py-3 px-4 text-right">Consensus</th>
                <th className="py-3 px-4 text-right">Actual</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-mono-nums">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-amber-50/30 transition-colors">
                  {/* Time */}
                  <td className="py-3.5 px-4 font-semibold text-stone-900 whitespace-nowrap">
                    <div>{item.timePristina} <span className="text-[10px] text-stone-400 font-normal">Pristina</span></div>
                    <div className="text-[10px] text-stone-400 font-normal">{item.timeEST} EST</div>
                  </td>

                  {/* Country */}
                  <td className="py-3.5 px-4 font-sans whitespace-nowrap">
                    <span className="font-semibold text-stone-800">{item.country}</span>
                  </td>

                  {/* Event Title & Source */}
                  <td className="py-3.5 px-4 font-sans">
                    <div className="font-semibold text-stone-950">{item.title}</div>
                    <div className="text-[11px] text-stone-400">Source: {item.source}</div>
                  </td>

                  {/* Importance */}
                  <td className="py-3.5 px-4 text-center whitespace-nowrap font-sans">
                    <span
                      className={`text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-xs ${
                        item.importance === 'High'
                          ? 'bg-rose-100 text-rose-900 font-semibold'
                          : 'bg-stone-100 text-stone-700'
                      }`}
                    >
                      {item.importance}
                    </span>
                  </td>

                  {/* Previous */}
                  <td className="py-3.5 px-4 text-right text-stone-600 whitespace-nowrap">
                    {item.previous}
                  </td>

                  {/* Forecast */}
                  <td className="py-3.5 px-4 text-right font-semibold text-stone-900 whitespace-nowrap">
                    {item.forecast}
                  </td>

                  {/* Actual */}
                  <td className="py-3.5 px-4 text-right whitespace-nowrap font-sans">
                    {item.actual ? (
                      <span className="font-bold text-stone-900">{item.actual}</span>
                    ) : (
                      <span className="text-stone-400 italic">Pending</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-3 bg-stone-50 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500 font-sans">
          <span>Times automatically synchronized to Europe/Pristina (CEST / CET daylight saving compliant).</span>
          <span className="font-mono-nums">Next update in 15m</span>
        </div>
      </div>
    </div>
  );
};
