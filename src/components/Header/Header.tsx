import { FC } from 'react';
import styles from './Header.module.scss';

const Header: FC = () => {
	return (
		<header className={styles.container}>
			<h1>Awesome Address Book</h1>
		</header>
	);
};
export default Header;
