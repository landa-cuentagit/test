
export default {
    name: 'cover',
    title: 'Cover section',
    type: 'document',
    fields: [
        {
            name: 'text',
            title: 'Text',
            type: 'array',
            of: [{type: 'block'}]
        },
        {
            name: 'image1',
            title: 'Image One (1514px × 1940px)',
            type: 'image'
        },
        {
            name: 'image2',
            title: 'Image Two (1514px × 1940px)',
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
        }
    ]
}