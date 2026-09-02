import styles from '../../styles/Footer.module.css';

/** Site footer. */
const Footer = () => {
    return (
        <footer className={styles.container}>
            <span>&copy;davidcalhounphotography.com</span>
            <span>
                <span>Contact: </span>
                <a href="mailto:davidcalhounphotography@gmail.com">davidcalhounphotography@gmail.com</a>
            </span>
        </footer>
    );
};

export default Footer;
