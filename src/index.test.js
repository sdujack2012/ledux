import { createBoilerPlate } from './index';

describe("test",() => {
	const model = {
		name:'test',
		initialState: {},
		basePath: 'test',
		config: {
			name: {
				path: 'name',
				initialState: 'test1',
			},
			number:{
				path:'number',
				initialState: 'test number 1'
			}
		}
	};

	const state = {
		test: {
			name: 'test',
			number: '123',
		}
	}
	
	it("create boilerplate", () => {
		const models = createBoilerPlate(model);
		expect(models.selectors).toBeDefined();
		expect(models.reducer).toBeDefined();
		expect(models.actions).toBeDefined();
	});

	it("should create selectors according to the config", () => {
		const models = createBoilerPlate(model);
		expect(models.selectors.selectName(state)).toEqual(state.test.name);
		expect(models.selectors.selectNumber(state)).toEqual(state.test.number);
	});
})

