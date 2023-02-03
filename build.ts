import { join } from 'path';
// import * as awsui from '@cloudscape-design/design-tokens';
import { Theme, buildThemedComponents } from '@cloudscape-design/components-themeable/theming';

const theme: Theme = {
   tokens: {
        fontFamilyBase: "'Helvetica Neue', Roboto, Arial, sans-serif",
        // colorTextAccent: awsui.colorTextBodyDefault,
        colorTextEmpty: awsui.colorBackgroundButtonPrimaryHover,
        colorBackgroundButtonPrimaryActive: {
          light: "blue",
          dark: "pink"
        },
        
   },
   
};

buildThemedComponents({ theme, outputDir: join(__dirname, './themed') });