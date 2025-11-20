import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

interface UseAutoSaveOptions<T> {
  data: T;
  onSave: (data: T) => Promise<void>;
  delay?: number;
  enabled?: boolean;
}

export const useAutoSave = <T>({ 
  data, 
  onSave, 
  delay = 3000,
  enabled = true 
}: UseAutoSaveOptions<T>) => {
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const previousDataRef = useRef<string>();

  useEffect(() => {
    if (!enabled) return;

    const dataString = JSON.stringify(data);
    
    // Skip if data hasn't changed
    if (dataString === previousDataRef.current) return;
    
    previousDataRef.current = dataString;

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout
    timeoutRef.current = setTimeout(async () => {
      if (!enabled) return;
      
      setIsSaving(true);
      try {
        await onSave(data);
        setLastSaved(new Date());
        // Silent save - no toast
      } catch (error) {
        console.error('Auto-save error:', error);
        toast.error('Error al guardar automáticamente');
      } finally {
        setIsSaving(false);
      }
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [data, onSave, delay, enabled]);

  const saveNow = async () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    setIsSaving(true);
    try {
      await onSave(data);
      setLastSaved(new Date());
      toast.success('Guardado correctamente');
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Error al guardar');
    } finally {
      setIsSaving(false);
    }
  };

  return {
    isSaving,
    lastSaved,
    saveNow
  };
};
