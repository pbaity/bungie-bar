# Bungie Bar

This is a practice project in making a pure JavaScript solution for a responsive, scrolling menu bar. It was inspired by the scrolling menu for the [iPhone page on Apple's website](https://www.apple.com/iphone/), which is only visible in a mobile viewport.

## Getting Started

To use Bungie Bar, simply include the bungie.js and bungie.css files in your project. On the nav bar you want to use, wrap the three portions of the nav bar in `<div>`s: the leftmost with the id `left`, the rightmost with the id `right`, and the center with the id `bungie`. This is the portion of the navbar that will hide in smaller viewports and offer scrolling buttons instead.

Next, configure the CSS as you'd like. Currently, the styles are set up for the dark theme included in demo.html, so coloring will be the main thing to change. The arrow symbols are the HTML characters `&lsaquo;` and `&rsaquo;`, but these can be substituted for any other symbol you want in the `content` of the button's styling. (Arrow alternatives I recommend are the `&rangle;` and `&langle;`.)

## License

Take, modify, improve, and use the code you find here. Bungie Bar is licensed under the MIT License, and is free for commercial or personal use.
