import React, { useEffect, useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./header.css";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { toast } from "sonner";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const [searchTerm, setSearchterm] = useState(null);
  const token = "kehinde";
  const navigate = useNavigate();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
    if (dropdownOpen) setDropdownOpen(false); // Close dropdown when toggling menu
  };

  // search handlers
  const handleChange = (e) => {
    setSearchterm((prev) => e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm === null || searchTerm === "")
      return toast.info("Kindly type something");
    navigate(`/search/${searchTerm}`);
  };

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        <NavLink to="/" className="logo" aria-label="MovieApp Home">
          <span className="logo-icon">🎬</span>
          <span className="logo-text">MovieApp</span>
        </NavLink>

        <form className="searchWrapper">
          <div className="searchBar">
            <FaSearch />
            <input
              onChange={(e) => handleChange(e)}
              type="text"
              placeholder="Search movies"
            />
          </div>
          <button type="submit" onClick={handleSearch} className="searchButton">
            Search
          </button>
        </form>

        <nav className={`nav-menu ${menuOpen ? "active" : ""}`}>
          <NavLink
            to="/"
            className="nav-item"
            onClick={() => setMenuOpen(false)}
            aria-current={({ isActive }) => (isActive ? "page" : undefined)}
          >
            Home
          </NavLink>
          {!token ? (
            <>
              <NavLink
                to="/login"
                className="nav-item"
                onClick={() => setMenuOpen(false)}
                aria-current={({ isActive }) => (isActive ? "page" : undefined)}
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="nav-item"
                onClick={() => setMenuOpen(false)}
                aria-current={({ isActive }) => (isActive ? "page" : undefined)}
              >
                Register
              </NavLink>
            </>
          ) : (
            <div className="avatar-group" ref={dropdownRef}>
              <button
                className="avatar-button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-expanded={dropdownOpen}
                aria-label="User menu"
              >
                <FaUserCircle />
              </button>
              {dropdownOpen && (
                <div className="dropdown">
                  <NavLink
                    to="/profile"
                    className="dropdown-item"
                    onClick={() => {
                      setMenuOpen(false);
                      setDropdownOpen(false);
                    }}
                  >
                    Profile
                  </NavLink>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                      setDropdownOpen(false);
                    }}
                    className="dropdown-item"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>

        <button
          className="menu-toggle"
          onClick={toggleMenu}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <IoMdClose /> : <IoMdMenu />}
        </button>
      </div>
    </header>
  );
};

export default Header;
