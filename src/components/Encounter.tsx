import { useAtomValue } from 'jotai';
import { generateFakeData } from '../lib/fakeData';
import { combatantsAtom, encounterAtom } from '../stores/encounter';
import { showFakeDataAtom } from '../stores/settings';
import EncounterView from './EncounterView';

export default function Encounter() {
	const encounter = useAtomValue(encounterAtom);
	const combatants = useAtomValue(combatantsAtom);
	const showFakeData = useAtomValue(showFakeDataAtom);

	const fakeData = generateFakeData();

	const displayEncounter = showFakeData ? fakeData.encounter : encounter;
	const displayCombatants = showFakeData ? fakeData.combatants : combatants;

	return (
		<EncounterView
			combatants={displayCombatants}
			encounter={displayEncounter}
		/>
	);
}
