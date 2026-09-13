import { useEffect, useState } from "react";
import {
  FaReact,
  FaVuejs,
  FaNodeJs,
  FaJs,
  FaJava,
  FaDocker,
} from "react-icons/fa";

import {
  SiSvelte,
  SiNextdotjs,
  SiPostgresql,
  SiRedis,
  SiTypescript,
  SiTailwindcss,
} from "react-icons/si";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
const techIcons = {
  React: { icon: FaReact, color: "#61DAFB" },
  "Vue.js": { icon: FaVuejs, color: "#42B883" },
  Svelte: { icon: SiSvelte, color: "#FF3E00" },
  "Next.js": { icon: SiNextdotjs, color: "#000000" },
  "Node.js": { icon: FaNodeJs, color: "#339933" },
  PostgreSQL: { icon: SiPostgresql, color: "#4169E1" },
  Redis: { icon: SiRedis, color: "#DC382D" },
  JavaScript: { icon: FaJs, color: "#F7DF1E" },
  TypeScript: { icon: SiTypescript, color: "#3178C6" },
  Java: { icon: FaJava, color: "#E76F00" },
  "Tailwind CSS": { icon: SiTailwindcss, color: "#06B6D4" },
  Docker: { icon: FaDocker, color: "#2496ED" },
};

function App() {
  const [technologies, setTechnologies] = useState([]);
  const [myStack, setMyStack] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Load technology data from JSON
  useEffect(() => {
    fetch("/technologies.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load data");
        }
        return response.json();
      })
      .then((data) => {
        setTechnologies(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        toast.error("Unable to load technologies!");
      });
  }, []);

  // Add technology to stack
  const handleAddToStack = (technology) => {
    const alreadyExists = myStack.some(
      (item) => item.id === technology.id
    );

    if (alreadyExists) {
      toast.warning(`${technology.name} is already in your stack!`);
      return;
    }

    setMyStack((previousStack) => [
      ...previousStack,
      technology,
    ]);

    toast.success(`${technology.name} added to your stack!`);
  };
}
  // Remove one technology
  const handleRemove = (id) => {
    const removedTechnology = myStack.find(
      (item) => item.id === id
    );

    setMyStack((previousStack) =>
      previousStack.filter((item) => item.id !== id)
    );

    if (removedTechnology) {
      toast.info(`${removedTechnology.name} removed from your stack`);
    }
  };
    // Remove everything
  const handleRemoveAll = () => {
    if (myStack.length === 0) {
      toast.warning("Your stack is already empty!");
      return;
    }

    setMyStack([]);
    toast.info("All technologies removed!");
  };

  // Close mobile menu
  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className={darkMode ? "app dark-mode" : "app"}>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        theme={darkMode ? "dark" : "light"}
      />
      </div>
      );
            {/* ================= NAVBAR ================= */}
      <header className="navbar">
        <div className="container navbar-inner">
          <a href="#home" className="logo" onClick={closeMenu}>
            <span className="logo-icon">&lt;/&gt;</span>
            <span>Dev Stack</span>
          </a>

          <nav className={menuOpen ? "nav-links mobile-active" : "nav-links"}>
            <a href="#home" onClick={closeMenu}>
              Home
            </a>
            <a href="#technologies" onClick={closeMenu}>
              Technologies
            </a>
            <a href="#projects" onClick={closeMenu}>
              Projects
            </a>
            <a href="#about" onClick={closeMenu}>
              About
            </a>
            <a href="#contact" onClick={closeMenu}>
              Contact
            </a>
          </nav>

          <div className="nav-actions">
            <button className="sign-in">Sign In</button>
            <button className="sign-up">Sign Up</button>

            <button
              className="theme-control"
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle theme"
              title="Change theme"
            >
              {darkMode ? "☀️" : "◐"}
            </button>
          </div>

          <button
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Open menu"
          >
            ☰
          </button>
        </div>
      </header>
            {/* ================= HERO ================= */}
      <main>
        <section className="hero-section" id="home">
          <div className="container hero-grid">
            <div className="hero-content">
              <h1>
                Build Your Ideal
                <span> Development Stack</span>
              </h1>

              <p>
                Explore frontend, backend, database, and tooling options.
                Compare them side by side, and put together the stack that's
                right for your next project.
              </p>

              <div className="hero-buttons">
                <a href="#technologies" className="explore-btn">
                  Explore Technologies
                </a>

                <a href="#about" className="learn-btn">
                  Learn More
                </a>
              </div>
            </div>
                 

        <div className="hero-visual">
          <img
            className="hero-real-image"
            src="/banner-stack.png"
            alt="Development Stack"
          />
        </div>

      </div>
    </section>
    </main>
            {/* ================= TECHNOLOGIES ================= */}
        <section className="technologies-section" id="technologies">
          <div className="container">
            <div className="section-title">
              <h2>
                Explore the <span>Technologies</span>
              </h2>

              <p>
                Pick one technology per category to build your ideal stack.
              </p>
            </div>

            {loading ? (
              <div className="loading-container">
                <div className="spinner"></div>
                <h3>Loading technologies...</h3>
                <p>Please wait while we load the data.</p>
              </div>
            ) : (
              <div className="technology-layout">
                {/* Technology Cards */}
                <div className="technology-grid">
                  {technologies.map((technology) => (
                    <article
                      className="technology-card"
                      key={technology.id}
                    >
                      <div className="card-top">
                        <div className="technology-icon">
                    {(() => {
                      const techData = techIcons[technology.name];
                if (!techData) return null;

              const Icon = techData.icon;

              return <Icon style={{ color: techData.color }} />;
              })()}
             </div>

                        <span className="technology-badge">
                          {technology.badge}
                        </span>
                      </div>

                      <h3>{technology.name}</h3>

                      <p className="card-description">
                        {technology.description}
                      </p>

                      <div className="card-meta">
                        <span>{technology.category}</span>
                        <span>{technology.difficulty}</span>

                        <span className="rating">
                          ★ {technology.rating}
                        </span>
                      </div>

                      <button
                        className="add-stack-btn"
                        onClick={() =>
                          handleAddToStack(technology)
                        }
                      >
                        Add to Stack
                      </button>
                    </article>
                  ))}
                </div>

                </div>
            )}
                </div>
                </section>


       
             

        




