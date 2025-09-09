import {
	Button,
	Popover,
	PopoverDisclosure,
	PopoverHeading,
	PopoverProvider,
	Select,
	SelectItem,
	SelectPopover,
	SelectProvider,
	SelectValue,
	Separator,
} from '@ariakit/react';
import { useAtom } from 'jotai';
import type { ParsedEncounterType } from '../stores/encounter';
import { settingsStore, showFakeDataAtom } from '../stores/settings';
import { CheckboxC } from './ui/Checkbox';

export default function EncounterHeader({
	encounter,
}: {
	encounter: ParsedEncounterType | null;
}) {
	const [settings, setSettings] = useAtom(settingsStore);
	const [showFakeData, setShowFakeData] = useAtom(showFakeDataAtom);

	const handleChange = (value: 'Role' | 'Class') => {
		setSettings({
			...settings,
			combatantColors: value,
		});
	};

	return (
		<header className="text-[#d0d0d0] text-sm flex flex-row items-center justify-between pt-0.5">
			<div className="bg-[#d0d0d0] text-black rounded-[0.1875rem] px-0.5 text-xs mt-1">
				<PopoverProvider>
					<PopoverDisclosure>YAO</PopoverDisclosure>
					<Popover
						arrowPadding={0}
						className="bg-bg text-black p-1 rounded-[0.1875rem] border-text flex flex-col gap-1 font-Shantell text-xs z-40 font-bold"
						gutter={4}
						modal={true}
					>
						<PopoverHeading className="text-sm font-medium flex justify-center bg-text text-bg rounded-md py-1">
							SETTINGS
						</PopoverHeading>
						<div className="flex flex-row justify-between gap-2 items-center">
							<span>Colors:</span>
							<SelectProvider
								setValue={handleChange}
								value={settings.combatantColors}
							>
								<Select className="uppercase bg-text text-bg ps-1 pe-0.5 py-0.5 rounded-md flex flex-row items-center">
									<SelectValue />
									<svg
										className="size-3.5"
										fill="none"
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="3"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<title>UpDownShevron</title>
										<path d="m7 15 5 5 5-5" />
										<path d="m7 9 5-5 5 5" />
									</svg>
								</Select>
								<SelectPopover
									className="z-50 bg-text text-bg p-1 rounded-md"
									gutter={4}
									sameWidth
								>
									<SelectItem
										className="cursor-default uppercase hover:bg-bg hover:text-text rounded-xs px-0.5"
										value={'Role'}
									/>
									<SelectItem
										className="cursor-default uppercase hover:bg-bg hover:text-text rounded-xs px-0.5"
										value={'Class'}
									/>
								</SelectPopover>
							</SelectProvider>
						</div>
						<div
							className="flex flex-row justify-between gap-2 items-center"
							title="Doesn't work for now :3"
						>
							<span>Formatted Nums:</span>
							<CheckboxC></CheckboxC>
						</div>
						<Separator
							className="text-text/50 border-1 rounded-xs"
							orientation="horizontal"
						/>
						<Button
							className={`rounded-md flex items-center justify-center font-medium py-0.5 border-2 border-text/50 focus-visible:bg-text/15 focus-visible:outline-none cursor-pointer ${showFakeData ? 'bg-text text-bg' : ''}`}
							onClick={() => {
								setShowFakeData(!showFakeData);
							}}
						>
							{showFakeData ? 'HIDE' : 'SHOW'} FAKE DATA
						</Button>
					</Popover>
				</PopoverProvider>
			</div>
			{encounter && (
				<>
					<span className="text-outline">{encounter.duration}</span>
					<span className="text-outline pe-0.5">{encounter.dps}</span>
				</>
			)}
		</header>
	);
}
