import { useThemeStore } from "../../../store/ThemeStore"

export const BtnToggleTheme = () => {
    const { theme, setTheme } = useThemeStore();

    return (
        <button
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-primary/20 transition-all justify-start cursor-pointer"
            onClick={setTheme}
        >
            <span
            className="hidden sm:block">
                {theme === "light" ? "☀️" : "🌙"}
            </span>
            <span
            className="hidden sm:block">
                {theme === "light" ? "Light Mode" : "Dark Mode"}
            </span>
        </button>
    );
}