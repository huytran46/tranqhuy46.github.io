import React from 'react';

type HookAsyncStatus = 'idle' | 'pending' | 'success' | 'error';

// Hook
export const useAsync = <T = unknown>(
  asyncFunction: () => Promise<T>,
  immediate = true,
) => {
  const [status, setStatus] = React.useState<HookAsyncStatus>('idle');
  const [value, setValue] = React.useState<T | null>(null);
  const [error, setError] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(false);

  // The execute function wraps asyncFunction and
  // handles setting state for pending, value, and error.
  // useCallback ensures the below useEffect is not called
  // on every render, but only if asyncFunction changes.
  const execute = React.useCallback(async () => {
    setLoading(true);
    setStatus('pending');
    setValue(null);
    setError(null);
    try {
      const response = await asyncFunction();
      setValue(response);
      setStatus('success');
    } catch (error) {
      setError(error);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  }, [asyncFunction]);

  // Call execute if we want to fire it right away.
  // Otherwise execute can be called later, such as
  // in an onClick handler.

  React.useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return {loading, status, value, error, execute};
};
