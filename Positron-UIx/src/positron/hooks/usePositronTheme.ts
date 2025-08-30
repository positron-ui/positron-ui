import { positronConfig, type PositronTheme } from '../positron.config';

export function usePositronTheme(): PositronTheme {
  return positronConfig.theme;
}
