import {
	HStack,
	Skeleton,
	SkeletonCircle,
	SkeletonText,
	Stack,
} from "@chakra-ui/react";

function GenreListSkeleton() {
	return (
		<Stack gap="6" maxW="xs">
			<HStack width="full">
				<SkeletonCircle size="10" />
				<SkeletonText noOfLines={2} />
			</HStack>
			<Skeleton width="200px" />
		</Stack>
	);
}

export default GenreListSkeleton;
