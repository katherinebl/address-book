import { FC } from 'react';
import styles from './Footer.module.scss';

const Footer: FC = () => {
	return (
		<footer className={styles.container}>
			<p>
				Made with <span>🫶</span> by Katherine Briceño
			</p>
		</footer>
	);
};
export default Footer;
