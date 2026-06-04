import React, { createContext, useContext, useState } from 'react';
import { BookingModal } from '../components/BookingModal';

interface BookingContextType {
  openBooking: (serviceName?: string) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialService, setInitialService] = useState<string>('');

  const openBooking = (serviceName?: string) => {
    if (serviceName) setInitialService(serviceName);
    else setInitialService('');
    setIsOpen(true);
  };

  const closeBooking = () => setIsOpen(false);

  return (
    <BookingContext.Provider value={{ openBooking }}>
      {children}
      {isOpen && <BookingModal onClose={closeBooking} initialService={initialService} />}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
