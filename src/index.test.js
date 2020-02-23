import { createBoilerPlate } from './index';

describe("test",() => {
	it("create boilerplate", () => {
		const models = createBoilerPlate({
			name:'test',
			initialState: {},
			basePath: 'test',
			config: {
				testName: {
					path: 'name',
					initialState: 'test1'
				},
				testNumber:{
					path:'number',
					initialState: 'test number 1'
				}
			}
		});
	})
})

