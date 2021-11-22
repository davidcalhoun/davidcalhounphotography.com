import Link from 'next/link';

import styles from '../../styles/Header.module.css';

const Header = () => {
    return (
        <hgroup className={styles.container}>
            <Link href="/" passHref>
                <a>
                    <h1 className={styles.title}>David Calhoun</h1>
                </a>
            </Link>
            <h2 className={styles.subtitle}>Landscape and travel photography</h2>
        </hgroup>
    );
};

export default Header;
