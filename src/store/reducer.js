import * as actionTypes from "./constants";

let component = "";
let idIteration = null;
let stateArray = [];
let tempCopy = [];

const initialState = {
	components: [],
	uniqueIdCounter: 0,
	currentPage: 1,
	copy: [],
	siteURL: "/salespage/"
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_COMPONENT:
			stateArray = [...state.components];
			console.log("state:", state);
			console.log("State Copy:", state.copy);
			component = action.payload[0]; // will be "Header", "Headline", "Text Area", "Image", "Email Field", "Footer"
			if (component === "Header") {
				// append "Header" component to the beginning of the list
				stateArray.unshift({
					type: component,
					id: state.uniqueIdCounter
				});
			} else {
				// push component to the end of the list
				stateArray.push({
					type: component,
					id: state.uniqueIdCounter
				});
			}
			idIteration = state.uniqueIdCounter + 1;

			// add copy object
			tempCopy = [...state.copy];
			tempCopy.push({ webCopy: "", id: action.payload[1] });

			return {
				...state,
				components: stateArray,
				uniqueIdCounter: idIteration,
				copy: tempCopy
			};

		// case actionTypes.HEADER:
		// 	// this if statement helps fix a bug, "TypeError: Cannot read property 'id' of undefined"
		// 	// by adding a Copy Object to the state
		// 	if (Number.isInteger(action.payload)) {
		// 		console.log("ACTION.PAYLOAD", action.payload);

		// 	}
		// 	stateArray = [...state.components];
		// 	component = "Header";
		// 	// Step 1 in updating the list of components with a new component
		// 	stateArray.unshift({
		// 		type: component,
		// 		id: state.uniqueIdCounter
		// 	});
		// 	stateArray = moveFooter(stateArray);

		// 	idIteration = state.uniqueIdCounter + 1;
		// 	return {
		// 		// Step 2 in updating the list of components with a new component
		// 		components: stateArray,
		// 		uniqueIdCounter: idIteration,
		// 		currentPage: state.currentPage,
		// 		copy: state.copy,
		// 		siteURL: state.siteURL
		// 	};
		// case actionTypes.HEADLINE:
		// 	stateArray = [...state.components];
		// 	component = "Headline";
		// 	stateArray.push({
		// 		type: component,
		// 		id: state.uniqueIdCounter,
		// 		currentPage: state.currentPage,
		// 		copy: state.copy,
		// 		siteURL: state.siteURL
		// 	});
		// 	stateArray = moveFooter(stateArray);
		// 	idIteration = state.uniqueIdCounter + 1;
		// 	return {
		// 		components: stateArray,
		// 		uniqueIdCounter: idIteration,
		// 		currentPage: state.currentPage,
		// 		copy: state.copy,
		// 		siteURL: state.siteURL
		// 	};
		// case actionTypes.TEXT_AREA:
		// 	stateArray = [...state.components];
		// 	component = "Text Area";
		// 	stateArray.push({ type: component, id: state.uniqueIdCounter });
		// 	stateArray = moveFooter(stateArray);
		// 	idIteration = state.uniqueIdCounter + 1;
		// 	return {
		// 		components: stateArray,
		// 		uniqueIdCounter: idIteration,
		// 		currentPage: state.currentPage,
		// 		copy: state.copy,
		// 		siteURL: state.siteURL
		// 	};
		// case actionTypes.IMAGE:
		// 	stateArray = [...state.components];
		// 	component = "Image";
		// 	stateArray.push({
		// 		type: component,
		// 		id: state.uniqueIdCounter
		// 	});
		// 	stateArray = moveFooter(stateArray);
		// 	idIteration = state.uniqueIdCounter + 1;
		// 	return {
		// 		components: stateArray,
		// 		uniqueIdCounter: idIteration,
		// 		currentPage: state.currentPage,
		// 		copy: state.copy,
		// 		siteURL: state.siteURL
		// 	};

		// case actionTypes.EMAIL_FIELD:
		// 	stateArray = [...state.components];
		// 	component = "Email Field";
		// 	stateArray.push({
		// 		type: component,
		// 		id: state.uniqueIdCounter,
		// 		currentPage: state.currentPage,
		// 		copy: state.copy,
		// 		siteURL: state.siteURL
		// 	});
		// 	stateArray = moveFooter(stateArray);
		// 	idIteration = state.uniqueIdCounter + 1;
		// 	return {
		// 		components: stateArray,
		// 		uniqueIdCounter: idIteration,
		// 		currentPage: state.currentPage,
		// 		copy: state.copy,
		// 		siteURL: state.siteURL
		// 	};
		// case actionTypes.FOOTER:
		// 	stateArray = [...state.components];
		// 	component = "Footer";
		// 	stateArray.push({
		// 		type: component,
		// 		id: state.uniqueIdCounter,
		// 		currentPage: state.currentPage,
		// 		copy: state.copy,
		// 		siteURL: state.siteURL
		// 	});
		// 	stateArray = moveFooter(stateArray);
		// 	idIteration = state.uniqueIdCounter + 1;
		// 	return {
		// 		components: stateArray,
		// 		uniqueIdCounter: idIteration,
		// 		currentPage: state.currentPage,
		// 		copy: state.copy,
		// 		siteURL: state.siteURL
		// 	};

		case actionTypes.SET_NEW:
			// uploads the newly reordered set of components to state
			let uploadNewOrder = [...action.payload];
			return {
				...state,
				components: uploadNewOrder
			};
		case actionTypes.DEL:
			// uploads the state less the deleted item
			let uploadShortened = [...action.payload];
			return {
				...state,
				components: uploadShortened
			};
		case actionTypes.PAGE_CHANGE:
			stateArray = [...state.components];
			return {
				...state,
				// action.payload is set in each page's ComponentDidMount()
				currentPage: action.payload
			};
		case actionTypes.NEW_VAR:
			// case "NEW_VAR" fires from Customize's renderStateComponents()
			stateArray = [...state.components];
			tempCopy = Object.assign([], state.copy); // avoids the TypeError bug with [...state.copy]
			// push an empty copy datapoint to state with a unique id to use in identifying which copy goes where in interface
			let newInputFieldNumber = { webCopy: "", id: action.payload };
			tempCopy.push(newInputFieldNumber);
			return {
				components: stateArray,
				uniqueIdCounter: state.uniqueIdCounter,
				currentPage: state.currentPage,
				copy: tempCopy,
				siteURL: state.siteURL
			};
		case actionTypes.ADD_COPY:
			tempCopy = [...state.copy]; // immutably copy state.copy
			let textToAdd = action.payload[0];
			let indexToFind = action.payload[1];

			for (let i = 0; i < tempCopy.length; i++) {
				if (tempCopy[i].id === indexToFind) {
					// Modify the JS object linked to the appropriate input field
					tempCopy[i] = { webCopy: textToAdd, id: indexToFind };
				}
			}
			return {
				components: stateArray,
				uniqueIdCounter: state.uniqueIdCounter,
				currentPage: state.currentPage,
				copy: tempCopy,
				siteURL: state.siteURL
			};
		case actionTypes.SET_URL:
			stateArray = [...state.components];
			// TODO: handle cases like user entered www.etc.com and https://www.test.com
			let domain = action.payload;
			const notAllowed = [
				"https://www.",
				"www.",
				".",
				"www",
				"com",
				"net",
				"org",
				".com",
				".net",
				".org"
			];
			for (let i = 0; i < notAllowed.length; i++) {
				if (domain.includes(notAllowed[i])) {
					domain = domain.replace(notAllowed[i], "");
				}
			}
			return {
				components: stateArray,
				uniqueIdCounter: state.uniqueIdCounter,
				currentPage: state.currentPage,
				copy: state.copy,
				siteURL: "/salespage/" + domain
			};

		default:
			return state;
	}
};

let moveFooter = components => {
	// Purpose: Moves the footer component to the end of the array if it is in the components list.
	// Step One: Remove all instances of the Footer component from the array.
	const withoutFooter = components.filter(x => x.type !== "Footer");
	// Step Two: If there was no Footer component in the array, return the array we started with.
	if (components.length === withoutFooter.length) {
		return components;
	}
	// Step Three: Get the footer component to add to the end of the filtered array
	const footer = components.filter(x => x.type === "Footer");
	// Step Four: Self explanatory. Add Footer component back to the end of the array.
	withoutFooter.push(footer[0]);
	return withoutFooter;
};

export default reducer;
