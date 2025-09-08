import type { EventData } from 'ffxiv-overlay-api/lib';
import { atom } from 'jotai';
import { getJobColor } from '../lib/encounterUtils';
import { settingsStore } from './settings';

export type ParsedEncounterType = {
	zoneName: string;
	title: string;
	totalDamage: number;
	dps: number;
	duration: string;
	deaths: number;
};

export type ParsedCombatantType = {
	name: string;
	dps: number;
	totalDamage: number;
	deaths: number;
	job: string;
	jobType: 'dps' | 'healer' | 'tank' | 'hand' | 'land' | 'unknown';
	jobColor: string;
	maxHit: string;
	maxHitDamage: number;
};

const prevCombAtom = atom<number | null>(null);
const prevEncAtom = atom<number | null>(null);

export const encounterAtom = atom<ParsedEncounterType | null>(null);
export const parseEncounterAtom = atom(
	null,
	(get, set, rawEventData: EventData) => {
		if (!rawEventData.extendData) {
			console.log('No encounter data found');
			return;
		}
		const extendData = rawEventData.extendData;

		if (extendData.encounter.durationSeconds === get(prevEncAtom)) return;
		set(prevEncAtom, extendData.encounter.durationSeconds);

		const { zoneName, dps, damage, duration } = extendData.encounter;
		const { title, deaths } = rawEventData.Encounter;
		const newEncounter = {
			zoneName: zoneName,
			title: title,
			totalDamage: damage,
			dps: dps,
			duration: duration,
			deaths: deaths,
		};

		set(encounterAtom, newEncounter);
		console.log('[STATE:ENCOUNTER] Updated: ', newEncounter);
	},
);

export const combatantsAtom = atom<ParsedCombatantType[]>();
export const parseCombatantsAtom = atom(
	null,
	(get, set, rawEventData: EventData) => {
		const store = get(settingsStore);

		if (!rawEventData.extendData) {
			console.log('No encounter data found');
			return;
		}
		const extendData = rawEventData.extendData;

		if (extendData.encounter.durationSeconds === get(prevCombAtom)) return;
		set(prevCombAtom, extendData.encounter.durationSeconds);

		const rawCombatantsData = extendData.combatant;
		const parsedCombatants = rawCombatantsData.flatMap((combat) => {
			const {
				name,
				dps,
				damage,
				deaths,
				job,
				jobType,
				maxHit,
				maxHitDamage,
			} = combat;

			if (
				jobType === 'hand' ||
				jobType === 'land' ||
				jobType === 'unknown'
			)
				return [];

			const jobColor = getJobColor(job, store.combatantColors);

			return {
				name: name.split(' ')[0] ?? 'YOU',
				dps: dps,
				totalDamage: damage,
				deaths: deaths,
				job: job,
				jobType: jobType,
				jobColor: jobColor,
				maxHit: maxHit,
				maxHitDamage: maxHitDamage,
			};
		});
		set(combatantsAtom, parsedCombatants);
		console.log('[STATE:COMBATANTS] Updated: ', parsedCombatants);
	},
);
