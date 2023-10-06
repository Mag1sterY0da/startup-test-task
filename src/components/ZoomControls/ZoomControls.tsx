import style from './ZoomControls.module.scss';

type ZoomControlsProps = {
  children: React.ReactNode;
};

const ZoomControls = ({ children }: ZoomControlsProps) => {
  return <div className={style.zoomControlsContainer}>{children}</div>;
};

export default ZoomControls;
