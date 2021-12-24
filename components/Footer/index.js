import styles from '../../styles/Footer.module.css';

/** Site footer. */
const Footer = () => {
    return (
        <footer className={styles.container}>
            <span>&copy; David Calhoun Photography</span>
            <span>
                <span>Contact: </span>
                <a href="mailto:davidcalhounphotography+web@gmail.com">davidcalhounphotography+web@gmail.com</a>
            </span>
        </footer>
    );
};

export default Footer;
