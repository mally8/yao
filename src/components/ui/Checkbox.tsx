import * as Ariakit from '@ariakit/react';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { forwardRef, useState } from 'react';

interface CheckboxProps extends ComponentPropsWithoutRef<'input'> {
	children?: ReactNode;
}

export const CheckboxC = forwardRef<HTMLInputElement, CheckboxProps>(
	function Checkbox({ children, ...props }, ref) {
		const [checked, setChecked] = useState(props.defaultChecked ?? false);
		const [focusVisible, setFocusVisible] = useState(false);
		return (
			// biome-ignore lint/a11y/noLabelWithoutControl: <Input is handled with Aria>
			<label
				className="checkbox"
				data-checked={checked}
				data-focus-visible={focusVisible || undefined}
			>
				<Ariakit.VisuallyHidden>
					<Ariakit.Checkbox
						{...props}
						clickOnEnter
						onBlur={() => setFocusVisible(false)}
						onChange={(event) => {
							setChecked(event.target.checked);
							props.onChange?.(event);
						}}
						onFocusVisible={() => setFocusVisible(true)}
						ref={ref}
					/>
				</Ariakit.VisuallyHidden>
				<div
					className="rounded-md bg-bg data-[checked='true']:bg-text border-2 border-text/50"
					data-checked={checked}
				>
					<svg
						className="size-4 text-transparent data-[checked='true']:text-bg transition-colors"
						data-checked={checked}
						fill="none"
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="3"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<title>Checkmark</title>
						<path d="M20 6 9 17l-5-5" />
					</svg>
				</div>
				{children}
			</label>
		);
	},
);
