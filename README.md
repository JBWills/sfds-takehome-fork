This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Running this website

Clone the repo, then run this from the repo directory.
```
npm install
npm start
```

This will install all of the required dependencies and open the app in a new browser tab at http://localhost:3000/.

## Running the JS tests

run `npm test` from the repo directory.

## Screenshots

### Screenshot: the main page

![Screen Shot 2020-02-02 at 1 59 55 PM](https://user-images.githubusercontent.com/3174893/73616137-7231e300-45c4-11ea-9ff6-c3d5cbad31c4.png)

### Screenshot: filtered by string and numeric values
![Screen Shot 2020-02-02 at 2 02 18 PM](https://user-images.githubusercontent.com/3174893/73616435-3436be00-45c8-11ea-8dd1-232203bbc6dd.png)

## TODOs
These are the things I would add to this project if I had more time to work on it:

### More opinionated linting rules
I included the bare minimum for this project but if this was a project that would be shared across teams I would want more opinionated (and automated) linting rules to make code-style something engineers don't have to think about while writing or reviewing code.

### Better memoization with filters
Currently the sorting and filtering operations are memoized with the [reselect library](https://redux.js.org/recipes/computing-derived-data/). This library adds simple memoization with a cache size of 1 (it only avoids recomputing if the data is the same as last time the function was called).

This works well when other, non-filter state changes, but if there are 5 filters applied and only one changes, we have to recompute all 5 filters. If we split each filter into its own selector we would be able to only re-apply a subset of the filters.

### Storing pre-computed columns
Some columns in the table are computed (ex: the PROJECT_ADDRESS column). These values are re-computed each time we render the table. Currently none of these are expensive computations, but any computed column that is computed with only row data could easily be computed once on INIT_HOUSING_DATA and re-used from then on.

### Filter behaviors
- The numeric filters should have a two-sided slider that adjusts min and max values together. Even better would be a histogram above the slider that shows the number of rows that apply at each step.
- The text on the numeric filters updates with application state, which is debounced at 100ms. Unfortunately this creates a bit of a lag between the number shown and the current value of the slider. This could be qiuickly fixed with local state on the NumericFilter component.
- String filters should be adjustable for "contains/startsWith/fuzzy matching". Currently it only allows for searching by contains.
- String filters shouldn't match on case (or there should be an option to toggle case matching).
- Additional filter types should be added (ex: 1br units available boolean filter)

### Data selection improvements
I'm not really sure what people are most interested in when they look at this data, I think if I learned more I would definitely change the columns that are shown to the user. This is partly why I made the app so modular, since it should be easy to update based on user feedback.

### Product description improvements
I definitely didn't do a strong job explaining what the data in the table relates to, or what each of the columns means.

### Additional testing
There is lots of code coverage missing in the following places:
- selectors
- store
- action creators
- reducer
- connected components (App.jsx)
- component functionality (such as clicking on forms)

### Convert to TypeScript
I haven't worked with TypeScript much before, so for the sake of time, I decided not to use it in this repo. Any repo I built for the long-term would definitely be in TypeScript though since it makes the code easier to read. Especially in this repo with lots of objects (rows and columns) being passed around.

At the very least I could add proptype validation for all components.
