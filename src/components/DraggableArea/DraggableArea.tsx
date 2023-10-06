import { Category } from '@/classes/Category';
import {
  getCategoriesFromLocalStorage,
  setCategoriesToLocalStorage
} from '@/data/localStorage';
import Button from '@/shared/components/Button/Button';
import { Position } from '@/types/position';
import { useEffect, useRef, useState } from 'react';
import CategoriesRow from '../CategoryRow/CategoriesRow';
import Line from '../Line/Line';
import Lines from '../Lines/Lines';
import styles from './DraggableArea.module.scss';

type DraggableAreaProps = {
  zoom: number;
  position: Position;
  setPosition: React.Dispatch<React.SetStateAction<Position>>;
  startPosition: Position;
  setStartPosition: React.Dispatch<React.SetStateAction<Position>>;
};

const DraggableArea = ({
  zoom,
  position,
  setPosition,
  startPosition,
  setStartPosition
}: DraggableAreaProps) => {
  const [dragging, setDragging] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>(
    getCategoriesFromLocalStorage()
  );
  const categoriesContainerRef: React.RefObject<HTMLDivElement> =
    useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>): void => {
    setDragging(true);
    setStartPosition({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (dragging) {
      const newX: number = e.clientX - startPosition.x;
      const newY: number = e.clientY - startPosition.y;
      setPosition({ x: newX, y: newY });
    }
  };

  const handleMouseUp = (): void => {
    setDragging(false);
  };

  const addCategory = (): void => {
    const newCategory: Category = new Category();
    setCategories([...categories, newCategory]);
  };

  const handleChangePosition = (x: number, y: number): void => {
    setPosition({ x, y });
  };

  useEffect(() => {
    setCategoriesToLocalStorage(categories);
  }, [categories]);

  return (
    <div
      className={styles.draggableArea}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <Button
        className={`${styles.changePositionButton} ${styles.up}`}
        onClick={() => handleChangePosition(position.x, position.y + 50)}
      >
        <i className='ri-arrow-up-s-line'></i>
      </Button>
      <Button
        className={`${styles.changePositionButton} ${styles.down}`}
        onClick={() => handleChangePosition(position.x, position.y - 50)}
      >
        <i className='ri-arrow-down-s-line'></i>
      </Button>
      <Button
        className={`${styles.changePositionButton} ${styles.left}`}
        onClick={() => handleChangePosition(position.x + 50, position.y)}
      >
        <i className='ri-arrow-left-s-line'></i>
      </Button>
      <Button
        className={`${styles.changePositionButton} ${styles.right}`}
        onClick={() => handleChangePosition(position.x - 50, position.y)}
      >
        <i className='ri-arrow-right-s-line'></i>
      </Button>
      <div
        className={styles.draggableObjects}
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`
        }}
      >
        <div className={styles.categoryRoot}>
          Categories
          <Button className={styles.addCategoryButton} onClick={addCategory}>
            <i className='ri-add-line ri-1x'></i>
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

export default DraggableArea;
