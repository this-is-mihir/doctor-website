import { useState, useRef, useEffect } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

export default function CustomDatePicker({ name, value, onChange, placeholder = "Select a date", required, min }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const wrapperRef = useRef(null);

  // Use provided value or null if empty
  const selectedDate = value ? new Date(value) : null;
  const minDate = min ? new Date(min) : new Date(new Date().setHours(0,0,0,0));

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

  const handlePrevMonth = (e) => {
    e.stopPropagation();
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = (e) => {
    e.stopPropagation();
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleSelectDate = (day) => {
    const date = new Date(Date.UTC(currentMonth.getFullYear(), currentMonth.getMonth(), day));
    // Check if date is before minDate
    const testDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    if (testDate < minDate) return;

    // Format as YYYY-MM-DD for the form input
    const formatted = date.toISOString().split('T')[0];
    onChange({ target: { name, value: formatted } });
    setIsOpen(false);
  };

  const isToday = (day) => {
    const today = new Date();
    return day === today.getDate() && currentMonth.getMonth() === today.getMonth() && currentMonth.getFullYear() === today.getFullYear();
  };

  const isSelected = (day) => {
    if (!selectedDate) return false;
    return day === selectedDate.getUTCDate() && currentMonth.getMonth() === selectedDate.getUTCMonth() && currentMonth.getFullYear() === selectedDate.getUTCFullYear();
  };

  const isDisabled = (day) => {
    const testDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return testDate < minDate;
  };

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  // Generate blank spaces for days before the 1st
  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => <div key={`blank-${i}`} className="cal-day empty" />);
  
  // Generate days of the month
  const days = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    const disabled = isDisabled(day);
    const selected = isSelected(day);
    const today = isToday(day);
    
    return (
      <div 
        key={day} 
        className={`cal-day ${disabled ? 'disabled' : ''} ${selected ? 'selected' : ''} ${today && !selected ? 'today' : ''}`}
        onClick={() => !disabled && handleSelectDate(day)}
      >
        {day}
      </div>
    );
  });

  // Format display date for the trigger button
  const displayDate = selectedDate ? selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' }) : placeholder;

  return (
    <div className="custom-datepicker-wrapper" ref={wrapperRef}>
      <input type="hidden" name={name} value={value || ''} required={required} />
      
      <div 
        className={`custom-datepicker-trigger ${isOpen ? 'open' : ''} ${!value ? 'placeholder' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{displayDate}</span>
        <CalendarIcon size={16} className="text-g400" style={{ color: 'var(--color-g400)' }} />
      </div>

      {isOpen && (
        <div className="custom-datepicker-dropdown">
          <div className="cal-header">
            <button type="button" className="cal-nav" onClick={handlePrevMonth}><ChevronLeft size={16} /></button>
            <div className="cal-month-year">{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</div>
            <button type="button" className="cal-nav" onClick={handleNextMonth}><ChevronRight size={16} /></button>
          </div>
          
          <div className="cal-grid">
            {dayNames.map(d => <div key={d} className="cal-day-name">{d}</div>)}
            {blanks}
            {days}
          </div>
        </div>
      )}

      <style>{`
        .custom-datepicker-wrapper { position: relative; width: 100%; user-select: none; }
        .custom-datepicker-trigger {
          display: flex; align-items: center; justify-content: space-between;
          width: 100%; padding: 0.85rem 1rem; font-size: 0.9rem;
          background-color: #fff; border: 1.5px solid var(--color-g200);
          border-radius: 10px; cursor: pointer; transition: all 0.2s ease;
          color: var(--color-dark);
        }
        .custom-datepicker-trigger:hover { border-color: var(--color-g300); }
        .custom-datepicker-trigger.open { border-color: var(--color-primary); box-shadow: 0 0 0 3px var(--color-primary-50); }
        .custom-datepicker-trigger.placeholder { color: var(--color-g400); }
        
        .custom-datepicker-dropdown {
          position: absolute; top: calc(100% + 4px); left: 0; 
          min-width: 280px; padding: 1rem;
          background: #fff; border: 1px solid var(--color-g200);
          border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.08);
          z-index: 50;
          animation: slideDownFade 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          transform-origin: top left;
        }
        
        .cal-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; }
        .cal-month-year { font-weight: 600; font-size: 0.95rem; color: var(--color-dark); }
        .cal-nav { background: none; border: 1px solid var(--color-g200); border-radius: 6px; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: var(--color-g500); transition: all 0.2s; }
        .cal-nav:hover { background: var(--color-g50); color: var(--color-dark); }
        
        .cal-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 0.2rem; text-align: center; }
        .cal-day-name { font-size: 0.75rem; font-weight: 600; color: var(--color-g400); margin-bottom: 0.5rem; }
        
        .cal-day {
          height: 32px; display: flex; align-items: center; justify-content: center;
          font-size: 0.85rem; border-radius: 8px; cursor: pointer; transition: all 0.2s;
          color: var(--color-g600);
        }
        .cal-day:not(.empty):not(.disabled):hover { background: var(--color-g100); color: var(--color-dark); }
        .cal-day.empty { cursor: default; }
        .cal-day.disabled { color: var(--color-g300); cursor: not-allowed; text-decoration: line-through; text-decoration-color: var(--color-g200); }
        
        .cal-day.today { background: var(--color-g50); font-weight: 600; color: var(--color-primary); }
        .cal-day.selected { background: var(--color-primary); color: #fff; font-weight: 600; box-shadow: 0 2px 8px rgba(8, 145, 178, 0.3); }
        
        @keyframes slideDownFade {
          from { opacity: 0; transform: translateY(-4px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
