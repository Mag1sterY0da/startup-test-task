import Wrapper from '../Wrapper/Wrapper';
import styles from './Header.module.scss';

type HeaderProps = {
  children: React.ReactNode;
};

const Header = ({ children }: HeaderProps) => {
  return (
    <div className={styles.header}>
      <Wrapper>
        <div className={styles.headerContainer}>
          <div className={styles.headerHeadingContainer}>
            <h1 className={styles.headerHeading}>Services</h1>
            <span className={styles.servicesCounter}>0</span>
          </div>
          {children}
        </div>
      </Wrapper>
    </div>
  );
};

export default Header;
