'use client';

import { useEffect } from 'react';
import { Button } from './_composables';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // ! Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center py-20">
      <h2>Something went wrong!</h2>
      <Button
        className="mt-4"
        onClick={
          // ! Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </Button>
    </div>
  );
}
