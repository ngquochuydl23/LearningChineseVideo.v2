import { Appearance } from 'react-native';

export const commonColor = {
    primaryColor: '#121212'
}

export const lightModeColors = {
    ...commonColor,
    text: '#222',
    textAccent: '#444',
    background: '#fff',
    statusBar: '#fff',

    backgroundSubColor: '#f5f5f5',
    textPrimaryColor: '#000',
    textSecondaryColor: '#696969'
}

export const darkModeColors = {
    ...commonColor,
    text: '#fff',
    textAccent: '#ccc',
    background: '#222',
    statusBar: '#222',

    backgroundSubColor: '#f5f5f5',
    textPrimaryColor: '#000',
    textSecondaryColor: '#696969'
}

const isDark = Appearance.getColorScheme() === 'dark';

export const colors = isDark ? darkModeColors : lightModeColors;
