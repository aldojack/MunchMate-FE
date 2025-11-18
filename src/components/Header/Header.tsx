import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { useState, useRef, useEffect } from "react";
import lightImg from "/images/lightegg.png";
import darkImg from "/images/darkavo.png";
import { useTheme } from "../../context/ThemeContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const {theme, changeTheme} = useTheme();
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
      <img
        src={lightImg}
        alt="light mode toggle of a fried egg"
        id="theme-toggle"
      />
    ) : (
      <img
        src={darkImg}
        alt="dark mode toggle of an avocado"
        id="theme-toggle"
      />
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
    <header className="w-full">
      <div className="container mx-auto flex justify-between items-center text-xl p-6">
        <div className="flex lg:space-x-12 w-full justify-between">
          <div>
            <Link to="/" aria-label="Home link">
              <span className="text-primary text-2xl underline underline-offset-4">
                M
              </span>
              unch
              <span className="text-primary text-2xl underline underline-offset-4">
                M
              </span>
              ate
            </Link>
          </div>
          {/* Desktop Nav */}
          <nav
            aria-label="Main navigation"
            className="hidden lg:flex lg:w-full lg:justify-between"
          >
            <div className="gap-3 flex space-x-2 lg:items-center">
              {links.main.map((link) => (
                <Link to={link.link} key={link.name}>
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="hidden lg:flex space-x-4">
              {links.auth.map((link) => (
                <Link to={link.link} key={link.name}>
                  {link.name}
                </Link>
              ))}
            </div>
          </nav>
          {/* Mobile and Tablet Nav */}
          <nav
            aria-label="Mobile navigation"
            className="lg:hidden relative"
            role="navigation"
            ref={ref}
          >
            <div className="flex space-x-4 lg:hidden">
              <button
                onClick={toggle}
                className="block lg:hidden"
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
              >
                {hamburgerMenu}
              </button>
              <button onClick={toggleTheme} aria-describedby="theme-toggle">
                {themeLogo}
              </button>
            </div>

            {isMenuOpen && (
              <div className="absolute top-0 right-0 bg-white w-52 h-fit p-4 rounded border-2 text-lg">
                <div className="flex flex-col lg:hidden space-y-12 w-full justify-center items-center">
                  {links.main.concat(links.auth).map((link) => (
                    <Link
                      key={link.name}
                      to={link.link}
                      onClick={toggle}
                      className="hover:underline hover:bg-slate-400 w-full p-1 text-center"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </nav>
          <div className="hidden lg:flex items-center">
            <button onClick={toggleTheme} aria-describedby="theme-toggle">
              {themeLogo}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
