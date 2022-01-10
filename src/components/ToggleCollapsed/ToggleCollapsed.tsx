import Button, { ButtonProps } from 'src/components/Button';
import { useUIContext } from 'src/contexts';

export type ToggleCollapsedProps = ButtonProps;

function ToggleCollapsed({ ...props }: ToggleCollapsedProps) {
  const { collapsed, toggleCollapsed } = useUIContext();

  return (
    <>
      {collapsed ? (
        <Button
          onClick={toggleCollapsed}
          icon="DoubleDashRightFill"
          iconOnly
          {...props}
        />
      ) : (
        <Button onClick={toggleCollapsed} icon="DoubleDashLeftFill" {...props}>
          Collapse
        </Button>
      )}
    </>
  );
}

export default ToggleCollapsed;
