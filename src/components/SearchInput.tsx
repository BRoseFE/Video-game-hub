import useGameQueryStore from "@/store";
import { Input, InputGroup } from "@chakra-ui/react";
import { useRef } from "react";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function SearchInput() {
	const ref = useRef<HTMLInputElement>(null);
	const setSearchText = useGameQueryStore((s) => s.setSearchText);
	const navigate = useNavigate();

	return (
		<form
			onSubmit={(event) => {
				event.preventDefault();
				if (ref.current) {
					setSearchText(ref.current.value);
					navigate("/");
				}
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
