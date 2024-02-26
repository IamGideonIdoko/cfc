'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, type ChangeEvent, type FormEvent, useRef } from 'react';
import { Button, Input } from '@/app/_composables';
import { BsArrowDownLeft } from 'react-icons/bs';
import Logo from '@/app/_components/Logo';
import SimpleReactValidator from 'simple-react-validator';
import { toast } from 'react-hot-toast';
import { initiatePaymentRequest } from '@/server/actions';

const ReceivePayment = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState<{ email: string; amount: number | string }>({
    email: '',
    amount: '',
  });
  const [, forceUpdate] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const simpleValidator = useRef(
    new SimpleReactValidator({
      element: (message: string) => <div className="form-err-msg">{message}</div>,
    }),
  );

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isGenerating) return;
    if (simpleValidator.current.allValid()) {
      setIsGenerating(true);
      const { data, error } = await initiatePaymentRequest({
        ...input,
        amount: Number(input.amount),
      });
      setIsGenerating(false);
      if (error ?? !data) return toast.error(error ?? 'Could not generate payment link');
      window.location.href = data.paymentLink;
      // NOTE: All set
    } else {
      simpleValidator.current.showMessages();
      forceUpdate((prev) => !prev);
    }
  };

  return (
    <>
      <Button intent="outline" className="py-2" onClick={openModal}>
        <BsArrowDownLeft className="me-2" /> Receive Payment
      </Button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-[446px] max-w-full overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-black">
                  <div className="flex items-center justify-center pb-4">
                    <Logo />
                  </div>
                  <h2 className="text-lg font-medium">Receive Payment / Top up</h2>
                  <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
                    With C-Pay (powered by Chimoney), you can receive payments from other users via payment links
                    easily!
                  </p>

                  <form className="mt-6 space-y-5" action="#" method="POST" onSubmit={(e) => void handleSubmit(e)}>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                        Payer&apos;s Email address
                      </label>
                      <div className="mt-1">
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="off"
                          className="py-2.5"
                          value={input.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      {simpleValidator.current.message('email', input.email, 'required|email|between:2,128')}
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
                      <Button type="submit" fullWidth className="font-semibold" disabled={isGenerating}>
                        {isGenerating ? (
                          'Generating Link...'
                        ) : (
                          <>
                            <span className="mr-2">Generate Link</span>
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ReceivePayment;
