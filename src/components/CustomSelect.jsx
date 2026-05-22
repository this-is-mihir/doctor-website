import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export default function CustomSelect({ options, value, onChange, placeholder, name, required }) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue) => {
    onChange({ target: { name, value: optionValue } });
    setIsOpen(false);
  };

  return (
    <div className="custom-select-wrapper" ref={selectRef}>
      {/* Hidden input for form submission and native validation if needed */}
      <input type="hidden" name={name} value={value} required={required} />
      
      <div 
        className={`custom-select-trigger ${isOpen ? 'open' : ''} ${!value ? 'placeholder' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{value ? options.find(opt => opt.value === value)?.label || value : placeholder}</span>
        <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {isOpen && (
        <div className="custom-select-dropdown">
          <ul className="custom-select-options">
            {options.map((option, index) => (
              <li 
                key={index}
                className={`custom-select-option ${value === option.value ? 'selected' : ''} ${option.disabled ? 'disabled' : ''}`}
                onClick={() => !option.disabled && handleSelect(option.value)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}

      <style>{`
        .custom-select-wrapper { position: relative; width: 100%; user-select: none; }
        .custom-select-trigger {
          display: flex; align-items: center; justify-content: space-between;
          width: 100%; padding: 0.85rem 1rem; font-size: 0.9rem;
          background-color: #fff; border: 1.5px solid var(--color-g200);
          border-radius: 10px; cursor: pointer; transition: all 0.2s ease;
          color: var(--color-dark);
        }
        .custom-select-trigger:hover { border-color: var(--color-g300); }
        .custom-select-trigger.open { border-color: var(--color-primary); box-shadow: 0 0 0 3px var(--color-primary-50); }
        .custom-select-trigger.placeholder { color: var(--color-g400); }
        
        .custom-select-dropdown {
          position: absolute; top: calc(100% + 4px); left: 0; right: 0;
          background: #fff; border: 1px solid var(--color-g200);
          border-radius: 10px; box-shadow: 0 10px 25px rgba(0,0,0,0.08);
          z-index: 50; overflow: hidden;
          animation: slideDown 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          transform-origin: top;
        }
        
        .custom-select-options { list-style: none; padding: 0.4rem; margin: 0; max-height: 250px; overflow-y: auto; }
        .custom-select-options::-webkit-scrollbar { width: 6px; }
        .custom-select-options::-webkit-scrollbar-thumb { background-color: var(--color-g200); border-radius: 10px; }
        
        .custom-select-option {
          padding: 0.6rem 0.8rem; font-size: 0.88rem; border-radius: 6px;
          cursor: pointer; transition: background 0.15s ease; color: var(--color-g600);
        }
        .custom-select-option:not(.disabled):hover { background: var(--color-g50); color: var(--color-dark); }
        .custom-select-option.selected { background: var(--color-primary-50); color: var(--color-primary); font-weight: 500; }
        .custom-select-option.disabled { opacity: 0.5; cursor: not-allowed; text-decoration: line-through; background: var(--color-g50); color: var(--color-g400); }
        
        @keyframes slideDown {
          from { opacity: 0; transform: scaleY(0.95); }
          to { opacity: 1; transform: scaleY(1); }
        }
      `}</style>
    </div>
  );
}
