import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import {
	OptionType,
	defaultArticleState,
	fontColors,
	fontSizeOptions,
	fontFamilyOptions,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';
import React, { FormEvent, useRef, useState } from 'react';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { Text } from '../text';
import clsx from 'clsx';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';

type ArticleParamsFormProps = {
	state: typeof defaultArticleState;
	setState: React.Dispatch<React.SetStateAction<typeof defaultArticleState>>;
	reset: () => void;
	handleSumbit: () => void;
};

export const ArticleParamsForm = ({
	state,
	setState,
	handleSumbit,
	reset,
}: ArticleParamsFormProps) => {
	const handleFontFamilyChange = (value: OptionType) => {
		setState({ ...state, fontFamilyOption: value });
	};

	const handleFontSizeChange = (value: OptionType) => {
		setState({ ...state, fontSizeOption: value });
	};

	const handleFontColorChange = (value: OptionType) => {
		setState({ ...state, fontColor: value });
	};

	const handleBgColorChange = (value: OptionType) => {
		setState({ ...state, backgroundColor: value });
	};

	const handleWidth = (value: OptionType) => {
		setState({ ...state, contentWidth: value });
	};

	const [openMenu, setOpenMenu] = useState(false);

	const toggleMenu = () => {
		setOpenMenu(!openMenu);
	};

	const rootRef = useRef(null);

	useOutsideClickClose({
		isOpen: openMenu,
		rootRef: rootRef,
		onChange: toggleMenu,
	});

	return (
		<div ref={rootRef}>
			<ArrowButton
				func={() => {
					toggleMenu();
				}}
				isOpen={openMenu}
			/>
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: openMenu,
				})}>
				<form
					className={styles.form}
					onSubmit={(elem: FormEvent) => {
						elem.preventDefault();
						handleSumbit();
					}}>
					<Text as={'h2'} size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						placeholder={'Выберете шрифт'}
						selected={state.fontFamilyOption}
						onChange={handleFontFamilyChange}
						title={'Шрифт'}
					/>
					<RadioGroup
						name={'fontSize'}
						options={fontSizeOptions}
						selected={state.fontSizeOption}
						onChange={handleFontSizeChange}
						title={'Размер шрифта'}
					/>
					<Select
						options={fontColors}
						placeholder={'Выберете цвет'}
						selected={state.fontColor}
						onChange={handleFontColorChange}
						title={'Цвет шрифта'}
					/>
					<Separator></Separator>
					<Select
						options={backgroundColors}
						placeholder={'выберете цвет фона'}
						selected={state.backgroundColor}
						onChange={handleBgColorChange}
						title={'Цвет фона'}
					/>
					<Select
						options={contentWidthArr}
						placeholder={'выберете ширину'}
						selected={state.contentWidth}
						onChange={handleWidth}
						title={'ширина контента'}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={reset} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
