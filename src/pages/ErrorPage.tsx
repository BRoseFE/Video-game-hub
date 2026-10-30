import NavBar from "@/components/NavBar";
import { Box, Heading, Text } from "@chakra-ui/react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

const ErrorPage = () => {
	const error = useRouteError();

	let errorMessage: string;

	if (isRouteErrorResponse(error)) {
		errorMessage =
			error.data?.toString() || error.statusText || "An error occurred.";
	} else if (error instanceof Error) {
		errorMessage = error.message;
	} else {
		errorMessage = "An unexpected error occurred.";
	}

	return (
		<>
			<NavBar />
			<Box justifyItems="center" padding={5}>
				<Heading>Oops...</Heading>
				<Text>{errorMessage}</Text>
			</Box>
		</>
	);
};

export default ErrorPage;
