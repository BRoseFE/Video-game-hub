import { Input, InputGroup } from "@chakra-ui/react";
import { useRef } from "react";
import { BsSearch } from "react-icons/bs";

interface Props {
	onSearch: (searchText: string) => void;
}

function SearchInput({ onSearch }: Props) {
	const ref = useRef<HTMLInputElement>(null);

	return (
		<form
			onSubmit={(event) => {
				event.preventDefault();
				if (ref.current) onSearch(ref.current.value);
			}}
		>
			<InputGroup padding={2} startElement={<BsSearch />}>
				<Input
					ref={ref}
					placeholder="Search games..."
					borderRadius={20}
					variant="subtle"
				/>
			</InputGroup>
		</form>
	);
}

export default SearchInput;
