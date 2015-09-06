title: Growing trees
category: A game
tags: ["trees", "space colonization"]
---

We're going to need some trees for our terrain, so I've been experimenting with the *space colonization algorithm*.

> Whitepaper: [Modeling Trees with a Space Colonization Algorithm](http://algorithmicbotany.org/papers/colonization.egwnp2007.large.pdf) - *Adam Runions, Brendan Lane, and Przemyslaw Prusinkiewicz*.


{% asset_img 1.png %}
{% asset_img 2.png %}
{% asset_img 3.png %}


I've done several changes on the algorithm, adding several parameters: 
- control how the points attract branches (per branch level)
- control the max length of branches
- sprouting (simulate bud growing)


Here is a snippet of the parameters:

{% codeblock lang:js %}
	var attractRange = 50;	// the distance of attraction
	var attractWeight = [0.02, 0.1, 0.2]; // the weight of attraction, per branching level. (Here, the trunk is barely affected)
	var collectRange = 5; // the range at which points are removed
	var gravityWeight = 0.01; // the weight gravity affects growth direction

	var growSpeed = 5; // the growth distance per iteration

	var maxLength = 500; // max length of tree
	var maxLengthVar = 0.2;
	var secondaryMaxLengthVariance = [0.5,0.5,0.5]; // the variance of max length of branches, per level  (0 = no change, 0.5 = +/- 50% random variation)
	var secondaryMaxLengthWeight = [1,0.8,0.8]; // fixed multiplier of max length per branch

	var sproutInterval = [30,10,10]; // the interval at which buds are created
	var sproutIntervalVar = 0.2; // variation
	var sproutGerminationTime = 10; // time it takes for a bud to germinate. This prevents buds from collecting attraction points immediately, leaving the parent branch the chance to collect first.
	var sproutGerminationTimeVar = 5; 

	var branchingAngle = [50, 50, 50]; // the initial branch angles the buds sprout (per level)
	var branchingAngleVar = [0.5, 0.5, 0.5];

	var secondaryGrowthRate = 0.1; // the branch girth growth rate

{% endcodeblock %}


And here it is running, parameterized for a fir tree:

<video src="{% asset_path grow.mp4 %}" autoplay loop controls/>