import { useContext } from "react";
import { DarkModeContext } from "../context/DarkModeContext";
import { Moon, Sun } from "lucide-react";

const DarkModeToggle = () => {
  const { darkMode, setDarkMode } = useContext(DarkModeContext);

  return (
    <button
      onClick={() => setDarkMode((prev) => !prev)}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-800"
    >
      {darkMode ? <Sun className="text-yellow-400" /> : <Moon className="text-gray-600" />}
    </button>
  );
};

export default DarkModeToggle;
