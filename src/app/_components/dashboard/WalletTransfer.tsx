'use client';

import { type FC, useState, useRef, type FormEvent, type ChangeEvent } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import SimpleReactValidator from 'simple-react-validator';
import { Button, Input } from '@/app/_composables';

const WalletTransfer: FC<{ closeMethod: () => void }> = ({ closeMethod }) => {
  const [input, setInput] = useState<{ walletId: string; amount: number | string }>({
    walletId: '',
    amount: '',
  });
  const [, forceUpdate] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const simpleValidator = useRef(
    new SimpleReactValidator({
      element: (message: string) => <div className="form-err-msg">{message}</div>,
    }),
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isSending) return;
    if (simpleValidator.current.allValid()) {
      setIsSending(true);
      //!  if (error ?? !data) return toast.error(error ?? 'Could not generate payment link');
      // NOTE: All set
    } else {
      simpleValidator.current.showMessages();
      forceUpdate((prev) => !prev);
    }
  };

  return (
    <div className="mt-4">
      <div className="flex items-center gap-4">
        <Button intent="none" onClick={closeMethod} className="border py-3">
          <IoIosArrowBack />
        </Button>
        <label className="block font-medium">To Chi Wallet</label>
      </div>
      <form className="mt-6 space-y-5" action="#" method="POST" onSubmit={(e) => void handleSubmit(e)}>
        <div>
          <label htmlFor="walletId" className="block text-sm font-medium leading-6 text-gray-900">
            Payer&apos;s Email address
          </label>
          <div className="mt-1">
            <Input
              id="walletId"
              name="walletId"
              type="text"
              autoComplete="off"
              className="py-2.5"
              value={input.walletId}
              onChange={handleInputChange}
              required
            />
          </div>
          {simpleValidator.current.message('wallet ID', input.walletId, 'required|between:2,128')}
        </div>

        <div>
          <label htmlFor="amount" className="block text-sm font-medium leading-6 text-gray-900">
            Amount to receive (USD)
          </label>
          <div className="relative mt-1.5">
            <Input
              id="amount"
              name="amount"
              type="number"
              autoComplete="off"
              required
              min={0}
              className="py-2.5"
              value={input.amount}
              onChange={handleInputChange}
            />
          </div>
          {simpleValidator.current.message('amount', input.amount, 'required|numeric:0,num')}
        </div>

        <div className="pt-3">
          <Button type="submit" fullWidth className="font-semibold" disabled={isSending}>
            {isSending ? (
              'Sending Payment...'
            ) : (
              <>
                <span className="mr-2">Send Payment</span>
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default WalletTransfer;
