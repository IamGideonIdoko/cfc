'use client';

import { type FC } from 'react';
import { Button } from '@/app/_composables';
import { IoIosArrowBack } from 'react-icons/io';

const EmailTransfer: FC<{ closeMethod: () => void }> = ({ closeMethod }) => {
  return (
    <div className="mt-4">
      <div className="flex items-center gap-4">
        <Button intent="none" onClick={closeMethod} className="border py-3">
          <IoIosArrowBack />
        </Button>
        <label className="block font-medium">To Email Address</label>
      </div>
    </div>
  );
};

export default EmailTransfer;
