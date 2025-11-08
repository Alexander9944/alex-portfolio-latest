'use client';

import { useEffect } from 'react';
import useFluidCursor from '@/hooks/useFluidCursor';

const FluidCursor = () => {
  useEffect(() => {
    useFluidCursor();
  }, []);

  return (
    <div className='fixed top-0 left-0 w-screen h-screen pointer-events-none' style={{ zIndex: 9999 }}>
      <canvas id='fluid' className='w-full h-full' />
    </div>
  );
};

export default FluidCursor;
