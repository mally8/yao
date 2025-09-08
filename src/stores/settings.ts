import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export type SettingsStore = {
	combatantColors: 'Role' | 'Class';
	formatNumbers: 'Abbreviated' | 'Full';
};

export const settingsStore = atomWithStorage<SettingsStore>(
	'settings',
	{
		combatantColors: 'Class',
		formatNumbers: 'Full',
	},
	undefined,
	{
		getOnInit: true,
	},
);

export const showFakeDataAtom = atom<boolean>(false);
