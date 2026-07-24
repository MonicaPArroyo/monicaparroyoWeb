import type { IconBaseProps } from 'react-icons';
import {
	LuArrowUpRight,
	LuMail,
	LuMapPin,
	LuMenu,
	LuMoon,
	LuSun,
	LuX,
} from 'react-icons/lu';

// UI icons — all from Lucide (react-icons/lu), re-exported under stable names.
// Default to 20px; a `className` size (e.g. size-3.5) or `size` prop overrides it.
const withDefault =
	(Icon: (p: IconBaseProps) => React.ReactElement) => (props: IconBaseProps) => (
		<Icon size={20} {...props} />
	);

export const SunIcon = withDefault(LuSun);
export const MoonIcon = withDefault(LuMoon);
export const MenuIcon = withDefault(LuMenu);
export const CloseIcon = withDefault(LuX);
export const ArrowUpRightIcon = withDefault(LuArrowUpRight);
export const MailIcon = withDefault(LuMail);
export const MapPinIcon = withDefault(LuMapPin);
