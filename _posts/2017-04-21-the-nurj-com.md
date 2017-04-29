---
layout: post
title:  "thenurj.com"
description: "An online home for the Northwestern Undergraduate Research Journal."
color: bg-blue
date: 2017-04-22 19:15:04 -0600
categories: projects design tech
link: http://www.thenurj.com
---
Recently, I've been working on creating the website for the Northwestern Undergraduate Research Journal (NURJ). The project spanned a few months and has taught me a lot, especially about making technical decisions with non-technical people in mind. The website is live at [thenurj.com](http://www.thenurj.com) and you can find the code behind it on [Github](https://github.com/nurj/nurj).

## the problem
The previous iteration of our website was built on Squarespace a few years before I joined the staff. This made it really easy for them to get a site off the ground, but it made it extremely difficult to add new content and especially difficult to train new members to use the system, since many different pages had to be updated whenever new content was uploaded.
![](/assets/images/thenurj.com/nurj-squarespace.jpg)

On another point, we had recently updated the look of our print journal and the website no longer reflected the look we had established.

## our approach

So this year I enlisted the help of our Art Director [Florence Fu](http://www.florencefu.com), and we set out to build a new website from the ground up. We saw this as an opportunity to finally align the digital presence of the NURJ with the print journal.

As we started thinking about what we wanted from this project, we realized that our publication is not a typical publication. There are a few things that set it apart from a typical magazine:

1. We primarily publish theses written by undergraduate students. These pieces can run anywhere from 5,000-10,000 words.
2. These pieces also don't come out very often. We publish around five times a year, with the biggest release (the theses which also go in our print journal) coming out at the end of the academic year.
3. Theses in general are pretty complex as far as media types go. They have a lot of metadata associated with them (you can check out the full schema for a thesis [here](https://github.com/nurj/nurj/blob/master/EDITING.md#thesis)) and require certain things, like citations which go along with specific sentences.

This changed our priorities a little as far as displaying content and navigation on the site was concerned. For example, while it might be more important for a newsmagazine to display the most recent articles or most popular, we didn't feel like that applied to us, since usually the most "important" pieces we published were those that went in the print issue, which were the best senior theses of the past academic year. We wanted that to be the focus when landing on the website, and for other information to appear after that.

Another top priority for us was readability, since our theses spanned such great lengths. It was important to provide a comfortable reading experience. For that reason, we wanted to display citations to theses alongside the text if the author had chosen to use inline rather than parenthetical citations.

We also had a few things to consider from the operations side. Since we couldn't count on always having a technically-minded person on our staff, we wanted to make sure that the barrier to entry for maintaining the site was as low as possible. This meant we needed a few things:

1. A smooth editor so that even those without a technical background can upload and manage content on the site.
2. A hands-off website management experience that allowed us to make as many things configurable through the CMS as possible.
3. Make the code for the website as easy to understand as possible (with good documentation) so that, if someone does have to make a change, it's as easy to do as possible.

## the result

There were a lot of options we explored for our CMS, from something as stripped back as using a Github Pages-hosted Jekyll blog to using WordPress as the CMS/editor and serving content by fetching it from the [WordPress API](https://developer.wordpress.org/rest-api/). Eventually, we settled on [Prismic](https://prismic.io). Prismic provides an incredibly expressive format for defining custom content types, which made working with our content super easy. It's also headless, so it allows us to use whatever back- and front-end that would be most convenient for us.

*Aside: one thing I would've liked to explore but didn't find out about until recently is using [Google Drive as a CMS](https://www.drivecms.xyz), with documents written in a human-friendly markup format like [ArchieML](http://archieml.org).*

The actual website is powered by a pretty simple Node/Express app which uses the Prismic API to fetch content, then fills out Pug templates. We really liked the simplicity of a project with this structure--it's very easy for someone with even a rudimentary knowledge of HTML/CSS to get on board and make changes.

![](/assets/images/thenurj.com/nurj.jpg)

The styles for the website are written in SASS and follow the [Medium style guide](https://gist.github.com/cuibonobo/16f555c0047ab80044cf). We try to keep files as short as possible by moving as many things into components as possible.

This has been a really fulfilling project to be a part of from start to finish, and I've learned a lot in trying to make good decisions for the long-term maintainability of the codebase and for the end users in general.
