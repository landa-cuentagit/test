
export default {
    name: 'section_one',
    title: 'Section One',
    type: 'document',
    fields: [
        {
            name: 'text',
            title: 'Text',
            type: 'array',
            of: [{type: 'block'}]
        },
        {
            name: 'cta_text',
            title: 'CTA Text',
            type: 'string'
        },
        {
            name: 'image1',
            title: 'Image One (586px × 346px)',
            type: 'image'
        },
        {
            name: 'image2',
            title: 'Image Two (586px × 346px)',
            type: 'image'
        },
        {
            name: 'image3',
            title: 'Image Three (586px × 346px)',
            type: 'image'
        },
        {
            name: 'video1',
            title: 'Video One',
            type: 'file'
        },
        {
            name: 'video2',
            title: 'Video Two',
            type: 'file'
        },
        {
            name: 'video3',
            title: 'Video Three',
            type: 'file'
        }
    ]
}