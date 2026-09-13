import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [technologies, setTechnologies] = useState([]);
  const [stack, setStack] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    fetch("/technologies.json")
      .then((res) => res.json())
      .then((data) => {
        setTechnologies(data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Technology data load failed!");
        setLoading(false);
      });
  }, []);

  const addToStack = (tech) => {
    const exists = stack.some((item) => item.id === tech.id);

    if (exists) {
      toast.warning(`${tech.name} is already in your stack!`);
      return;
    }

    setStack([...stack, tech]);
    toast.success(`${tech.name} added to your stack!`);
  };

  const removeFromStack = (id) => {
    setStack(stack.filter((item) => item.id !== id));
    toast.info("Technology removed!");
  };

  const removeAll = () => {
    setStack([]);
    toast.info("All technologies removed!");
  };

  return (
    <div className={dark ? "app dark" : "app"}>

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">
          Dev<span>Stack</span>
        </div>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#technologies">Technologies</a>
          <a href="#projects">Projects</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="nav-buttons">
          <button>Sign In</button>
          <button className="signup">Sign Up</button>

          <button onClick={() => setDark(!dark)}>
            {dark ? "☀️" : "🌙"}
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-content">
          <p className="small-title">WELCOME TO DEVSTACK</p>

          <h1>
            Build Your
            <span> Developer Stack</span>
          </h1>

          <p>
            Explore modern technologies and create your own personalized
            technology stack for your development journey.
          </p>

          <div className="hero-buttons">
            <a href="#technologies" className="primary-btn">
              Explore Technologies
            </a>

            <a href="#about" className="secondary-btn">
              Learn More
            </a>
          </div>
        </div>

        <div className="hero-image">
          <img src="/images/hero.png" alt="Developer" />
        </div>
      </section>

      {/* TECHNOLOGY SECTION */}
      <section className="technology-section" id="technologies">

        <div className="section-heading">
          <p>EXPLORE</p>
          <h2>Popular Technologies</h2>
          <span>
            Choose the technologies you want to add to your developer stack.
          </span>
        </div>

        {loading ? (
          <div className="loading">
            <div className="loader"></div>
            <p>Loading technologies...</p>
          </div>
        ) : (
          <div className="main-area">

            <div className="tech-grid">

              {technologies.map((tech) => (
                <div className="tech-card" key={tech.id}>

                  <div className="card-top">
                    <div className="tech-icon">
                      {tech.icon}
                    </div>

                    <span className="badge">
                      {tech.badge}
                    </span>
                  </div>

                  <h3>{tech.name}</h3>

                  <p>{tech.description}</p>

                  <div className="details">
                    <span>📁 {tech.category}</span>
                    <span>⭐ {tech.rating}</span>
                  </div>

                  <div className="difficulty">
                    Difficulty: <b>{tech.difficulty}</b>
                  </div>

                  <button
                    className="add-btn"
                    onClick={() => addToStack(tech)}
                  >
                    + Add to Stack
                  </button>

                </div>
              ))}

            </div>

            {/* YOUR STACK */}

            <aside className="stack-box">

              <div className="stack-header">
                <div>
                  <p>YOUR COLLECTION</p>
                  <h2>Your Stack</h2>
                </div>

                <span className="stack-count">
                  {stack.length}
                </span>
              </div>

              {stack.length === 0 ? (

                <div className="empty-stack">
                  <div>📦</div>
                  <p>Your stack is empty</p>
                  <span>Add technologies from the list.</span>
                </div>

              ) : (

                <>
                  <div className="stack-list">

                    {stack.map((tech) => (

                      <div className="stack-item" key={tech.id}>

                        <span>{tech.icon}</span>

                        <div>
                          <b>{tech.name}</b>
                          <small>{tech.category}</small>
                        </div>

                        <button
                          onClick={() => removeFromStack(tech.id)}
                        >
                          ×
                        </button>

                      </div>

                    ))}

                  </div>

                  <button
                    className="remove-all"
                    onClick={removeAll}
                  >
                    Remove All
                  </button>
                </>

              )}

            </aside>

          </div>
        )}

      </section>

      {/* ABOUT */}

      <section className="about" id="about">
        <p>ABOUT DEVSTACK</p>

        <h2>Build. Learn. Grow.</h2>

        <span>
          DevStack helps developers explore technologies and organize
          their favorite tools in one place.
        </span>
      </section>

      {/* FOOTER */}

      <footer id="contact">

        <div>
          <h2>
            Dev<span>Stack</span>
          </h2>

          <p>Build your developer journey.</p>
        </div>

        <p>© 2026 DevStack. All rights reserved.</p>

      </footer>

      <ToastContainer position="top-right" autoClose={2000} />

    </div>
  );
}

export default App;