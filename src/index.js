import { createSlice } from '@reduxjs/toolkit';
import produce from "immer"
import set from 'lodash/set';
import get from 'lodash/get';

export const firstLetterUpperCase = string => string.charAt(0).toUpperCase() + string.slice(1);
export const createActionName = key => `update${firstLetterUpperCase(key)}`;
export const createSelectorName = key => `select${firstLetterUpperCase(key)}`;

export const createBoilerPlate = model => {
	const { name, basePath, config } = model;
	const reducers = {};
	const rootInitialState = {};
	const selectors = {};
	Object.keys(config).forEach(key => {
		const { path, initialState } = config[key];
		const fullPath = `${basePath}.${path}`;

		let { reducer, selectorName, actionName } = config[key];

		actionName = actionName || createActionName(key);
		selectorName = selectorName || createSelectorName(key);

		reducer = reducer || produce((state, action) => {
			set(state, fullPath, action.payload)
		});

		reducers[actionName] = reducer;
		selectors[selectorName] = state => get(state, fullPath);
		set(rootInitialState, fullPath, initialState);
	});

	return {
		...createSlice({
			name,
			initialState: rootInitialState,
			reducers,
		}), selectors
	};
}