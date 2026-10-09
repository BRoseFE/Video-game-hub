import axios from "axios";

export interface FetchResponse<T> {
	count: number;
	results: T[];
}

export default axios.create({
	baseURL: "https://api.rawg.io/api",
	params: {
		key: "6ba99aa5f482414595fd7777f2610094", // This is a temp key for build testing
		// Will be refreshed with a new key and vercel environment variable created to hide api
		// from github repo and public view
	},
});

// This is the code needed for production, replace all above code with this
// My api key stored on vercel will not be accessible
//
//
//code starts here:
//
// import axios from "axios";

// export default axios.create({
// 	baseURL: "/api",
// });
