import {
  defineConfig,
  presetAttributify,
  presetUno,
  presetWind,
  transformerDirectives,
} from 'unocss';

export default defineConfig({
  presets: [presetUno(), presetAttributify(), presetWind()],
  transformers: [transformerDirectives()],
  shortcuts: [
    ['wh-full', 'w-full h-full'],
    ['flex-center', 'flex justify-center items-center'],
    ['flex-col', 'flex flex-col'],
    ['flex-row', 'flex flex-row'],
    ['flex-col-center', 'flex flex-col justify-center items-center'],
    ['text-ellipsis', 'truncate'],
    ['text-standard', 'text-sm md:text-base'],
    ['text-standard-small', 'text-xs md:text-sm'],
    ['text-standard-big', 'text-base md:text-5'],
  ],
  rules: [],
  theme: {
    colors: {
      // text: '#ecf4ed',
      // background: '#061207',
      // primary: '#1fe52d',
      // secondary: '#314b54',
      // accent: '#4a607d',
      text: '#0b151a',
      background: '#f1f8fb',
      primary: '#D3EFFD',
      secondary: '#7bc9f1',
      accent: '#2DB6FB',
    },
  },
});

