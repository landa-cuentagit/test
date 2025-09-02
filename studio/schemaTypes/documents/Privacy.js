
export default {
    name: 'privacy',
    title: 'Privacy section',
    type: 'document',
    fields: [
        {
            name: 'section_title',
            title: 'Section Title',
            type: 'string'
        },
        {
            name: 'text',
            title: 'Text',
            type: 'array',
            of: [{type: 'block'}]
        }
    ]
}