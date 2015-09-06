title: Export layers in Illustrator
supertitle: Adobe Illustrator
in: AI Tools
image: /media/aiexport/overlay.png
categories: design
tags: Adobe Illustrator
---


# What is it

This script is based on Jon Hicks original [SaveLayersAsPNG][SaveLayersAsPNG] script which exports the top layers one by one.

When you're working on some big UI designs, you usually have lots of layers and sublayers, things that have to always stay visible, or some more complex scenarios. This script will export layers recursively based on some flags at the end of the layer name.

# Layer flags

You can add a special flag at the end of a layer to control it's rendering:

* **`(+)` - always visible** - good for backgrounds, headers and footers, ...

* **`(-)` - ignore layer**

* **`(~)` - popup layer** - useful for overlays and popups, the script will export once with the layer hidden, and once visible.

* *no flag* -

# Example

{% asset_img overlay.png %}
{% asset_img layers.png %}

## Exported files:

	acme-home-hovering-(~).png
	acme-home-popup-(~).png
	acme-home.png
	acme-product-big-(~).png
	acme-product.png

{% asset_img acme-home-hovering-~.png %}
{% asset_img acme-home-popup-~.png %}
{% asset_img acme-home.png %}
{% asset_img acme-product-big-~.png %}
{% asset_img acme-product.png %}

[SaveLayersAsPNG]: http://www.hicksdesign.co.uk/journal/illustrator-exporting-layers-to-png

## Get it

Download the extension from [github](https://github.com/cri5ti/ai-layers-export).