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


Configuration
=============
The `<ui-flag/>` HTML element takes a single property: `style` which is a nested object of the properties in the below table.

| Property Path       | Type   | Description                                              |
|---------------------|--------|----------------------------------------------------------|
| `frame`             | Object | The main SVG element properties                          |
| `frame.height`      | Number | The height of the SVG element                            |
| `frame.width`       | Number | The width of the SVG element                             |
| `background`        | Object | Background layer properties                              |
| `background.svg`    | String | URL path to the SVG element to use for the background    |
| `background.color1` | String | CSS color code (alpha is ok) to use for the first color  |
| `background.color2` | String | CSS color code (alpha is ok) to use for the second color |
| `background.color3` | String | CSS color code (alpha is ok) to use for the third color  |
| `foreground.svg`    | String | URL path to the SVG element to use for the foreground    |
| `foreground.color1` | String | CSS color code (alpha is ok) to use for the first color  |
| `foreground.color2` | String | CSS color code (alpha is ok) to use for the second color |
| `foreground.color3` | String | CSS color code (alpha is ok) to use for the third color  |
| `feature.svg`       | String | URL path to the SVG element to use for the feature       |
| `feature.color1`    | String | CSS color code (alpha is ok) to use for the first color  |
| `feature.color2`    | String | CSS color code (alpha is ok) to use for the second color |
| `feature.color3`    | String | CSS color code (alpha is ok) to use for the third color  |



Flag concepts
=============
This module splits a flag into three different layers, each of which can contain up to 3 colors:

1. **Background** - The primary flag background. This should also contain an element with the `feature` ID to dictate where the feature will be placed
2. **Foreground** - An overlay over the background layer
3. **Feature** - A sprite style image placed in the absolute foreground. The location of this is determined by the background layer


Making new flag components
--------------------------
If you have an idea for any of the above three aspects of a flag please submit a pull request.

**NOTES**:

* All component should have a corresponding entry in the `/svg/{bg,fg,ft}/index.json` file indicating its title and how many colors its supports
* Any component can have 0 - 3 colors. These **must** be set to `#FF0000`, `#00FF00` and `#0000FF` for the first to third color respectively
* Every background component (anything in `/svg/bg`) needs to have at least one `<rect/>` or `<path/>` element which has the ID `feature`
* Transparency is ok for the foreground and feature components
