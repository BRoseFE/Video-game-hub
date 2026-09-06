import { Card, CardBody, Skeleton, SkeletonText } from "@chakra-ui/react";

function GameCardSkeleton() {
	return (
		<Card.Root borderRadius={10} width="300px" overflow="hidden">
			<Skeleton height="200px" />
			<CardBody>
				<SkeletonText />
			</CardBody>
		</Card.Root>
	);
}

export default GameCardSkeleton;
