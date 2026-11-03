import NavBar from "@/components/NavBar";
import { Box, Heading, Text } from "@chakra-ui/react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import { getErrorMessage } from "@/utils/getErrorMessage";

const ErrorPage = () => {
	const error = useRouteError();

	let errorMessage: string;

	if (isRouteErrorResponse(error)) {
		errorMessage = getErrorMessage(error.status);
	} else if (error instanceof Error) {
		errorMessage = error.message;
	} else {
		errorMessage = "An unexpected error occurred.";
	}

	return (
		<>
			<NavBar />
			<Box textAlign="center" padding={5}>
				<Heading mb={3}>Oops...</Heading>
				<Text>{errorMessage}</Text>
				<Text>
					{" "}
					Unfortunately, rawg.io website is down and in this case, the
					API is also not working
				</Text>
			</Box>
		</>
	);
};

export default ErrorPage;
