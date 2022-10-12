import type {SimpleIcon} from 'simple-icons';
import * as simpleIcons from 'simple-icons/icons'; // eslint-disable-line n/file-extension-in-import
import {normalizeColor} from './utils';

export const getSimpleIcon = (slug?: string) => {
	if (!slug) {
		return null;
	}

	const normaizedSlug = slug
		.toLowerCase()
		.replace(/\+/g, 'plus')
		.replace(/\./g, 'dot');

	const iconKey = ('si'
		+ normaizedSlug.charAt(0).toUpperCase()
		+ normaizedSlug.slice(1)) as keyof typeof simpleIcons;

	if (iconKey in simpleIcons) {
		return simpleIcons[iconKey];
	}

	return null;
};

export const getIconSvg = (icon: SimpleIcon, color = '') => {
	console.log('color', color)
	const hex = normalizeColor(color) || `#${icon.hex}`;
	console.log(hex);
	return icon.svg.replace('<svg ', `<svg fill="${hex}" `);
};
