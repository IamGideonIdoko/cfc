import Logo from './Logo';
import ThemeSwitch from './ThemeSwitch';

const HomeNavbar = () => {
  return (
    <div className="flex min-h-24 items-center justify-between">
      <div>
        <Logo />
      </div>
      <div className="">
        <ThemeSwitch />
      </div>
    </div>
  );
};

export default HomeNavbar;
