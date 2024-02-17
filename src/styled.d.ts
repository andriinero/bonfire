import 'styled-components';
import MainTheme from './MainTheme';

type MainThemeType = typeof MainTheme;

declare module 'styled-components' {
  export interface DefaultTheme extends MainThemeType {}
}
