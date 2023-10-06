import { useState } from 'react';
import send from './assets/send.svg';
import Container from './components/Container/Container';
import DraggableArea from './components/DraggableArea/DraggableArea';
import Header from './components/Header/Header';
import ZoomControls from './components/ZoomControls/ZoomControls';
import { zoomOptions } from './data/zoomOptions';
import Button from './shared/components/Button/Button';
import Select from './shared/components/Select/Select';

const App = () => {
  const [zoom, setZoom] = useState<number>(1);

  const handleZoom = (value: number) => {
    setZoom(value);
  };

  const increaseZoom = () => {
    const index: number = zoomOptions.findIndex(
      option => option.value === zoom
    );
    if (zoomOptions[index + 1]) {
      setZoom(zoomOptions[index + 1].value);
    }
  };

  const decreaseZoom = () => {
    const index: number = zoomOptions.findIndex(
      option => option.value === zoom
    );
    if (zoomOptions[index - 1]) {
      setZoom(zoomOptions[index - 1].value);
    }
  };

  return (
    <Container>
      <Header>
        <ZoomControls>
          <Button>
            <img src={send} alt='Send Icon' />
          </Button>
          <Button onClick={decreaseZoom}>-</Button>
          <Select options={zoomOptions} value={zoom} onChange={handleZoom} />
          <Button onClick={increaseZoom}>+</Button>
        </ZoomControls>
      </Header>
      <DraggableArea zoom={zoom} />
    </Container>
  );
};

export default App;
