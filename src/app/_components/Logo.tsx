import { Vujahday_Script } from 'next/font/google';

const vujahdayScript = Vujahday_Script({ weight: '400', subsets: ['latin'] });

const Logo = () => {
  return (
    <div className="relative flex min-h-12 items-center pl-4 text-3xl font-medium">
      <div className="absolute left-0 top-0 h-12 w-12 rounded-[73%_27%_48%_52%_/_53%_32%_68%_47%] bg-[var(--pri-color)]"></div>
      <div className="relative flex items-center">
        <span className="text-black">C</span>
        <span className="pb-1 pl-0.5 leading-[10%] text-white mix-blend-difference">-</span>
        <span className={vujahdayScript.className}>Pay</span>
      </div>
    </div>
  );
};

export default Logo;
