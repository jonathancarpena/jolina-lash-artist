// Example {
//     name: Cutie,
//     type: Classic
//     category: full
//     price: 75,
//     duration: {
//          start: 60
//          end: 75
//      },
//      description: 'creates longer lengths...'
//      method: 'single extension applied...'
// }

const Content = {
    full: [
        { name: "Cutie Classic", price: 70 },
        { name: "Honey Hybrid", price: 80 },
        { name: "Vicious Volume", price: 90 }
    ],
    fills: [
        { name: "Cutie Fill", price: 45 },
        { name: "Honey Fill", price: 55 },
        { name: "Vicious Fill", price: 65 }
    ],
    mini: [
        { name: "Cutie Fill", price: 27 },
        { name: "Honey Fill", price: 32 },
        { name: "Vicious Fill", price: 37 }
    ],
    other: [
        { name: "Lash Lift", price: 75 },
        { name: "Full Removal", price: 25 },
        { name: "Lash Bath", price: 10 }
    ]
}

export default [
    {
        name: 'cutie',
        type: 'classics',
        category: 'full',
        price: 70,
        duration: {
            start: 60,
            end: 90
        },
        description: 'Creates Longer Lengths, Slight Curl, and Natural Fullness to your lash line.',
        method: 'Single extension that is applied to a single natural lash. (1:1 Ratio).'
    },
    {
        name: 'honey',
        type: 'hybrid',
        category: 'full',
        price: 80,
        duration: {
            start: 120,
            end: 150
        },
        description: 'Offers a Textured Look, Adds Darkness and Fullness to the eye.',
        method: 'A combination of 50% classic lashes and 50% volume lashes.'
    },
    {
        name: 'vicious',
        type: 'volume',
        category: 'full',
        price: 90,
        duration: {
            start: 150,
            end: 180
        },
        description: 'Creates a Textured Full/Dramatic look with a Even Darker lash lin.',
        method: 'A 2D-6D handmade fan is applied to the lashes.'
    },
    {
        name: 'cutie',
        type: 'classics',
        category: 'fill',
        price: 45,
        duration: {
            start: 60,
            end: 90
        },
        description: 'Creates Longer Lengths, Slight Curl, and Natural Fullness to your lash line.',
        method: 'Single extension that is applied to a single natural lash. (1:1 Ratio).'
    },
    {
        name: 'honey',
        type: 'hybrid',
        category: 'fill',
        price: 55,
        duration: {
            start: 120,
            end: 150
        },
        description: 'Offers a Textured Look, Adds Darkness and Fullness to the eye.',
        method: 'A combination of 50% classic lashes and 50% volume lashes.'
    },
    {
        name: 'vicious',
        type: 'volume',
        category: 'fill',
        price: 65,
        duration: {
            start: 150,
            end: 180
        },
        description: 'Creates a Textured Full/Dramatic look with a Even Darker lash lin.',
        method: 'A 2D-6D handmade fan is applied to the lashes.'
    },
    {
        name: 'cutie',
        type: 'classics',
        category: 'mini-fill',
        price: 27,
        duration: {
            start: 60,
            end: 90
        },
        description: 'Creates Longer Lengths, Slight Curl, and Natural Fullness to your lash line.',
        method: 'Single extension that is applied to a single natural lash. (1:1 Ratio).'
    },
    {
        name: 'honey',
        type: 'hybrid',
        category: 'mini-fill',
        price: 32,
        duration: {
            start: 120,
            end: 150
        },
        description: 'Offers a Textured Look, Adds Darkness and Fullness to the eye.',
        method: 'A combination of 50% classic lashes and 50% volume lashes.'
    },
    {
        name: 'vicious',
        type: 'volume',
        category: 'mini-fill',
        price: 37,
        duration: {
            start: 150,
            end: 180
        },
        description: 'Creates a Textured Full/Dramatic look with a Even Darker lash lin.',
        method: 'A 2D-6D handmade fan is applied to the lashes.'
    },
    {
        name: 'lash lift',
        category: 'other',
        price: 75,
        duration: {
            start: 45,
            end: 60
        },
        description: `Boosts and Alters your natural lashes to have a more Curled Effect.`,
        method: 'The lashes are lifted with a product.'
    },
    {
        name: 'full removal',
        category: 'other',
        price: 25,
        duration: {
            start: 45,
            end: 60
        },
        description: `Boosts and Alters your natural lashes to have a more Curled Effect.`,
        method: 'The lashes are lifted with a product.'
    },
    {
        name: 'lash bath',
        category: 'other',
        price: 10,
        duration: {
            start: 45,
            end: 60
        },
        description: `Boosts and Alters your natural lashes to have a more Curled Effect.`,
        method: 'The lashes are lifted with a product.'
    },

]