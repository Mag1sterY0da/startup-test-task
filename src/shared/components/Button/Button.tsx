import styles from './Button.module.scss';

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

const Button = ({ children, className, ...props }: ButtonProps) => {
  const defaultClassName: string = styles.button;
  const finalClassName: string = className
    ? `${defaultClassName} ${className}`
    : defaultClassName;

  return (
    <button type='button' className={finalClassName} {...props}>
      {children}
    </button>
  );
};

export default Button;
