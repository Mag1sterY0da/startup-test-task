import { useState } from 'react';
import Container from './components/Container/Container';
import DraggableArea from './components/DraggableArea/DraggableArea';
import Header from './components/Header/Header';
import ZoomControls from './components/ZoomControls/ZoomControls';
import { zoomOptions } from './data/zoomOptions';
import Button from './shared/components/Button/Button';
import Select from './shared/components/Select/Select';
import { Position } from './types/position';

const App = () => {
  const [zoom, setZoom] = useState<number>(1);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [startPosition, setStartPosition] = useState<Position>({ x: 0, y: 0 });

  const handleZoom = (value: number): void => {
    setZoom(value);
  };

  const increaseZoom = (): void => {
    const index: number = zoomOptions.findIndex(
      option => option.value === zoom
    );
    if (zoomOptions[index + 1]) {
      setZoom(zoomOptions[index + 1].value);
    }
  };

  const decreaseZoom = (): void => {
    const index: number = zoomOptions.findIndex(
      option => option.value === zoom
    );
    if (zoomOptions[index - 1]) {
      setZoom(zoomOptions[index - 1].value);
    }
  };

  const centerPosition = (): void => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <Container>
      <Header>
        <ZoomControls>
          <Button onClick={centerPosition}>
            <i className='ri-send-plane-line ri-xs'></i>
          </Button>
          <Button onClick={decreaseZoom}>
            <i className='ri-subtract-line ri-xs'></i>
          </Button>
          <Select options={zoomOptions} value={zoom} onChange={handleZoom} />
          <Button onClick={increaseZoom}>
            <i className='ri-add-line ri-xs'></i>
          </Button>
        </ZoomControls>
      </Header>
      <DraggableArea
        zoom={zoom}
        position={position}
        setPosition={setPosition}
        startPosition={startPosition}
        setStartPosition={setStartPosition}
      />
    </Container>
  );
};

export default App;
