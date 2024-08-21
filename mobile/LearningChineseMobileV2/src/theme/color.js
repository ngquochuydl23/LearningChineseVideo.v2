import { Appearance } from 'react-native';

export const commonColor = {
    primaryColor: "#06AED4"
}

export const lightModeColors = {
    ...commonColor,
    text: '#222',
    textAccent: '#444',
    background: '#fff',
    statusBar: '#fff',

    backgroundSubColor: '#f5f5f5',
    textPrimaryColor: '#000',
    textSecondaryColor: '#696969',
    borderColor: '#d3d3d3',
    iconColor: '#d3d3d3',
    fieldInputColor: '#f5f5f5',
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
