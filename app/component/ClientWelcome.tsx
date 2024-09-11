'use client';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

export default function ClientWelcome() {
  useEffect(() => {
    if (!sessionStorage.getItem('welcomeMessageShown')) {
        toast.success('Welcome to Anthem Infotech');
      sessionStorage.setItem('welcomeMessageShown', 'true');
    }
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return null;
}
