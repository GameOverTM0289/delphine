'use client';

import { useState, useRef, useEffect } from 'react';
import { PHONE_PREFIXES, validatePhone } from '@/lib/utils';

interface PhoneInputProps {
  value: string;
  onChange: (value: string, countryCode: string, prefix: string) => void;
  defaultCountry?: string;
  error?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  id?: string;
  name?: string;
}

export default function PhoneInput({
  value,
  onChange,
  defaultCountry = 'AL', // Albania default
  error,
  placeholder = 'Phone number',
  required = false,
  disabled = false,
  id,
  name,
}: PhoneInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(
    PHONE_PREFIXES.find((c) => c.code === defaultCountry) || PHONE_PREFIXES[0]
  );
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearch('');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter countries based on search
  const filteredCountries = PHONE_PREFIXES.filter(
    (country) =>
      country.name.toLowerCase().includes(search.toLowerCase()) ||
      country.prefix.includes(search) ||
      country.code.toLowerCase().includes(search.toLowerCase())
  );

  const handleCountrySelect = (country: typeof PHONE_PREFIXES[0]) => {
    setSelectedCountry(country);
    setIsOpen(false);
    setSearch('');
    onChange(value, country.code, country.prefix);
    inputRef.current?.focus();
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/[^\d\s\-]/g, '');
    onChange(newValue, selectedCountry.code, selectedCountry.prefix);
  };

  const hasError = !!error;

  return (
    <div className="relative" ref={dropdownRef}>
      <div className={`flex ${hasError ? 'ring-2 ring-red-500/20 rounded-lg' : ''}`}>
        {/* Country Selector Button */}
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={`
            flex items-center gap-1.5 h-12 px-3
            bg-gray-50 border border-gray-300 border-r-0 rounded-l-lg
            text-sm font-medium text-gray-700
            hover:bg-gray-100 transition-colors
            disabled:opacity-50 disabled:cursor-not-allowed
            ${hasError ? 'border-red-500 bg-red-50/50' : ''}
          `}
        >
          <span className="text-lg">{selectedCountry.flag}</span>
          <span className="text-gray-600">{selectedCountry.prefix}</span>
          <svg
            className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Phone Input */}
        <input
          ref={inputRef}
          type="tel"
          id={id}
          name={name}
          value={value}
          onChange={handlePhoneChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={`
            flex-1 h-12 px-4
            bg-white border border-gray-300 rounded-r-lg
            text-gray-900 text-sm placeholder:text-gray-400
            transition-all duration-200
            hover:border-gray-400
            focus:outline-none focus:ring-2 focus:ring-ocean-500/20 focus:border-ocean-500
            disabled:opacity-50 disabled:cursor-not-allowed
            ${hasError ? 'border-red-500 bg-red-50/50 focus:ring-red-500/20 focus:border-red-500' : ''}
          `}
        />
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-sm text-red-600 mt-1.5 flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 w-72 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden animate-fade-in">
          {/* Search */}
          <div className="p-2 border-b border-gray-100">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search country..."
              className="w-full h-10 px-3 bg-gray-50 border border-gray-200 rounded-md text-sm
                       focus:outline-none focus:ring-2 focus:ring-ocean-500/20 focus:border-ocean-500"
              autoFocus
            />
          </div>

          {/* Country List */}
          <div className="max-h-60 overflow-y-auto scrollbar-thin">
            {filteredCountries.length === 0 ? (
              <div className="px-4 py-3 text-sm text-gray-500 text-center">
                No countries found
              </div>
            ) : (
              filteredCountries.map((country) => (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => handleCountrySelect(country)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-2.5 text-left
                    hover:bg-gray-50 transition-colors
                    ${selectedCountry.code === country.code ? 'bg-ocean-50 text-ocean-700' : ''}
                  `}
                >
                  <span className="text-xl">{country.flag}</span>
                  <span className="flex-1 text-sm font-medium truncate">{country.name}</span>
                  <span className="text-sm text-gray-500">{country.prefix}</span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
