import Link from 'next/link';

import styles from '../../styles/Header.module.css';

const Header = ({ isMainIndex = true }) => {
    return (
        <hgroup className={styles.container}>
            <Link href="/" passHref>
                <a>
                    {isMainIndex ? <h1 className={styles.title}>David Calhoun</h1> : <h2 className={styles.title}>David Calhoun</h2>}
                </a>
            </Link>
            {isMainIndex ? <h2 className={styles.subtitle}>Landscape and travel photography</h2> : <h3 className={styles.subtitle}>Landscape and travel photography</h3>}
        </hgroup>
    );
};

export default Header;
