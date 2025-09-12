import { atom } from 'jotai';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';

export type SettingsStore = {
	combatantColors: 'Role' | 'Class';
	formatNumbers: 'Abbreviated' | 'Full';
	showMaxHit: boolean;
};

const settingsStorage = createJSONStorage<SettingsStore>(() => localStorage);

export const settingsStore = atomWithStorage<SettingsStore>(
	'settings',
	{
		combatantColors: 'Class',
		formatNumbers: 'Full',
		showMaxHit: true,
	},
	{
		...settingsStorage,
		getItem: (key, initialValue) => {
			const storedValue = settingsStorage.getItem(key, initialValue);

			return {
				...initialValue,
				...storedValue,
			};
		},
	},
	{
		getOnInit: true,
	},
);

export const showFakeDataAtom = atom<boolean>(false);
