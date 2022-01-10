import Button, { ButtonProps } from 'src/components/Button';
import { useTheme } from 'src/contexts';

export type ToggleDarkModeProps = ButtonProps;

function ToggleDarkMode({ ...props }: ToggleDarkModeProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      {theme === 'light' ? (
        <Button onClick={toggleTheme} icon="MoonFill" {...props}>
          Dark Mode
        </Button>
      ) : (
        <Button onClick={toggleTheme} icon="SunFill" {...props}>
          Light Mode
        </Button>
      )}
    </>
  );
}

export default ToggleDarkMode;
