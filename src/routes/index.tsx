import { createFileRoute } from '@tanstack/react-router';
import { OverlayAPI } from 'ffxiv-overlay-api/lib';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import Encounter from '../components/Encounter';
import { parseCombatantsAtom, parseEncounterAtom } from '../stores/encounter';

export const Route = createFileRoute('/')({
	component: App,
});

const overlayApi = new OverlayAPI();

function App() {
	const parseEncounter = useSetAtom(parseEncounterAtom);
	const parseCombatants = useSetAtom(parseCombatantsAtom);

	useEffect(() => {
		overlayApi.addListener('CombatData', (data) => {
			// console.log(data);
			parseEncounter(data);
			parseCombatants(data);
		});
		overlayApi.startEvent();

		return () => {
			overlayApi.removeAllListener('CombatData');
		};
	}, [parseEncounter, parseCombatants]);

	return (
		<main className="w-screen max-w-screen h-dvh max-h-dvh overflow-x-hidden font-Shantell font-bold ">
			<Encounter />
		</main>
	);
}
