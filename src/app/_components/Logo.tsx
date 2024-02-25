import { Oleo_Script_Swash_Caps } from 'next/font/google';

const scriptFont = Oleo_Script_Swash_Caps({ weight: '700', subsets: ['latin-ext'] });

const Logo = () => {
  return (
    <div className="relative flex min-h-12 items-center pl-4 text-3xl">
      <div className="absolute left-0 top-0 h-12 w-12 rounded-[73%_27%_48%_52%_/_53%_32%_68%_47%] bg-[var(--pri-color)]"></div>
      <div className="relative flex items-center">
        <span className="font-medium text-black">C</span>
        <span className="pb-1 pl-0.5 font-bold leading-[10%] text-white mix-blend-difference">-</span>
        <span className={scriptFont.className}>Pay</span>
      </div>
    </div>
  );
};

export default Logo;
