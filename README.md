# The Power of: React, Flux, jspm & ES7
Hitting the GitHub developer API: recreated the issues explorer. Here we have applied it to npm's repo (we could really hit any repo)

#### Flexing the muscles of this stack:
- React (0.13)
  - React-Router
- Alt (Flux)
- jspm
- ES6 (via Babel)
  - import / exports (this is easily one of ES6's biggest features. Oh I am ever so happy. Browserify bye bye?) 
  - Classes (we use React this way. Much cleaner code. Although we need to remember to bind non-React functions to 'this' inside our constructor)
  - Arrow functinons (Saves us from binding this. It will not work in particular cases though)
  - Const and let (safer and more predictable variable assignments)
- ES7 (via Babel)
  - Async and await (really a killer feature that helps with control flow regarding Promises. Works extra well with React's setState() as we can tell our component to re-render as part of this async flow) Look at Issue.js to see usage of Async
  - Decorators (Initially it looked as if I needed it in Alt for its stores if we were to Ajax calls there. Not the case after experimentation -- or at least not in my current version used)
- Sass (via JSPM sass plugin)
  - Not sure about the performance of this in prod, but works well so far. One thing I have not done yet is isolated the Sass so that it does not scope creep into other components

#### Architecture
> As per Flux, we have Actions (a la Controller) Stores (a la Model) and Components (a la View)


- Using React for our views, we are able to modularize the main components of our page

