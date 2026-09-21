import { Input, InputGroup } from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";

function SearchInput() {
	return (
		<InputGroup paddingX={5} startElement={<BsSearch />}>
			<Input
				placeholder="Search games..."
				borderRadius={20}
				variant="subtle"
			/>
		</InputGroup>
	);
}

export default SearchInput;
