import {
	FaPlaystation,
	FaXbox,
	FaWindows,
	FaLinux,
	FaApple,
} from "react-icons/fa";
import { BsNintendoSwitch, BsAndroid2, BsGlobe } from "react-icons/bs";
import { MdPhoneIphone } from "react-icons/md";
import type { Platform } from "@/hooks/useGames";
import { HStack, Icon } from "@chakra-ui/react";
import type { IconType } from "react-icons";

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
			{platforms.map((platform) => (
				<Icon
					key={platform.id}
					as={iconMap[platform.slug]}
					color="gray.500"
				/>
			))}
		</HStack>
	);
}

export default PlatformIconList;
