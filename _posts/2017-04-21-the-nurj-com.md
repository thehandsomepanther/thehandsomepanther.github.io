---
layout: post
title:  "thenurj.com"
description: "An online home for the Northwestern Undergraduate Research Journal."
color: bg-blue
date: 2017-04-22 19:15:04 -0600
categories: projects design tech
link: http://www.thenurj.com
image: "assets/images/thenurj.com/nurj.jpg"
---
Recently, I've been working on creating the website for the Northwestern Undergraduate Research Journal (NURJ). The project spanned a few months and has taught me a lot, especially about making technical decisions with non-technical people in mind. The website is live at [thenurj.com](http://www.thenurj.com) and you can find the code behind it on [Github](https://github.com/nurj/nurj).

## the problem
The previous iteration of our website was built on Squarespace a few years before I joined the staff. This made it really easy for them to get a site off the ground, but it made it extremely difficult to add new content and train new members to use the system, since many different pages had to be updated whenever new content was uploaded.

![](/assets/images/thenurj.com/nurj-squarespace.jpg)

On another point, we had recently updated the look of our print journal and the website no longer reflected our identity. We took this as an opportunity for a *tabula rasa* and build a new site from the ground up tailored exactly to our needs.

## our approach

I enlisted the help of our Art Director [Florence Fu](http://www.florencefu.com), and we started thinking about the purpose behind the NURJ's web presence.

To provide some background, the NURJ is a student publication which features undergraduate research at Northwestern University. Our flagship, the print journal, comes out once a year, at the end of Spring quarter, and comprises the senior theses from the previous academic year which were selected to be the best in their departments, as well as a few features on faculty at Northwestern who do interesting research. The website carries not only the content which goes in our print journal but also theses which undergraduates submit to us throughout the year and other features we write on university faculty.

One of our most important realizations was that our journal is not a typical student publication. There are a few things that set it apart from other student pubs, like magazines or daily newspapers:

1. We primarily publish theses written by undergraduate students. These pieces can be intellectually dense and run anywhere from 5,000-10,000 words.
2. We also don't come out with new content as often as other publications. We publish around five times a year, with the biggest release (the theses which also go in our print journal) coming out at the end of the academic year.
3. Theses in general are pretty complex. They have a lot of metadata associated with them (you can check out the full schema for a thesis [here](https://github.com/nurj/nurj/blob/master/EDITING.md#thesis)) and have certain requirements, like citations which go along with specific sentences.

This made our priorities a little different from a typical publication as far as displaying content and navigation on the site was concerned. For example, while it might be more important for a newsmagazine to display the most recent or most popular articles, we didn't feel like that applied to us, since the most "important" pieces we published were usually those that went in the print issue. We wanted that to be the focus when landing on the website, and for other content to appear after that.

Another top priority for us was readability. Since our theses were so long-form, it was important to provide a comfortable reading experience. For that reason, we wanted to display citations to theses alongside the text if the author had chosen to use inline rather than parenthetical citations. This also meant that we would need to pay extra attention to typography.

We also had a few things to consider from the operations side. Since we couldn't count on always having a technically-minded person on our staff, we wanted to make sure that the barrier to entry for maintaining the site was as low as possible. This meant we needed a few things:

1. A smooth editor so that even those without a technical background can upload and manage content on the site.
2. A hands-off website management experience that allowed us to make as many things configurable through the CMS as possible.
3. At the same time, the website should be as customizable as possible, yet the codebase should still be easy to understand and move around in. This meant *good documentation.*

Of course, we also wanted our website to be performant. If users were going to put in the time to read through a condensed thesis equivalent in length to 10 pages of material, we didn't want them to have to wait for images or fonts to load (this is an issue especially because some theses use a lot of figures).

## the result

There were a lot of options we explored for our CMS, from something as stripped back as using a Github Pages-hosted Jekyll blog to using WordPress as the CMS/editor and serving content by fetching it from the [WordPress API](https://developer.wordpress.org/rest-api/). Eventually, we settled on [Prismic](https://prismic.io). Prismic provides an incredibly expressive format for defining custom content types, which made working with our content super easy. It's also headless, so it allows us to use whatever back- and front-end that would be most convenient for us.

*Aside: one thing I would've liked to explore but didn't find out about until recently is using [Google Drive as a CMS](https://www.drivecms.xyz), with documents written in a human-friendly markup format like [ArchieML](http://archieml.org).*

The actual website is powered by a pretty simple Node/Express app which uses the Prismic API to fetch content, then fills out Pug templates. We really liked the simplicity of a project with this structure--it's very easy for someone with even a rudimentary knowledge of HTML/CSS to get on board and make changes.

![](/assets/images/thenurj.com/nurj.jpg)

The styles for the website are written in Sass. Both the Sass and the front-end Javascript follow the [Medium style guide](https://gist.github.com/cuibonobo/16f555c0047ab80044cf). We try to keep files as short as possible by moving lots of things into components.

Our copy is set with maximum legibility in mind. Titles and ancillary information use the typefaces we use in our print journal, loaded in as web fonts. To alleviate this burden on page load, we set our body copy in system fonts. The type is big and has a generous amount of leading, and is set on top of our background which is a little less harsh than pure white.

There are still a few things that we're still trying to figure out how to integrate into our workflow while maintaining ease of use (for example, compressing images before uploading them to the site). Even though we're live, the website is definitely still a living, breathing project and we're constantly making updates and pushing changes. If you just wanna check out the code, you can view it on [Github](https://github.com/nurj/nurj), and if you're interested in helping out feel free to shoot us an [message](http://www.thenurj.com/join).
