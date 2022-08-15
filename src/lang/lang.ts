import { register, init, locale } from 'svelte-i18n';
import { writable, get } from 'svelte/store';

register('en', () => import('./en.json'));
register('ru', () => import('./ru.json'));

export const enum Languages {
  English = 'en',
  Russian = 'ru',
}

export const lang = writable(Languages.English);

lang.subscribe(value => {
  locale.set(value);
});

init({
  fallbackLocale: Languages.English,
  initialLocale: get(locale),
});
