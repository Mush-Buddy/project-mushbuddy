// Index of anatomical cap/gill/veil options for the catalog's filtering functionality.
// Cap has 10 options; gill has 8; veil has 5. (not including 'none' option)

const options = {
    cap: [
        {
            label: 'campanulate',
        }, {
            label: 'conical',
        }, {
            label: 'convex',
        }, {
            label: 'depressed',
        }, {
            label: 'flat',
        }, {
            label: 'infundibuliform',
        }, {
            label: 'offset',
        }, {
            label: 'ovate',
        }, {
            label: 'umbilicate',
        }, {
            label: 'umbonate',
        }, {
            label: 'none',
        },
    ],
    hymenium: [
        {
            label: 'gills',
        }, {
            label: 'pores',
        }, {
            label: 'smooth',
        }, {
            label: 'ridges',
        }, {
            label: 'tooth',
        }, {
            label: 'none',
        },
    ],
    gillAttachment: [
        // {
        //     label: 'none',
        // },
        {
            label: 'adnate',
        }, {
            label: 'adnexed',
        }, {
            label: 'decurrent',
        }, {
            label: 'emarginate',
        }, {
            label: 'free',
        }, {
            label: 'seceding',
        }, {
            label: 'sinuate',
        }, {
            label: 'subdecurrent',
        },
    ],
    veil: [
        {
            label: 'bare',
        }, {
            label: 'ring',
        }, {
            label: 'volva',
        }, {
            label: 'ring_and_volva',
        }, {
            label: 'cortina',
        }, {
            label: 'none',
        },
    ],
};

export default options;