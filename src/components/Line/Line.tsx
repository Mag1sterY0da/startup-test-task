import styles from './Line.module.scss';

const Line = () => {
  const heightOfRoot = 40;
  const gap = 40;

  return (
    <svg className={styles.line} key='rootLine' width='100%' height='100%'>
      <line x1='50%' y1={heightOfRoot} x2='50%' y2={heightOfRoot + gap} />
    </svg>
  );
};

export default Line;
