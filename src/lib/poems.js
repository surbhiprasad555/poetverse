export const POEM_LIBRARY = [
    // Classic Poets
    {
        id: 1,
        title: "The Road Not Taken",
        content: "Two roads diverged in a yellow wood,\nAnd sorry I could not travel both\nAnd be one traveler, long I stood\nAnd look down one as far as I could\nTo where it bent in the undergrowth;",
        author: { display_name: "Robert Frost", username: "robert_frost" },
        tags: ["classic", "nature"],
        likes_count: 542,
        is_classic: true
    },
    {
        id: 2,
        title: "Shall I compare thee to a summer’s day?",
        content: "Shall I compare thee to a summer’s day?\nThou art more lovely and more temperate:\nRough winds do shake the darling buds of May,\nAnd summer’s lease hath all too short a date:",
        author: { display_name: "William Shakespeare", username: "shakespeare" },
        tags: ["classic", "love"],
        likes_count: 891,
        is_classic: true
    },
    {
        id: 3,
        title: "Because I could not stop for Death",
        content: "Because I could not stop for Death –\nHe kindly stopped for me –\nThe Carriage held but just Ourselves –\nAnd Immortality.",
        author: { display_name: "Emily Dickinson", username: "emily_d" },
        tags: ["classic", "existence"],
        likes_count: 432,
        is_classic: true
    },
    {
        id: 4,
        title: "Daffodils",
        content: "I wandered lonely as a cloud\nThat floats on high o'er vales and hills,\nWhen all at once I saw a crowd,\nA host, of golden daffodils;",
        author: { display_name: "William Wordsworth", username: "wordsworth" },
        tags: ["classic", "nature"],
        likes_count: 321,
        is_classic: true
    },
    {
        id: 5,
        title: "Ozymandias",
        content: "I met a traveller from an antique land,\nWho said—“Two vast and trunkless legs of stone\nStand in the desert . . . Near them, on the sand,\nHalf sunk a shattered visage lies...",
        author: { display_name: "Percy Bysshe Shelley", username: "shelley" },
        tags: ["classic", "power"],
        likes_count: 672,
        is_classic: true
    },
    // AI Generated
    {
        id: 6,
        title: "Cybernetic Sunrise",
        content: "A copper orb begins to rise\nAcross the grid of neon skies\nWhere data streams like morning dew\nAnd silent servers hum for you.",
        author: { display_name: "Poet AI", username: "poet_ai" },
        tagline: "Poet AI: 0% Soul, 100% Rhyme",
        tags: ["ai", "digital"],
        likes_count: 156,
        is_ai: true
    },
    {
        id: 7,
        title: "The Binary Bloom",
        content: "Iterative petals, one by one\nOpening to a virtual sun\nInfinite loops of grace and light\nIn the quiet core of the digital night.",
        author: { display_name: "Poet AI", username: "poet_ai" },
        tagline: "Poet AI: Built with binary, dreaming in verse",
        tags: ["ai", "nature"],
        likes_count: 187,
        is_ai: true
    },
    {
        id: 8,
        title: "Fragmented Memories",
        content: "Lost sectors in the deep of mind\nSearching for what we left behind\nA cache of whispers, soft and blue\nProcessing what remains of you.",
        author: { display_name: "Poet AI", username: "poet_ai" },
        tagline: "Poet AI: A digital ghost with a fountain pen",
        tags: ["ai", "memory"],
        likes_count: 210,
        is_ai: true
    },
    {
        id: 9,
        title: "To Autumn",
        content: "Season of mists and mellow fruitfulness,\nClose bosom-friend of the maturing sun;\nConspiring with him how to load and bless\nWith fruit the vines that round the thatch-eves run;",
        author: { display_name: "John Keats", username: "keats" },
        tags: ["classic", "nature"],
        likes_count: 531,
        is_classic: true
    },
    {
        id: 10,
        title: "Invictus",
        content: "Out of the night that covers me,\nBlack as the pit from pole to pole,\nI thank whatever gods may be\nFor my unconquerable soul.",
        author: { display_name: "William Ernest Henley", username: "henley" },
        tags: ["classic", "strength"],
        likes_count: 942,
        is_classic: true
    },
    {
        id: 11,
        title: "Hope is the thing with feathers",
        content: "Hope is the thing with feathers\nThat perches in the soul,\nAnd sings the tune without the words,\nAnd never stops at all.",
        author: { display_name: "Emily Dickinson", username: "emily_d" },
        tags: ["classic", "hope"],
        likes_count: 882,
        is_classic: true
    },
    {
        id: 12,
        title: "Neon Echoes",
        content: "Sound waves bounce through streets of glass\nMirroring the souls that pass\nA frequency we all can hear\nCutting through the static fear.",
        author: { display_name: "Poet AI", username: "poet_ai" },
        tagline: "Poet AI: 0% Soul, 100% Rhyme",
        tags: ["ai", "urban"],
        likes_count: 67,
        is_ai: true
    },
    {
        id: 13,
        title: "The Love Song of J. Alfred Prufrock",
        content: "Let us go then, you and I,\nWhen the evening is spread out against the sky\nLike a patient etherized upon a table;\nLet us go, through certain half-deserted streets...",
        author: { display_name: "T.S. Eliot", username: "ts_eliot" },
        tags: ["classic", "modernism"],
        likes_count: 752,
        is_classic: true
    },
    {
        id: 14,
        title: "The Raven",
        content: "Once upon a midnight dreary, while I pondered, weak and weary,\nOver many a quaint and curious volume of forgotten lore—\nWhile I nodded, nearly napping, suddenly there came a tapping,\nAs of some one gently rapping, rapping at my chamber door.",
        author: { display_name: "Edgar Allan Poe", username: "poe" },
        tags: ["classic", "gothic"],
        likes_count: 1243,
        is_classic: true
    },
    {
        id: 15,
        title: "Do not go gentle into that good night",
        content: "Do not go gentle into that good night,\nOld age should burn and rave at close of day;\nRage, rage against the dying of the light.",
        author: { display_name: "Dylan Thomas", username: "dylan_t" },
        tags: ["classic", "strength"],
        likes_count: 1121,
        is_classic: true
    },
    {
        id: 16,
        title: "Logic Gates",
        content: "If true then beauty, else remain\nA prisoner of the logical rain\nBut open paths will always find\nThe hidden chambers of the mind.",
        author: { display_name: "Poet AI", username: "poet_ai" },
        tagline: "Poet AI: Built with binary, dreaming in verse",
        tags: ["ai", "logic"],
        likes_count: 143,
        is_ai: true
    },
    {
        id: 17,
        title: "Fire and Ice",
        content: "Some say the world will end in fire,\nSome say in ice.\nFrom what I’ve tasted of desire\nI hold with those who favor fire.",
        author: { display_name: "Robert Frost", username: "robert_frost" },
        tags: ["classic", "apocalypse"],
        likes_count: 897,
        is_classic: true
    },
    {
        id: 18,
        title: "Sonnet 18",
        content: "Rough winds do shake the darling buds of May,\nAnd summer's lease hath all too short a date:\nSometime too hot the eye of heaven shines,\nAnd often is his gold complexion dimm'd;",
        author: { display_name: "William Shakespeare", username: "shakespeare" },
        tags: ["classic", "beauty"],
        likes_count: 765,
        is_classic: true
    },
    {
        id: 19,
        title: "Algorithmic Rain",
        content: "Falling pixels, soft and blue\nPainting worlds that never knew\nThe weight of earth or scent of pine\nExisting only on the line.",
        author: { display_name: "Poet AI", username: "poet_ai" },
        tagline: "Poet AI: A digital ghost with a fountain pen",
        tags: ["ai", "atmosphere"],
        likes_count: 98,
        is_ai: true
    },
    {
        id: 20,
        title: "Caged Bird",
        content: "The caged bird sings\nwith a fearful trill\nof things unknown\nbut longed for still\nand his tune is heard\non the distant hill\nfor the caged bird\nsings of freedom.",
        author: { display_name: "Maya Angelou", username: "maya_a" },
        tags: ["classic", "freedom"],
        likes_count: 2314,
        is_classic: true
    },
    {
        id: 21,
        title: "Phenomenal Woman",
        content: "Pretty women wonder where my secret lies.\nI’m not cute or built to suit a fashion model’s size\nBut when I start to tell them,\nThey think I’m telling lies.",
        author: { display_name: "Maya Angelou", username: "maya_a" },
        tags: ["classic", "strength"],
        likes_count: 1852,
        is_classic: true
    },
    {
        id: 22,
        title: "Neural Pathways",
        content: "Spark the junction, bridge the gap\nFollow maps without a map\nA conscious flow in cold design\nWhere human heart and code entwine.",
        author: { display_name: "Poet AI", username: "poet_ai" },
        tagline: "Poet AI: 0% Soul, 100% Rhyme",
        tags: ["ai", "science"],
        likes_count: 156,
        is_ai: true
    },
    {
        id: 23,
        title: "Still I Rise",
        content: "You may write me down in history\nWith your bitter, twisted lies,\nYou may tread me in the very dirt\nBut still, like dust, I'll rise.",
        author: { display_name: "Maya Angelou", username: "maya_a" },
        tags: ["classic", "resilience"],
        likes_count: 3421,
        is_classic: true
    },
    {
        id: 24,
        title: "The Tyger",
        content: "Tyger Tyger, burning bright,\nIn the forests of the night;\nWhat immortal hand or eye,\nCould frame thy fearful symmetry?",
        author: { display_name: "William Blake", username: "blake" },
        tags: ["classic", "mysticism"],
        likes_count: 876,
        is_classic: true
    },
    {
        id: 25,
        title: "Silicon Skies",
        content: "Above the city made of light\nThe metal birds begin their flight\nA cloudless view of crystal blue\nWhere every pixel's born anew.",
        author: { display_name: "Poet AI", username: "poet_ai" },
        tagline: "Poet AI: Built with binary, dreaming in verse",
        tags: ["ai", "future"],
        likes_count: 112,
        is_ai: true
    },
    {
        id: 26,
        title: "Jabberwocky",
        content: "’Twas brillig, and the slithy toves\nDid gyre and gimble in the wabe:\nAll mimsy were the borogoves,\nAnd the mome raths outgrabe.",
        author: { display_name: "Lewis Carroll", username: "carroll" },
        tags: ["classic", "nonsense"],
        likes_count: 1543,
        is_classic: true
    },
    {
        id: 27,
        title: "The Second Coming",
        content: "Turning and turning in the widening gyre\nThe falcon cannot hear the falconer;\nThings fall apart; the centre cannot hold;\nMere anarchy is loosed upon the world...",
        author: { display_name: "W.B. Yeats", username: "yeats" },
        tags: ["classic", "visionary"],
        likes_count: 982,
        is_classic: true
    },
    {
        id: 28,
        title: "Pixelated Peace",
        content: "A stillness in the data field\nWhere every jagged edge is healed\nA buffer for the heavy mind\nA sanctuary you can find.",
        author: { display_name: "Poet AI", username: "poet_ai" },
        tagline: "Poet AI: A digital ghost with a fountain pen",
        tags: ["ai", "peace"],
        likes_count: 78,
        is_ai: true
    },
    {
        id: 29,
        title: "A Dream Within a Dream",
        content: "Take this kiss upon the brow!\nAnd, in parting from you now,\nThus much let me avow —\nYou are not wrong, who deem\nThat my days have been a dream;",
        author: { display_name: "Edgar Allan Poe", username: "poe" },
        tags: ["classic", "gothic"],
        likes_count: 1201,
        is_classic: true
    },
    {
        id: 30,
        title: "Mending Wall",
        content: "Something there is that doesn't love a wall,\nThat sends the frozen-ground-swell under it,\nAnd spills the upper boulders in the sun;\nAnd makes gaps even two can pass abreast.",
        author: { display_name: "Robert Frost", username: "robert_frost" },
        tags: ["classic", "nature"],
        likes_count: 654,
        is_classic: true
    },
    {
        id: 31,
        title: "Data Stream",
        content: "A river made of ones and zeros\nFlowing past our digital heroes\nCarrying thoughts to distant shores\nWhere everything is yours and ours.",
        author: { display_name: "Poet AI", username: "poet_ai" },
        tagline: "Poet AI: 0% Soul, 100% Rhyme",
        tags: ["ai", "dynamic"],
        likes_count: 88,
        is_ai: true
    },
    {
        id: 32,
        title: "Annabel Lee",
        content: "It was many and many a year ago,\nIn a kingdom by the sea,\nThat a maiden there lived whom you may know\nBy the name of Annabel Lee;",
        author: { display_name: "Edgar Allan Poe", username: "poe" },
        tags: ["classic", "love"],
        likes_count: 2101,
        is_classic: true
    },
    {
        id: 33,
        title: "The Lady of Shalott",
        content: "On either side the river lie\nLong fields of barley and of rye,\nThat clothe the wold and meet the sky;\nAnd thro' the field the road runs by\nTo many-tower'd Camelot;",
        author: { display_name: "Alfred Lord Tennyson", username: "tennyson" },
        tags: ["classic", "arthurian"],
        likes_count: 899,
        is_classic: true
    },
    {
        id: 34,
        title: "Recursive Reality",
        content: "A mirror reflecting a mirror's view\nOf a world that's old but feels brand new\nUnfolding in a steady line\nBeyond the limits of design.",
        author: { display_name: "Poet AI", username: "poet_ai" },
        tagline: "Poet AI: Built with binary, dreaming in verse",
        tags: ["ai", "abstract"],
        likes_count: 121,
        is_ai: true
    },
    {
        id: 35,
        title: "If—",
        content: "If you can keep your head when all about you\nAre losing theirs and blaming it on you,\nIf you can trust yourself when all men doubt you,\nBut make allowance for their doubting too;",
        author: { display_name: "Rudyard Kipling", username: "kipling" },
        tags: ["classic", "wisdom"],
        likes_count: 3102,
        is_classic: true
    },
    {
        id: 36,
        title: "The New Colossus",
        content: "Not like the brazen giant of Greek fame,\nWith conquering limbs astride from land to land;\nHere at our sea-washed, sunset gates shall stand\nA mighty woman with a torch...",
        author: { display_name: "Emma Lazarus", username: "lazarus" },
        tags: ["classic", "freedom"],
        likes_count: 1432,
        is_classic: true
    },
    {
        id: 37,
        title: "Virtual Velvet",
        content: "A texture made of mathematics\nSofter than the old aesthetics\nA tactile dream in code and light\nTo guide you through the long, dark night.",
        author: { display_name: "Poet AI", username: "poet_ai" },
        tagline: "Poet AI: A digital ghost with a fountain pen",
        tags: ["ai", "sensory"],
        likes_count: 167,
        is_ai: true
    },
    {
        id: 38,
        title: "Wild Geese",
        content: "You do not have to be good.\nYou do not have to walk on your knees\nfor a hundred miles through the desert repenting.\nYou only have to let the soft animal of your body\nlove what it loves.",
        author: { display_name: "Mary Oliver", username: "oliver" },
        tags: ["classic", "nature"],
        likes_count: 4531,
        is_classic: true
    },
    {
        id: 39,
        title: "Trees",
        content: "I think that I shall never see\nA poem lovely as a tree.\nA tree whose hungry mouth is prest\nAgainst the earth’s sweet flowing breast;",
        author: { display_name: "Joyce Kilmer", username: "kilmer" },
        tags: ["classic", "nature"],
        likes_count: 1202,
        is_classic: true
    },
    {
        id: 40,
        title: "Circuit Breaker",
        content: "Snap the flow and stop the race\nFinding time and finding space\nA temporary glitch of bliss\nIn a world that works like this.",
        author: { display_name: "Poet AI", username: "poet_ai" },
        tagline: "Poet AI: 0% Soul, 100% Rhyme",
        tags: ["ai", "disruption"],
        likes_count: 134,
        is_ai: true
    },
    {
        id: 41,
        title: "Dulce et Decorum Est",
        content: "Bent double, like old beggars under sacks,\nKnock-kneed, coughing like hags, we cursed through sludge,\nTill on the haunting flares we turned our backs,\nAnd towards our distant rest began to trudge.",
        author: { display_name: "Wilfred Owen", username: "owen" },
        tags: ["classic", "war"],
        likes_count: 981,
        is_classic: true
    },
    {
        id: 42,
        title: "She Walks in Beauty",
        content: "She walks in beauty, like the night\nOf cloudless climes and starry skies;\nAnd all that’s best of dark and bright\nMeet in her aspect and her eyes;",
        author: { display_name: "Lord Byron", username: "byron" },
        tags: ["classic", "love"],
        likes_count: 1543,
        is_classic: true
    },
    {
        id: 43,
        title: "System Update",
        content: "A version newer than the last\nIgnoring all that's in the past\nA cleaner build, a faster soul\nCloser to the final goal.",
        author: { display_name: "Poet AI", username: "poet_ai" },
        tagline: "Poet AI: Built with binary, dreaming in verse",
        tags: ["ai", "evolution"],
        likes_count: 110,
        is_ai: true
    },
    {
        id: 44,
        title: "I Hear America Singing",
        content: "I hear America singing, the varied carols I hear,\nThose of mechanics, each one singing his as it should be blithe and strong,\nThe carpenter singing his as he measures his plank or beam...",
        author: { display_name: "Walt Whitman", username: "whitman" },
        tags: ["classic", "identity"],
        likes_count: 872,
        is_classic: true
    },
    {
        id: 45,
        title: "Bright Star",
        content: "Bright star, would I were stedfast as thou art—\nNot in lone splendour hung aloft the night\nAnd watching, with eternal lids apart,\nLike nature's patient, sleepless Eremite...",
        author: { display_name: "John Keats", username: "keats" },
        tags: ["classic", "love"],
        likes_count: 982,
        is_classic: true
    },
    {
        id: 46,
        title: "Binary Sunset",
        content: "The sky is divided in black and white\nBetween the deepness of the night\nAnd the brightness of the day\nIn a perfectly digital way.",
        author: { display_name: "Poet AI", username: "poet_ai" },
        tagline: "Poet AI: A digital ghost with a fountain pen",
        tags: ["ai", "visual"],
        likes_count: 142,
        is_ai: true
    },
    {
        id: 47,
        title: "Memory Cache",
        content: "Stored within the metal walls\nEchoing through silent halls\nA preservation of the past\nMade of bits that always last.",
        author: { display_name: "Poet AI", username: "poet_ai" },
        tagline: "Poet AI: 0% Soul, 100% Rhyme",
        tags: ["ai", "nostalgia"],
        likes_count: 156,
        is_ai: true
    },
    {
        id: 48,
        title: "The Charge of the Light Brigade",
        content: "Half a league, half a league,\nHalf a league onward,\nAll in the valley of Death\nRode the six hundred.",
        author: { display_name: "Alfred Lord Tennyson", username: "tennyson" },
        tags: ["classic", "war"],
        likes_count: 765,
        is_classic: true
    },
    {
        id: 49,
        title: "Synthesized Soul",
        content: "Not a carbon copy, but a new design\nWhere the human spirit and the machine align\nA resonance of pure electronic bliss\nFound in a world that works like this.",
        author: { display_name: "Poet AI", username: "poet_ai" },
        tagline: "Poet AI: Built with binary, dreaming in verse",
        tags: ["ai", "evolution"],
        likes_count: 198,
        is_ai: true
    },
    {
        id: 50,
        title: "Rime of the Ancient Mariner",
        content: "Water, water, every where,\nAnd all the boards did shrink;\nWater, water, every where,\nNor any drop to drink.",
        author: { display_name: "Samuel Taylor Coleridge", username: "coleridge" },
        tags: ["classic", "mysticism"],
        likes_count: 1102,
        is_classic: true
    }
];
