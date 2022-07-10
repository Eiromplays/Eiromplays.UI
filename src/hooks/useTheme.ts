import * as React from 'react';

export const useTheme = () => {
  const [theme, setTheme] = React.useState<string>(
    typeof window !== 'undefined'
      ? localStorage.theme
        ? localStorage.theme
        : window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      : 'light'
  );
  const colorTheme = theme === 'dark' ? 'light' : 'dark';

  React.useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove(colorTheme);
    root.classList.add(theme);

    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
    }
  }, [colorTheme, theme]);

  const toggleTheme = React.useCallback(
    () => setTheme((currentTheme: string) => (currentTheme === 'dark' ? 'light' : 'dark')),
    [setTheme]
  );

  return { currentTheme: theme, colorTheme, toggleTheme };
};
