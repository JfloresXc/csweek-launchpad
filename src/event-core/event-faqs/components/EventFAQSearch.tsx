import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  X, 
  Filter, 
  SortAsc, 
  SortDesc, 
  Clock, 
  Star, 
  ThumbsUp, 
  Tag,
  TrendingUp,
  History,
  Zap
} from 'lucide-react';
import { EventFAQ, EventFAQSearchProps, FAQCategory, FAQSortOption } from '../types/event-faq.types';
import { useAdvancedFAQSearch, useFAQSearchSuggestions, usePopularFAQs } from '../hooks/useEventFAQs';
import { eventFAQsUtils } from '../services/event-faqs.service';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Badge } from '@/shared/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { Checkbox } from '@/shared/ui/checkbox';
import { Separator } from '@/shared/ui/separator';
import { LoadingSpinner } from '@/shared/common/LoadingSpinner';
import { EventFAQCard } from './EventFAQCard';

/**
 * Componente de búsqueda avanzada para FAQs del evento
 * Incluye autocompletado, filtros, ordenamiento y sugerencias
 */
export const EventFAQSearch: React.FC<EventFAQSearchProps> = ({
  placeholder = "Buscar preguntas frecuentes...",
  showFilters = true,
  showSuggestions = true,
  showPopular = true,
  maxResults = 20,
  variant = 'full',
  className = '',
  onResultClick,
  onSearchChange
}) => {
  const [query, setQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<FAQCategory[]>([]);
  const [sortBy, setSortBy] = useState<FAQSortOption>('relevance');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  
  // Hooks para datos
  const {
    faqs: searchResults,
    totalResults,
    isLoading: isSearching,
    error: searchError
  } = useAdvancedFAQSearch({
    query: query.trim(),
    categories: selectedCategories.length > 0 ? selectedCategories : undefined,
    featured: showFeaturedOnly || undefined,
    sort: sortBy,
    limit: maxResults
  });
  
  const {
    suggestions,
    isLoading: isLoadingSuggestions
  } = useFAQSearchSuggestions(query.trim(), {
    enabled: showSuggestions && query.trim().length >= 2
  });
  
  const {
    faqs: popularFAQs,
    isLoading: isLoadingPopular
  } = usePopularFAQs({
    limit: 5,
    enabled: showPopular && !query.trim()
  });
  
  // Efecto para manejar cambios en la búsqueda
  useEffect(() => {
    if (onSearchChange) {
      onSearchChange(query, searchResults);
    }
  }, [query, searchResults, onSearchChange]);
  
  // Efecto para manejar clics fuera del componente
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  // Cargar historial de búsqueda desde localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('faq-search-history');
    if (savedHistory) {
      try {
        setSearchHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error('Error loading search history:', error);
      }
    }
  }, []);
  
  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    
    // Agregar al historial si no está vacío y no existe
    if (searchQuery.trim() && !searchHistory.includes(searchQuery.trim())) {
      const newHistory = [searchQuery.trim(), ...searchHistory.slice(0, 4)];
      setSearchHistory(newHistory);
      localStorage.setItem('faq-search-history', JSON.stringify(newHistory));
    }
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    handleSearch(suggestion);
    setIsSearchFocused(false);
  };
  
  const handleFAQClick = (faq: EventFAQ) => {
    if (onResultClick) {
      onResultClick(faq);
    }
    setIsSearchFocused(false);
  };
  
  const clearSearch = () => {
    setQuery('');
    setSelectedCategories([]);
    setSortBy('relevance');
    setShowFeaturedOnly(false);
    searchInputRef.current?.focus();
  };
  
  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('faq-search-history');
  };
  
  const toggleCategory = (category: FAQCategory) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };
  
  const availableCategories: FAQCategory[] = [
    'general', 'registration', 'schedule', 'location', 'speakers',
    'networking', 'technical', 'accommodation', 'food', 'certificates'
  ];
  
  const sortOptions: { value: FAQSortOption; label: string; icon: React.ComponentType<any> }[] = [
    { value: 'relevance', label: 'Relevancia', icon: Zap },
    { value: 'helpful', label: 'Más útiles', icon: ThumbsUp },
    { value: 'recent', label: 'Más recientes', icon: Clock },
    { value: 'alphabetical', label: 'Alfabético', icon: SortAsc }
  ];
  
  const hasActiveFilters = selectedCategories.length > 0 || showFeaturedOnly || sortBy !== 'relevance';
  const showResults = query.trim().length > 0;
  const showDropdown = isSearchFocused && (showSuggestions || showPopular || searchHistory.length > 0);
  
  return (
    <div ref={searchContainerRef} className={`relative ${className}`}>
      {/* Barra de búsqueda principal */}
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            ref={searchInputRef}
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch(query);
                setIsSearchFocused(false);
              }
              if (e.key === 'Escape') {
                setIsSearchFocused(false);
              }
            }}
            className={`pl-10 pr-10 h-12 text-base ${
              variant === 'compact' ? 'h-10' : ''
            } ${
              isSearchFocused ? 'ring-2 ring-blue-500 border-blue-500' : ''
            }`}
          />
          
          {query && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearSearch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
        
        {/* Indicadores de filtros activos */}
        {hasActiveFilters && (
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs text-gray-500">Filtros activos:</span>
            {selectedCategories.map(category => (
              <Badge key={category} variant="secondary" className="text-xs">
                {eventFAQsUtils.getCategoryInfo(category).name}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleCategory(category)}
                  className="ml-1 h-3 w-3 p-0 hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <X className="w-2 h-2" />
                </Button>
              </Badge>
            ))}
            {showFeaturedOnly && (
              <Badge variant="secondary" className="text-xs">
                Solo destacadas
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFeaturedOnly(false)}
                  className="ml-1 h-3 w-3 p-0 hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <X className="w-2 h-2" />
                </Button>
              </Badge>
            )}
            {sortBy !== 'relevance' && (
              <Badge variant="secondary" className="text-xs">
                {sortOptions.find(opt => opt.value === sortBy)?.label}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSortBy('relevance')}
                  className="ml-1 h-3 w-3 p-0 hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <X className="w-2 h-2" />
                </Button>
              </Badge>
            )}
          </div>
        )}
      </div>
      
      {/* Filtros avanzados */}
      {showFilters && variant === 'full' && (
        <Card className="mt-4">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filtros de búsqueda
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Categorías */}
            <div>
              <label className="text-sm font-medium mb-2 block">Categorías:</label>
              <div className="flex flex-wrap gap-2">
                {availableCategories.map(category => {
                  const categoryInfo = eventFAQsUtils.getCategoryInfo(category);
                  const isSelected = selectedCategories.includes(category);
                  
                  return (
                    <Button
                      key={category}
                      variant={isSelected ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => toggleCategory(category)}
                      className="text-xs"
                    >
                      {categoryInfo.name}
                    </Button>
                  );
                })}
              </div>
            </div>
            
            {/* Ordenamiento y opciones */}
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-48">
                <label className="text-sm font-medium mb-2 block">Ordenar por:</label>
                <Select value={sortBy} onValueChange={(value) => setSortBy(value as FAQSortOption)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map(option => {
                      const Icon = option.icon;
                      return (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center gap-2">
                            <Icon className="w-4 h-4" />
                            {option.label}
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-end">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="featured-only"
                    checked={showFeaturedOnly}
                    onCheckedChange={setShowFeaturedOnly}
                  />
                  <label htmlFor="featured-only" className="text-sm font-medium flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    Solo destacadas
                  </label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Dropdown con sugerencias, historial y populares */}
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 z-50 mt-1"
          >
            <Card className="shadow-lg border border-gray-200 dark:border-gray-700">
              <CardContent className="p-0 max-h-96 overflow-y-auto">
                {/* Sugerencias de búsqueda */}
                {showSuggestions && query.trim().length >= 2 && (
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Search className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium">Sugerencias</span>
                    </div>
                    
                    {isLoadingSuggestions ? (
                      <div className="flex justify-center py-4">
                        <LoadingSpinner size="sm" />
                      </div>
                    ) : suggestions.length > 0 ? (
                      <div className="space-y-1">
                        {suggestions.slice(0, 5).map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                          >
                            <span className="text-gray-600 dark:text-gray-400">Buscar: </span>
                            <span className="font-medium">{suggestion}</span>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 py-2">No hay sugerencias disponibles</p>
                    )}
                  </div>
                )}
                
                {/* Historial de búsqueda */}
                {searchHistory.length > 0 && !query.trim() && (
                  <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <History className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium">Búsquedas recientes</span>
                      </div>
                      <Button variant="ghost" size="sm" onClick={clearHistory} className="text-xs">
                        Limpiar
                      </Button>
                    </div>
                    
                    <div className="space-y-1">
                      {searchHistory.map((historyItem, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(historyItem)}
                          className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center gap-2"
                        >
                          <Clock className="w-3 h-3 text-gray-400" />
                          {historyItem}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* FAQs populares */}
                {showPopular && !query.trim() && (
                  <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium">Preguntas populares</span>
                    </div>
                    
                    {isLoadingPopular ? (
                      <div className="flex justify-center py-4">
                        <LoadingSpinner size="sm" />
                      </div>
                    ) : popularFAQs.length > 0 ? (
                      <div className="space-y-2">
                        {popularFAQs.map((faq) => (
                          <button
                            key={faq.id}
                            onClick={() => handleFAQClick(faq)}
                            className="w-full text-left p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border border-gray-200 dark:border-gray-700"
                          >
                            <div className="flex items-start gap-2">
                              {faq.featured && <Star className="w-3 h-3 text-yellow-500 mt-1 flex-shrink-0" />}
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                                  {faq.question}
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge variant="outline" className="text-xs">
                                    {eventFAQsUtils.getCategoryInfo(faq.category).name}
                                  </Badge>
                                  {faq.helpful > 0 && (
                                    <span className="text-xs text-gray-500 flex items-center gap-1">
                                      <ThumbsUp className="w-3 h-3" />
                                      {faq.helpful}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 py-2">No hay preguntas populares disponibles</p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Resultados de búsqueda */}
      {showResults && (
        <div className="mt-6">
          {/* Header de resultados */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">Resultados de búsqueda</h3>
              {isSearching ? (
                <p className="text-sm text-gray-600 dark:text-gray-400">Buscando...</p>
              ) : (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {totalResults} resultado{totalResults !== 1 ? 's' : ''} para "{query}"
                </p>
              )}
            </div>
            
            {hasActiveFilters && (
              <Button variant="outline" size="sm" onClick={clearSearch}>
                Limpiar filtros
              </Button>
            )}
          </div>
          
          {/* Lista de resultados */}
          {isSearching ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner size="lg" />
            </div>
          ) : searchError ? (
            <Card className="border-red-200 dark:border-red-800">
              <CardContent className="p-6 text-center">
                <p className="text-red-600 dark:text-red-400 mb-4">
                  Error en la búsqueda: {searchError.message}
                </p>
                <Button onClick={() => handleSearch(query)} variant="outline">
                  Reintentar
                </Button>
              </CardContent>
            </Card>
          ) : searchResults.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Search className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-medium mb-2">No se encontraron resultados</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Intenta con otros términos de búsqueda o ajusta los filtros.
                </p>
                <Button variant="outline" onClick={clearSearch}>
                  Limpiar búsqueda
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {searchResults.map((faq) => (
                <EventFAQCard
                  key={faq.id}
                  faq={faq}
                  variant="search-result"
                  onClick={() => handleFAQClick(faq)}
                  highlightQuery={query}
                />
              ))}
              
              {searchResults.length >= maxResults && (
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Mostrando los primeros {maxResults} resultados. Refina tu búsqueda para ver más.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EventFAQSearch;