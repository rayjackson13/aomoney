import { get, writable } from 'svelte/store';

import type { HeaderProps } from 'types/common';

export const headerProps = writable<HeaderProps>({
  visible: false,
  hasBackButton: false,
});

export const setHeaderProps = (props: HeaderProps) => headerProps.set(props);

export const getHeaderProps = () => get(headerProps);
