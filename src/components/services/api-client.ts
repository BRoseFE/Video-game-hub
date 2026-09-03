import axios from "axios";

export default axios.create({
	baseURL: "https://api.rawg.io/api",
	params: {
		key: "99ca521062414bf2a30cc4171e035891",
	},
});
