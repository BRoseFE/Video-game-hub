import NavBar from "@/components/NavBar";
import { Box, Heading, Text } from "@chakra-ui/react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import { getErrorMessage } from "@/utils/getErrorMessage";
import axios from "axios";

const ErrorPage = () => {
	const error = useRouteError();

	console.log("Caught route error:", error);
	console.log("Is Axios error:", axios.isAxiosError(error));

	let status = 0;

	if (isRouteErrorResponse(error)) {
		status = error.status;
	} else if (axios.isAxiosError(error)) {
		status = error.response?.status ?? 0;
	}

	const errorMessage = getErrorMessage(status);

	return (
		<>
			<NavBar />
			<Box textAlign="center" padding={5}>
				<Heading mb={3}>Oops...</Heading>
				<Text>{errorMessage}</Text>
			</Box>
		</>
	);
};

export default ErrorPage;
