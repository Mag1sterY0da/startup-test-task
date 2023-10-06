import Button from '@/shared/components/Button/Button';
import { Category } from '@/types/Category';
import { useRef, useState } from 'react';
import CategoriesRow from '../CategoryRow/CategoriesRow';
import styles from './DraggableArea.module.scss';

type Position = {
  x: number;
  y: number;
};

type DraggableAreaProps = {
  zoom: number;
};

const DraggableArea = ({ zoom }: DraggableAreaProps) => {
  const [dragging, setDragging] = useState<boolean>(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [startPosition, setStartPosition] = useState<Position>({ x: 0, y: 0 });
  const [categories, setCategories] = useState<Category[]>([]);
  const categoriesContainerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setDragging(true);
    setStartPosition({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dragging) {
      const newX = e.clientX - startPosition.x;
      const newY = e.clientY - startPosition.y;
      setPosition({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const addCategory = () => {
    setCategories(prev => [
      ...prev,
      { id: Math.random(), name: '', isEditing: true }
    ]);
  };

  return (
    <div
      className={styles.draggableArea}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div
        className={styles.draggableObjects}
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`
        }}
      >
        <div className={styles.categoryRoot}>
          Categories
          <Button className={styles.addCategoryButton} onClick={addCategory}>
            +
          </Button>
        </div>
        <div
          className={styles.categoriesContainer}
          ref={categoriesContainerRef}
        >
          <CategoriesRow
            categories={categories}
            setCategories={setCategories}
          />
        </div>
        {categories.length === 1 ? (
          <Line />
        ) : (
          <Lines
            categories={categories}
            categoriesContainerRef={categoriesContainerRef}
          />
        )}
      </div>
    </div>
  );
};

const Line = () => {
  const heightOfRoot = 40;
  const gap = 40;

  return (
    <svg className={styles.line} key='rootLine' width='100%' height='100%'>
      <line x1='50%' y1={heightOfRoot} x2='50%' y2={heightOfRoot + gap} />
    </svg>
  );
};

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

export default DraggableArea;
