import { Link } from "react-router-dom";

function Navbar() {

  return (

    <nav
      className="
        bg-[#071a12]
        border-b
        border-green-900
        px-8
        py-5
        flex
        justify-between
        items-center
        sticky
        top-0
        z-50
        backdrop-blur-lg
      "
    >

      {/* Logo */}

      <div>

        <h1
          className="
            text-2xl
            font-black
            text-yellow-400
            tracking-wide
          "
        >

          IPL Strategy Analyzer

        </h1>

      </div>

      {/* Navigation */}

      <div
        className="
          flex
          gap-8
          text-green-100
          font-medium
        "
      >

        <Link
          to="/"
          className="
            hover:text-yellow-400
            transition
          "
        >
          Home
        </Link>

        <Link
          to="/dashboard"
          className="
            hover:text-yellow-400
            transition
          "
        >
          Dashboard
        </Link>

        <Link
          to="/captains"
          className="
            hover:text-yellow-400
            transition
          "
        >
          Captains
        </Link>

        <Link
          to="/pressure"
          className="
            hover:text-yellow-400
            transition
          "
        >
          Pressure
        </Link>

        <Link
          to="/tactical"
          className="
            hover:text-yellow-400
            transition
          "
        >
          Tactical
        </Link>

        <Link
          to="/match-center"
          className="
            hover:text-yellow-400
            transition
          "
        >
          Match Center
        </Link>

        <Link
          to="/about"
          className="
            hover:text-yellow-400
            transition
          "
        >
          About
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;