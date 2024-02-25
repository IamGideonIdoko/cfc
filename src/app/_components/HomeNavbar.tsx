import AuthButton from './AuthButton';
import Logo from './Logo';
import ThemeSwitch from './ThemeSwitch';

const HomeNavbar = () => {
  return (
    <div className="flex min-h-24 items-center justify-between gap-4">
      <div>
        <Logo />
      </div>
      <div className=" flex items-center gap-4">
        <ThemeSwitch />
        <AuthButton />
      </div>
    </div>
  );
};

export default HomeNavbar;
