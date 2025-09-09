const DEFAULT_COLOR = '#fafafa';

const roleColor = {
	healer: '#75cc98',
	tank: '#5fc3f1',
	melee: '#f6979d',
	ranged: '#ddad5b',
	mage: '#d59ee5',
} as const;

type CombatantColorSetting = 'Role' | 'Class';

type JobColorInfo = { roleColor: string; classColor: string };

const jobColors: Record<string, JobColorInfo> = {
	nin: { roleColor: roleColor.melee, classColor: '#df4884' },
	drg: { roleColor: roleColor.melee, classColor: '#017cc4' },
	mnk: { roleColor: roleColor.melee, classColor: '#cca567' },
	sam: { roleColor: roleColor.melee, classColor: '#ea916d' },
	rpr: { roleColor: roleColor.melee, classColor: '#ac6ea5' },
	vpr: { roleColor: roleColor.melee, classColor: '#588a61' },
	brd: { roleColor: roleColor.ranged, classColor: '#a8d887' },
	mch: { roleColor: roleColor.ranged, classColor: '#55dac5' },
	dnc: { roleColor: roleColor.ranged, classColor: '#e2b0af' },
	blm: { roleColor: roleColor.mage, classColor: '#b0a0e0' },
	smn: { roleColor: roleColor.mage, classColor: '#40ab7e' },
	rdm: { roleColor: roleColor.mage, classColor: '#d37380' },
	pct: { roleColor: roleColor.mage, classColor: '#ea8ec8' },
	whm: { roleColor: roleColor.healer, classColor: '#d0d0d0' },
	sch: { roleColor: roleColor.healer, classColor: '#7f63e4' },
	ast: { roleColor: roleColor.healer, classColor: '#d9d483' },
	sge: { roleColor: roleColor.healer, classColor: '#7d9bdc' },
	war: { roleColor: roleColor.tank, classColor: '#ce454f' },
	pld: { roleColor: roleColor.tank, classColor: '#aec5d8' },
	drk: { roleColor: roleColor.tank, classColor: '#cb03c1' },
	gnb: { roleColor: roleColor.tank, classColor: '#978b4e' },
};

function getJobColor(
	job: string,
	combatantColors: CombatantColorSetting,
): string {
	const key = job;
	const entry = jobColors[key];

	if (!entry) return DEFAULT_COLOR;

	if (combatantColors === 'Class') {
		return entry.classColor || entry.roleColor || DEFAULT_COLOR;
	}

	return entry.roleColor || DEFAULT_COLOR;
}

export { jobColors, getJobColor };
