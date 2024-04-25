import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';
import clsx from 'clsx';

export type OnClick = () => void;

export type ArrowButtonProps = {
	isOpen?: boolean;
	func?: OnClick;
};

export const ArrowButton = ({ isOpen, func }: ArrowButtonProps) => {
	return (
		<div
			onClick={func}
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={clsx(styles.container, { [styles.container_open]: isOpen })}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, { [styles.arrow_open]: isOpen })}
			/>
		</div>
	);
};
