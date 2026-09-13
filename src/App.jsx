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

 