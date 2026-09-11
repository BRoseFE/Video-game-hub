import {
	FaPlaystation,
	FaXbox,
	FaWindows,
	FaLinux,
	FaApple,
} from "react-icons/fa";

import { BsNintendoSwitch, BsAndroid2, BsGlobe } from "react-icons/bs";
import { MdPhoneIphone } from "react-icons/md";

import { HStack, Icon } from "@chakra-ui/react";
import type { IconType } from "react-icons";
import type { Platform } from "@/hooks/usePlatforms";

interface Props {
	platforms: Platform[];
}

function PlatformIconList({ platforms }: Props) {
	const iconMap: { [key: string]: IconType } = {
		pc: FaWindows,
		playstation: FaPlaystation,
		xbox: FaXbox,
		nintendo: BsNintendoSwitch,
		android: BsAndroid2,
		mac: FaApple,
		linux: FaLinux,
		ios: MdPhoneIphone,
		web: BsGlobe,
	};

	return (
		<HStack marginY={1}>
			{platforms.map((platform) => {
				const IconComponent = iconMap[platform.slug];

				if (!IconComponent) return null;

				return (
					<Icon
						key={platform.id}
						as={IconComponent}
						color="gray.500"
					/>
				);
			})}
		</HStack>
	);
}

export default PlatformIconList;
