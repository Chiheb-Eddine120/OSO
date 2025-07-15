import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin } from 'lucide-react';
import citiesData from '../data/restructured_cities1.json';
import { City, CitySearchResult } from '../types/cities';

interface CityAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onCitySelect: (city: CitySearchResult) => void;
  placeholder?: string;
  className?: string;
}

const CityAutocomplete: React.FC<CityAutocompleteProps> = ({
  value,
  onChange,
  onCitySelect,
  placeholder = "Rechercher une ville...",
  className = ""
}) => {
  const [suggestions, setSuggestions] = useState<CitySearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fonction pour normaliser le texte (supprimer les accents)
  const normalizeText = (text: string): string => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  };

  // Fonction pour obtenir le nom de la ville en français
  const getCityName = (city: City): string => {
    return city.municipality.french || 
           city.sub_municipality.french || 
           city.municipality.dutch || 
           city.sub_municipality.dutch || 
           '';
  };

  // Fonction pour obtenir le nom de la région en français
  const getRegionName = (city: City): string => {
    return city.region.french || city.region.dutch || '';
  };

  // Fonction pour obtenir le nom de la province en français
  const getProvinceName = (city: City): string => {
    return city.province.french || city.province.dutch || '';
  };

  // Recherche des suggestions
  const searchCities = (query: string) => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    const normalizedQuery = normalizeText(query);
    const results: CitySearchResult[] = [];

    citiesData.forEach((city: City) => {
      const cityName = getCityName(city);
      const regionName = getRegionName(city);
      const provinceName = getProvinceName(city);

      if (normalizeText(cityName).includes(normalizedQuery) ||
          normalizeText(regionName).includes(normalizedQuery) ||
          normalizeText(provinceName).includes(normalizedQuery)) {
        
        results.push({
          post_code: city.post_code,
          city_name: cityName,
          region: regionName,
          province: provinceName
        });
      }
    });

    // Limiter à 10 résultats et trier par pertinence
    setSuggestions(results.slice(0, 10));
  };

  // Gestion des changements de valeur
  useEffect(() => {
    searchCities(value);
  }, [value]);

  // Gestion des clics en dehors du composant
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Gestion du clavier
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        handleCitySelect(suggestions[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setSelectedIndex(-1);
    }
  };

  // Sélection d'une ville
  const handleCitySelect = (city: CitySearchResult) => {
    onChange(`${city.city_name} (${city.post_code})`);
    onCitySelect(city);
    setIsOpen(false);
    setSelectedIndex(-1);
  };

  // Focus sur l'input
  const handleFocus = () => {
    if (suggestions.length > 0) {
      setIsOpen(true);
    }
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="form-input pl-10"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
      </div>

      {isOpen && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((city, index) => (
            <button
              key={`${city.post_code}-${city.city_name}`}
              onClick={() => handleCitySelect(city)}
              className={`w-full text-left px-4 py-3 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none ${
                index === selectedIndex ? 'bg-gray-50' : ''
              }`}
            >
              <div className="flex items-center">
                <MapPin className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
                <div>
                  <div className="font-medium text-gray-900">
                    {city.city_name} ({city.post_code})
                  </div>
                  <div className="text-sm text-gray-500">
                    {city.region}, {city.province}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CityAutocomplete; 