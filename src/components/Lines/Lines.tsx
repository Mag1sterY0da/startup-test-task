import { Category } from '@/classes/Category';
import styles from './Lines.module.scss';

type LinesProps = {
  categories: Category[];
  categoriesContainerRef: React.RefObject<HTMLDivElement>;
};

const Lines = ({ categories, categoriesContainerRef }: LinesProps) => {
  if (
    !categoriesContainerRef.current?.offsetWidth ||
    categoriesContainerRef.current.children.length !== categories.length
  ) {
    return null;
  }

  const width = categoriesContainerRef.current?.offsetWidth;
  const heightOfRoot = 40;
  const halfOfGap = 20;
  const categoriesGap = 120;

  const categoriesSizes = Array.from(
    categoriesContainerRef.current?.children ?? []
  ).map(item => {
    const element = item as HTMLElement;
    return {
      width: element.offsetWidth,
      height: element.offsetHeight
    };
  });

  const rootLine = (
    <svg className={styles.line} key='rootLine' width='100%' height='100%'>
      <line x1='50%' y1={heightOfRoot} x2='50%' y2={heightOfRoot + halfOfGap} />
    </svg>
  );

  const middleLine = (
    <svg className={styles.line} key='middleLine' width='100%' height='100%'>
      <line
        x1={categoriesSizes[0].width / 2}
        y1={heightOfRoot + halfOfGap}
        x2={width - categoriesSizes[categories.length - 1].width / 2}
        y2={heightOfRoot + halfOfGap}
      />
    </svg>
  );

  const getCategoriesWidth = (i: number) => {
    return categoriesSizes
      .slice(0, i)
      .reduce((acc, item) => acc + item.width, 0);
  };

  const categoryLines = categories.map((_, i) => (
    <svg key={i} className={styles.line} width='100%' height='100%'>
      <line
        x1={
          i === 0
            ? categoriesSizes[0].width / 2
            : i === categories.length - 1
            ? width - categoriesSizes[categories.length - 1].width / 2
            : getCategoriesWidth(i) +
              categoriesGap * i +
              categoriesSizes[i].width / 2
        }
        y1={heightOfRoot + halfOfGap}
        x2={
          i === 0
            ? categoriesSizes[0].width / 2
            : i === categories.length - 1
            ? width - categoriesSizes[categories.length - 1].width / 2
            : getCategoriesWidth(i) +
              categoriesGap * i +
              categoriesSizes[i].width / 2
        }
        y2={heightOfRoot + halfOfGap * 2}
      />
    </svg>
  ));

  return (
    <>
      {rootLine}
      {middleLine}
      {categoryLines}
    </>
  );
};

export default Lines;
