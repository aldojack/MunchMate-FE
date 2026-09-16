import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { useState, useRef, useEffect } from "react";
import { useThemeContext } from "@/hooks/useThemeContext";

const lightImg = "/images/lightegg.png";
const darkImg = "/images/darkavo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { theme, changeTheme } = useThemeContext();
  const links = {
    main: [
      { name: "Add", link: "/recipes/add" },
      { name: "Recipes", link: "/recipes" },
      { name: "Planner", link: "/planner" },
    ],
    auth: [
      { name: "Login", link: "/login" },
      { name: "Sign Up", link: "/signup" },
    ],
  };
  const ref = useRef<HTMLDivElement | null>(null);
  const toggle = () => setIsMenuOpen((state) => !state);
  const hamburgerMenu = isMenuOpen ? <MenuOpenIcon /> : <MenuIcon />;
  const themeLogo =
    theme === "dark" ? (
      <img src={lightImg} alt="Switch to light mode" className="h-8 w-8" />
    ) : (
      <img src={darkImg} alt="Switch to dark mode" className="h-8 w-8" />
    );

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    changeTheme(newTheme);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-background/90 border-b border-primary/10 backdrop-blur-sm">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between gap-4 px-4 py-4">
        <Link
          to="/"
          aria-label="Home"
          className="text-2xl font-semibold tracking-tight text-text transition hover:text-primary"
        >
          <span className="text-primary">M</span>unch
          <span className="text-primary">M</span>ate
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden lg:flex items-center gap-8"
        >
          {links.main.map((link) => (
            <Link
              to={link.link}
              key={link.name}
              className="text-text/80 transition hover:text-text hover:underline hover:underline-offset-4"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          {links.auth.map((link) => (
            <Link
              to={link.link}
              key={link.name}
              className="text-text/70 transition hover:text-text"
            >
              {link.name}
            </Link>
          ))}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="rounded-full border border-primary/20 bg-primary/10 p-2 transition hover:border-primary hover:bg-primary/15"
            type="button"
          >
            {themeLogo}
          </button>
        </div>

        <div ref={ref} className="relative lg:hidden">
          <div className="flex items-center gap-3">
            <button
              onClick={toggle}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              className="rounded-full border border-primary/20 bg-background p-2 text-text transition hover:bg-primary/10"
              type="button"
            >
              {hamburgerMenu}
            </button>
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="rounded-full border border-primary/20 bg-primary/10 p-2 transition hover:border-primary hover:bg-primary/15"
            >
              {themeLogo}
            </button>
          </div>

          {isMenuOpen && (
            <div className="absolute right-4 top-full mt-3 w-64 rounded-[1.75rem] border border-primary/10 bg-background p-4 shadow-2xl">
              <div className="flex flex-col gap-3">
                {links.main.concat(links.auth).map((link) => (
                  <Link
                    key={link.name}
                    to={link.link}
                    onClick={toggle}
                    className="rounded-2xl px-4 py-3 text-center text-text/90 transition hover:bg-primary/10 hover:text-text"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
