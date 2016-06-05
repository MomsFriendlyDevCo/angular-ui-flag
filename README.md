angular-ui-flag
===============
Angular directive to draw SVG flags.


Installation
=============

* Install via `npm`

```
npm install angular-ui-flag
```

* Include the `<script/>` tag somewhere in your header:

```html
<script src="/node_modules/angular-ui-flag/angular-ui-flag.js"></script>
```

* Add the module to your Angular app module list:

```javascript
var app = angular.module('app', [
	'angular-ui-flag',
]);
```

* Add the `<ui-flag/>` directive somewhere in your views:

```html
<ui-flag style="flagStyle"></ui-flag>
```


See the [demo](demo/) directory for a working demo.


Flag concepts
=============
This module splits a flag into three different layers, each of which can contain up to 3 colors:

1. **Background** - The primary flag background. This should also contain an element with the `feature` ID to dictate where the feature will be placed
2. **Foreground** - An overlay over the background layer
3. **Feature** - A sprite style image placed in the absolute foreground. The location of this is determined by the background layer


Making new flag components
--------------------------
If you have an idea for any of the above three aspects of a flag please submit a pull request.
