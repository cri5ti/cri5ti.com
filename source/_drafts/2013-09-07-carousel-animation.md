---
supertitle: Fun with webgl
title: Carousel animation
date: 2013-09-07
in: fun
---

I've been playing with [Three.js][threejs] for a bit, trying to add some depth to one of Lisa's [artwork][4worlds].

<div id="webgl">
<iframe src="/demo/carousel1/" scrolling="no" style="width: 100%; height: 400px; border: none;"></iframe>

<li>Click and drag to rotate the view.</li>
<li><a href="/demo/carousel1/" target="_blank">Click here</a> for a full view.</li>

</div>

<div id="nowebgl">
Your browser doesn't support [webgl](http://get.webgl.org/), so here is a screenshot instead:
<p>![screenshot]</p>
</div>


***

And here is the original artwork:

{% asset_img lisa-game-carousel.png %}


[threejs]: http://threejs.org
[screenshot]: /media/misc/carousel1.png
[4worlds]: http://lisaliuart.com/artworks/fourworlds/


<script>
    // detect webgl
    if (!!window.WebGLRenderingContext) {
        document.querySelector('#nowebgl').style.display = 'none';
    } else {
        document.querySelector('#nowebgl').style.display = '';
        document.querySelector('#webgl').style.display = 'none';
    }
</script>
