---
layout: post
title: "“Physical Media” by Alexander Galloway"
date: 2018-03-12 21:49 -0500
series: 200-essays
tags: writing
---
I just finished what was a pretty brutal course on networking this past quarter (I’m writing this essay two days after the final). Reading this chapter from Alexander Galloway’s book, *Protocol*, was both refreshing and retraumatizing.

Galloway gives a good overview of many different parts of networking, including the history of the Internet and a quick yet surprisingly comprehensive summary of TCP/IP, but the most interesting part (what, you don’t think a description of a network protocol is interesting?) comes in the last paragraph:

> To follow a protocol means that everything possible within that protocol is already at one’s fingertips. Not to follow means no possibility. Thus, protocological analysis must focus on the possible and the impossible (the envelope of possibility), not a demystification of some inner meaning or “rational kernel” within technology. *Protocol is a circuit, not a sentence*.

Galloway argues for this by saying that protocols are necessarily against interpretation because they simply encode and decode the data which gets sent their way and do “little to transcode the meaning of the semantic units of value that pass in and out of its purview.” This idea didn’t make a lot of sense to me when I first read it. After all, I thought we had already seen discussions of this through things like Mark C. Marino’s [“Critical Code Studies”](http://www.electronicbookreview.com/thread/electropoetics/codology) or Nick Montfort’s *10 PRINT CHR$(205.5+RND(1)); : GOTO 10*: while it is true that computers do not understand the semantics of the programs they run, that doesn’t mean that those programs are without meaning.

What makes protocols different, however, is that a protocol has no text. A C++ implementation of TCP is not TCP, nor is the RFC for TCP. A protocol is like an algorithm: there are many ways of implementing it, which means that there is no single “canonical” implementation. Thus, while we can read and derive meaning from artifacts around TCP (like the aforementioned C++ implementation or its RFC), analysis of the actual protocol itself must be restricted to what it can do (i.e. what Galloway refers to as its “possibility”).