title: Terrain engine
category: A game
tags: ["marching cubes", "triplanar mapping", "OpenGL"]
---

So, I've been having fun with some OpenGL, I'm working on a terrain engine, we'll see where it goes...

{% asset_img terrain-1.png %}

{% asset_img terrain-2.png %}

* * * 

So far, I've got:

- voxel terrain renderer, tesselated with [marching cubes](https://en.wikipedia.org/wiki/Marching_cubes). 

- the signed density function is generated from a few octaves of simplex noise.

- multithreaded chunk generation and tesselation with no world bounds.

- triplanar mapping with a fixed directional light.


## Performance: 

Currently, the chunks are of fixed size, and I can generate and render about 7^3 chunks around the player, while you're moving around.

## Immediate future plans:

 - rewrite the `ChunkManager` to use the Octree to determine views in frustum, and apply LOD based on view distance. Currently I'm using a `std::unordered_map` hashed by chunk coordinates, which is not very fast. (I'm just for-looping around the player to get/generate visible chunks).

 - use LOD chunks to increase the view distance.

 - switch to [Dual Contouring](http://www.cs.rice.edu/~jwarren/papers/techreport02408.pdf).