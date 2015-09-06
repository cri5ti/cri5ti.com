title: Collapse all layers in Illustrator
supertitle: Adobe Illustrator
in: AI Tools
image: preview.png
categories: design
tags: Adobe Illustrator
---

* * * 
##### Update: 
*Starting with _[Adobe Illustrator CC 17.1](https://helpx.adobe.com/illustrator/using/whats-new-17-1.html)_, layers remember open/closed state, making this post obsolete. *
* * * 

{% asset_img preview.png %}

How much time have you wasted by collapsing the layers every time you open that *50-layer-Illustrator-file*?

Sadly, Illustrator CS5 *(Update: CS6 or CC either)* can't remember the states of the layers between saves, so every time you open a file, all the layers are expanded, so you have to waste a few good clicks to close them before you are ready for action.

If you don't care at all about this, just stop reading and get back to work!

I was really annoyed by this for a very long time, and I decided to do something about it.

I don't know if you've heard about this, but if you hold the `ALT` key while you click to expand or collapse a layer, it will do this for all the sub-layers inside. That's great, so that means that all you have to do is put everything in one layer, and then just `ALT`+click that when you open your file, and you're done.

Sadly, there is a catch, this will not work if the sub-layers are hidden or locked. If you don't usually hide or lock layers, then you're already set: **just use `ALT`+click and you're done**.

* * *

For the rest of us, I present you my extension, `AI Tools v1.0.0`, with only one tool - Collapse All.

After installing the extension using the *Extension Manager*, you will find the *Collapse All* panel in the Window > Extensions menu.
The panel will help you make all the layers visible and unlock them, so you can ALT+click all the top layers to collapse everything.

{% asset_img img1b.png %}

Here are some layers in a file I just opened:

{% asset_img img1.png %}

First click on the *(1) Make all visible* button, then (2) `ALT`+click on the top layers to collapse:

{% asset_img img2.png %}

Last step, press *(3) Restore* button to get back to the initial visibility and lock state.

{% asset_img img3.png %}


*Elapsed time: 5 seconds.*


Please note that I actually expanded the top layers again in my previous picture, but without holding ALT this time, so I can show you that all the sub-layers are all nice and hmm... colapsed.


### And here is the extension: [AiTools-1.0.0.zxp](http://code.google.com/p/ai-tools/downloads/detail?name=AiTools-1.0.0.zxp)

Currently I have only tested it with Adobe Illustrator CS5 and CS6, but

When I'll get some more free time, I'll create a nice panel for my other script: [ai-layers-export](/2011/10/Export-layers-in-Illustrator/).

Thanks for reading, and let me know if you have any problems (on any topic related to Illustrator missing features).
