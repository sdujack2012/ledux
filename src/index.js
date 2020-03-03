import { createSlice } from '@reduxjs/toolkit';
import produce from "immer"
import set from 'lodash/set';
import get from 'lodash/get';

const firstLetterUpperCase = string => string.charAt(0).toUpperCase() + string.slice(1);
const createReducerName = key => `update${firstLetterUpperCase(key)}`;
const createSelectorName = key => `select${firstLetterUpperCase(key)}`;

const getByPath = (obj, path) => path ? get(obj, path) : obj;
const setByPath = (obj, path, value) => path ? set(obj, path, value) : obj;

export const createBoilerPlate = models => {
	const { name, basePath, config = {} } = models;
	const reducers = {};
	let rootInitialState = {};
	const selectors = {};
	Object.keys(config).forEach(key => {
		const { path, initialState } = config[key];
		const fullPath = basePath ? `${basePath}.${path}` : path;

		let { preProcess = (state, action) => action.payload, selectorName, reducerName } = config[key];

		reducerName = reducerName || createReducerName(key);
		selectorName = selectorName || createSelectorName(key);

		reducers[reducerName] = produce((state, action) => setByPath(state, fullPath, preProcess(state, action)));;
		selectors[selectorName] = state => getByPath(state, fullPath);
		rootInitialState = setByPath(rootInitialState, fullPath, initialState);
	});

	return {
		...createSlice({
			name,
			initialState: rootInitialState,
			reducers: {
				...models.reducers,
				...reducers,
			},
		}), selectors
	};
}