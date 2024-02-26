'use client';

import { useCallback } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { Button } from '@/app/_composables';
import { BsArrowUpRight } from 'react-icons/bs';
import Logo from '@/app/_components/Logo';
import { RiP2PLine } from 'react-icons/ri';
import { MdOutlineMarkEmailUnread } from 'react-icons/md';
import { BsBank } from 'react-icons/bs';
import { MdPhoneEnabled } from 'react-icons/md';
import { FaMoneyBill } from 'react-icons/fa6';
import { FaPhoneVolume } from 'react-icons/fa';
import { MdCardGiftcard } from 'react-icons/md';
import WalletTransfer from './WalletTransfer';
import EmailTransfer from './EmailTransfer';
import BankTransfer from './BankTransfer';

const SendPayment = () => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);
  const [preferredMethod, setPreferredMethod] = useState<'wallet' | 'bank' | 'email' | null>(null);

  const closeMethod = useCallback(() => {
    setPreferredMethod(null);
  }, []);

  return (
    <>
      <Button className="py-2" onClick={openModal}>
        <BsArrowUpRight className="me-2" /> Send Payment
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
                <Dialog.Panel className="w-[446px] max-w-full overflow-hidden rounded-lg bg-white p-6 py-7 text-left align-middle shadow-xl transition-all dark:bg-black">
                  <div className="flex items-center justify-center pb-4">
                    <Logo />
                  </div>
                  <h2 className="text-lg font-medium">Send Payment</h2>
                  <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
                    With C-Pay (powered by Chimoney), you can send payments to other users and non-users of this
                    platform easily!
                  </p>
                  {preferredMethod === null && (
                    <>
                      <label className="mt-4 block font-medium">Choose your preferred method:</label>
                      <ul className="mt-4 space-y-4">
                        <li>
                          <Button
                            intent="none"
                            className="justify-start gap-3 bg-[#beec4225] focus:outline-[var(--pri-color)] focus:ring-0 focus:ring-offset-0"
                            fullWidth
                            onClick={() => setPreferredMethod('wallet')}
                          >
                            <span className="rounded-md bg-white p-2 dark:bg-black">
                              <RiP2PLine />
                            </span>
                            <span>To Chi Wallet (P2P)</span>
                          </Button>
                        </li>
                        <li>
                          <Button
                            intent="none"
                            className="justify-start gap-3 bg-[#beec4225] focus:outline-[var(--pri-color)] focus:ring-0 focus:ring-offset-0"
                            fullWidth
                            onClick={() => setPreferredMethod('bank')}
                          >
                            <span className="rounded-md bg-white p-2 dark:bg-black">
                              <BsBank />
                            </span>
                            <span>To Bank Account</span>
                          </Button>
                        </li>
                        <li>
                          <Button
                            intent="none"
                            className="justify-start gap-3 bg-[#beec4225] focus:outline-[var(--pri-color)] focus:ring-0 focus:ring-offset-0"
                            fullWidth
                            onClick={() => setPreferredMethod('email')}
                          >
                            <span className="rounded-md bg-white p-2 dark:bg-black">
                              <MdOutlineMarkEmailUnread />
                            </span>
                            <span>To Email</span>
                          </Button>
                        </li>
                        <li className="hidden">
                          <Button
                            intent="none"
                            className="justify-start gap-3 bg-[#beec4225] focus:outline-[var(--pri-color)] focus:ring-0 focus:ring-offset-0"
                            fullWidth
                          >
                            <span className="rounded-md bg-white p-2 dark:bg-black">
                              <MdPhoneEnabled />
                            </span>
                            <span>To Phone Number</span>
                          </Button>
                        </li>
                        <li className="hidden">
                          <Button
                            intent="none"
                            className="justify-start gap-3 bg-[#beec4225] focus:outline-[var(--pri-color)] focus:ring-0 focus:ring-offset-0"
                            fullWidth
                          >
                            <span className="rounded-md bg-white p-2 dark:bg-black">
                              <FaMoneyBill />
                            </span>
                            <span>To Mobile Money (Momo) Account</span>
                          </Button>
                        </li>
                        <li className="hidden">
                          <Button
                            intent="none"
                            className="justify-start gap-3 bg-[#beec4225] focus:outline-[var(--pri-color)] focus:ring-0 focus:ring-offset-0"
                            fullWidth
                          >
                            <span className="rounded-md bg-white p-2 dark:bg-black">
                              <FaPhoneVolume />
                            </span>
                            <span>To Phone Number (Airtime)</span>
                          </Button>
                        </li>
                        <li className="hidden">
                          <Button
                            intent="none"
                            className="justify-start gap-3 bg-[#beec4225] focus:outline-[var(--pri-color)] focus:ring-0 focus:ring-offset-0"
                            fullWidth
                          >
                            <span className="rounded-md bg-white p-2 dark:bg-black">
                              <MdCardGiftcard />
                            </span>
                            <span>To Email (Giftcards)</span>
                          </Button>
                        </li>
                      </ul>
                    </>
                  )}
                  {preferredMethod === 'wallet' && <WalletTransfer closeMethod={closeMethod} />}
                  {preferredMethod === 'bank' && <BankTransfer closeMethod={closeMethod} />}
                  {preferredMethod === 'email' && <EmailTransfer closeMethod={closeMethod} />}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default SendPayment;
