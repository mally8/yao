import { useAtomValue } from 'jotai';
import { getJobColor } from '../lib/encounterUtils';
import type {
	ParsedCombatantType,
	ParsedEncounterType,
} from '../stores/encounter';
import { settingsStore } from '../stores/settings';
import EncounterHeader from './EncounterHeader';

export default function EncounterView({
	encounter,
	combatants,
}: {
	encounter: ParsedEncounterType | null;
	combatants: ParsedCombatantType[] | undefined;
}) {
	const settings = useAtomValue(settingsStore);

	return (
		<div className="px-0.5 w-full h-full overflow-y-auto">
			<div className="overflow-x-hidden">
				<EncounterHeader encounter={encounter} />
				<ul className="flex flex-col text-base">
					{combatants?.map((c) => {
						return (
							<li key={`${c.id}`}>
								<div className="flex flex-row justify-between gap-1 -mb-[11px] z-10">
									<span
										className="ont-black text-outline shrink-0"
										style={{
											color: getJobColor(
												c.job,
												settings.combatantColors,
											),
										}}
									>
										{c.name}
									</span>
									{settings.showMaxHit && (
										<span
											className="font-bold text-xs flex flex-col z-10 overflow-hidden"
											style={{
												color: getJobColor(
													c.job,
													settings.combatantColors,
												),
											}}
										>
											<p className="text-outline text-[0.625rem] -mb-1.5 max-w-[12ch] truncate px-0.5">
												{c.maxHit}
											</p>
											<p className="text-outline -mb-1">
												{c.maxHitDamage}
											</p>
										</span>
									)}
									<span
										className="font-black text-outline shrink-0 pe-0.5"
										style={{
											color: getJobColor(
												c.job,
												settings.combatantColors,
											),
										}}
									>
										{c.dps}
									</span>
								</div>
								<div
									className="w-full h-[0.625rem] rounded-[0.1875rem] border-[2px] border-black"
									style={{
										backgroundColor: getJobColor(
											c.job,
											settings.combatantColors,
										),
										width: `${(c.totalDamage / combatants[0].totalDamage) * 100}%`,
									}}
								/>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
}
