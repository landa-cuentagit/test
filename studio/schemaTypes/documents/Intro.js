
export default {
    name: 'intro',
    title: 'Intro section',
    type: 'document',
    fields: [
        {
            name: 'text1',
            title: 'Text One',
            type: 'array',
            of: [{type: 'block'}]
        },
        {
            name: 'text2',
            title: 'Text Two',
            type: 'array',
            of: [{type: 'block'}]
        },
        {
            name: 'text3',
            title: 'Text Three',
            type: 'array',
            of: [{type: 'block'}]
        },
        {
            name: 'image_desktop',
            title: 'Image Desktop (3026px × 1930px)',
            type: 'image'
        },
        {
            name: 'image_mobile',
            title: 'Image Mobile (1328px × 1766px)',
            type: 'image'
        }
    ]
}