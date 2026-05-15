WordPress Handoff - Quick Checklist

For the dev converting our static HTML to a custom WordPress theme. Tick or answer below and send back.


FROM YOUR FEEDBACK

- Make code WordPress-friendly. We'll do this: (1) move inline scripts to js/main.js, (2) remove inline style="" attributes, (3) wrap content in <main id="primary" class="site-main">. Confirm this is enough or flag what else you want.

- "Use global class" - which did you mean?
   ( ) A global wrapper class on <body> (e.g. class="aga-site") for scoping
   ( ) Global utility helpers (text-center, mt-4, etc.)
   ( ) Something else: _______


A FEW THINGS FROM OUR SIDE

- Class naming - currently BEM (block__element--modifier). OK to keep, or do you want WordPress conventions (site-header, entry-title)?

- ZIP-code finder on the homepage is a placeholder JS alert. How should it actually work - static academy list, geocoding API, or a plugin?

- Image compression - branded photos are full-res (~1-2 MB each, 32 MB total). Should we compress before handoff, or will you handle via a plugin (Smush / ShortPixel)?


ANYTHING ELSE? ADD BELOW:

-
-
