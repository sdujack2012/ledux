# Introduce Lelux

Redux is probably the most popular and tested libary for application state management. We can spend a whole day talking about the benefits of using redux in an application with complicated data structure. However, it has also been criticized for introducing a lot of boilerplate. Some efforts have been made to tackle this issue. For example, @reduxjs/toolkit has a bunch of utility tools that aim to simplify action and reducer creation and thus reduce boilerplace. The idea is very good but selectors still have to be created mannually. 

To resolve this issue I have create a function called "createBoilerPlate" based on "createSlice" from @reduxjs/toolkit. createBoilerPlate supports all functionalities that createSlice has. It also creates selectors in addition to reducers and actions. The way Ledux works is that it uses the path of data in the state to create a function for both read and write. With the traditional way of writing reducers and selectors, they have to be created separately because they are two completely different functions. However, if we use the path of the data in the state we can create both reducers and selectors programatically.

To demostate how easy is it to use createBoilerPlate, I have created the following example

```
import { createBoilerPlate } from 'ledux'

const contact = createSlice({
  name: 'contact',
  initialState: {},
  config: {
    name: {
      path:'name',
    },
    mobileNumber:{
      path:'mobileNumber',
    },
  },
})

```


This will create something createSlicecreate would create but also the selectors:

```
{
    name : string,
    reducer : ReducerFunction,
    actions : Object<string, ActionCreator>,
    selectors: Object<string, Selector>,
}
```

In "actions" attribute there are two action creators according to the config, updateName and updateMobileNumber
while "selectors" has two selectors according, selectName and selectMobileNumber

The default selector name and reducer name are generated based on the key under which the config object is:

For example,

The key for the following object is name, so createBoilerPlate will create selectName selector and updateName reducer

```
 name:{
  path:'name',
 }
```

# If you want to provide custom selector name, reducer name and reducer function you can just provide selectorName, reducerName and preProcess

Note that instead of using a reducer directly we use preProcess to massage the value before we write it to the path in the state. This way we prevent writing to a different path.

```
import { createBoilerPlate } from 'ledux'

const contact = createSlice({
  name: 'contact',
  initialState: {},
  config: {
    name:{
      path:'name',
      selectorName: 'selectFancyName',
      reducerName: 'updateFanyName',
      preProcess: (state, action) => {
        return "fancy" + action.payload;
      }
    },
    mobileNumber:{
      path:'mobileNumber',
    },
  },
})

```

# createBoilerPlate is suitable for applications where simple setters and getters(read and write value from/to a path in the state) are needed. If you have already have a state design then you can use "flat" to extact the path and automate the generation of the "config" for createBoilerPlate 