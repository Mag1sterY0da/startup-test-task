import { ZoomOption } from '@/types/zoomOption';
import styles from './Select.module.scss';

type SelectProps = {
  value: number;
  options: ZoomOption[];
  onChange: (value: number) => void;
};

const Select = ({ value, options, onChange }: SelectProps) => {
  return (
    <select
      className={styles.select}
      value={value}
      onChange={e => onChange(Number(e.target.value))}
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
