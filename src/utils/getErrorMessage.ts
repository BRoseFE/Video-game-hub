export const getErrorMessage = (status: number): string => {
	switch (status) {
		// Client errors (400)
		case 400:
			return "Invalid request. Please check your search and try again.";

		case 401:
			return "Authentication failed. The API service could not authorize this request.";

		case 402:
			return "API key is limited to 50 calls per day. Limit has been reached";

		case 403:
			return "Access denied. You don't have permission to access this resource.";

		case 404:
			return "The requested resource could not be found.";

		case 408:
			return "The request timed out. Please try again.";

		case 409:
			return "There was a conflict processing your request. Please try again.";

		case 422:
			return "The request was understood, but the provided information was invalid.";

		case 429:
			return "Too many requests. The API service is temporarily limiting requests. Please wait a moment and try again.";

		// Server errors (500)
		case 500:
		case 501:
		case 502:
		case 503:
		case 504:
			return "The API service is currently unavailable. This issue is with the external API service, not your device or this website. Please try again later.";

		default:
			if (status >= 500) {
				return "The API service is currently experiencing issues. Please try again later.";
			}

			return "Something went wrong while processing your request. Please try again.";
	}
};
