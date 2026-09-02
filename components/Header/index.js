import Link from 'next/link';

import styles from '../../styles/Header.module.css';

const Header = ({ isMainIndex = false, pageTitle = '' }) => {
    return (
        <hgroup className={styles.container}>
            <Link href="/">

                {isMainIndex ? <h1 className={styles.title}>David Calhoun</h1> : <h2 className={styles.title}>David Calhoun</h2>}

            </Link>
            {isMainIndex ? <div><h2 className={styles.subtitle}>Landscape and Travel Photography</h2><h2 className={styles.subtitle}>Based in Raleigh, NC</h2><h2 className={styles.subtitle}>davidcalhounphotography@gmail.com</h2></div> : <div><h3 className={styles.subtitle}>Landscape and Travel Photography</h3><h1 className={styles.subtitle}>{pageTitle}</h1></div>}
        </hgroup>

    );
};

export default Header;
