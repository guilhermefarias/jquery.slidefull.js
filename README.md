#jQuery Slidefull Plugin

jQuery plugin to create a simple and responsive image slideshow.

## Getting Started

Include jQuery:

```html
<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
```

Include plugin's code:

```html
<link rel="stylesheet" type="text/css" href="src/jquery.slidefull.min.css">
<script src="src/jquery.slidefull.min.js"></script>
```

Add markup:

```html
<div class="slidefull-wrapper">
	<div class="slidefull-item" style="background-image: url(1.jpg);"></div>
	<div class="slidefull-item" style="background-image: url(2.jpg);"></div>
	<div class="slidefull-item" style="background-image: url(3.jpg);"></div>
	<div class="slidefull-item" style="background-image: url(4.jpg);"></div>
</div>
```

Call the plugin:

```javascript
$(".slidefull-wrapper").Slidefull();
```


## Options

Option              | Type      | Default  | Description
---                 | ---       | ---      | ---
`duration`          | *int*     | 3000     | How long each slide will show in milliseconds.
`speed`             | *int*     | 500      | Slide transition interval in milliseconds.
`displayControls`   | *boolean* | true     | Show or hide prev and next arrow controls.
`displayPagination` | *boolean* | true     | Show or hide slide pagination.

## About

#### Who?
Created by [Guilherme Farias](http://guilhermefarias.com/).

#### License?
jQuery Slidefull Plugin is released under the terms of the [MIT license](https://github.com/guilhermefarias/jquery.slidefull.js/blob/master/MIT-LICENSE).