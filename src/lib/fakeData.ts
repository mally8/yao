import type { JobType } from 'ffxiv-overlay-api/lib/types';
import { useAtomValue } from 'jotai';
import {
	generateId,
	type ParsedCombatantType,
	type ParsedEncounterType,
} from '../stores/encounter';
import { settingsStore } from '../stores/settings';
import { getJobColor } from './encounterUtils';

const generateTestCombatantData = (
	name: string,
	job: string,
	jobType: JobType,
	maxHit?: string,
): ParsedCombatantType => {
	const settings = useAtomValue(settingsStore);
	let dps: number;

	if (jobType === 'dps') {
		dps = Math.floor(Math.random() * 10000) + 20000; // 20000 - 29999
	} else if (jobType === 'tank') {
		dps = Math.floor(Math.random() * 5000) + 10000; // 10000 - 14999
	} else {
		dps = Math.floor(Math.random() * 5000) + 5000; // 1000 - 4999
	}

	const damage = dps * 60;
	const deaths = Math.floor(Math.random() * 3);
	const jobColor = getJobColor(job, settings.combatantColors);

	return {
		id: generateId(),
		name: name,
		dps: dps,
		totalDamage: damage,
		deaths: deaths,
		job: job,
		jobType: jobType,
		jobColor: jobColor,
		maxHit: maxHit ?? 'FLARESTRIKE',
		maxHitDamage: Math.floor(damage / 10),
	};
};

const generateFakeData = () => {
	const combatants: ParsedCombatantType[] = [
		generateTestCombatantData('Levi', 'blm', 'dps', 'Xenoglossy'),
		generateTestCombatantData('Zidane', 'nin', 'dps', 'Hyosho Ranryo'),
		generateTestCombatantData('Tidus', 'drg', 'dps', 'Heavens Thrust'),
		generateTestCombatantData('Wakka', 'brd', 'dps', 'Radiant Encore'),
		generateTestCombatantData('Auron', 'pld', 'tank', 'Confiteor'),
		generateTestCombatantData('Gladio', 'war', 'tank', 'Ruination'),
		generateTestCombatantData('Yuna', 'sch', 'healer', 'Broil 4'),
		generateTestCombatantData('Teena', 'whm', 'healer', 'Afflatus Misery'),
	].sort((a, b) => b.totalDamage - a.totalDamage);

	const encounter: ParsedEncounterType = {
		zoneName: 'The Kitchen',
		title: 'The Final Cooking',
		totalDamage: combatants.reduce(
			(acc, curr) => acc + curr.totalDamage,
			0,
		),
		dps: combatants.reduce((acc, curr) => acc + curr.dps, 0),
		duration: '01:00',
		deaths: combatants.reduce((acc, curr) => acc + curr.deaths, 0),
	};

	return { combatants, encounter };
};

export { generateFakeData };
