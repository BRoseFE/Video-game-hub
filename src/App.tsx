import ThisButton from "@/components/shared/ThisButton";

function App() {
	return (
		<>
			<ThisButton
				color="orange"
				variant="surface"
				text="Demo"
				onClick={() => {
					alert("Button clicked!");
				}}
			/>
		</>
	);
}

export default App;
