
export default {
    name: 'about',
    title: 'About Section',
    type: 'document',
    fields: [
        {
            name: 'section_title',
            title: 'Section Title',
            type: 'string'
        },
        {
            name: 'hidden_phrase',
            title: 'Hidden Phrase',
            type: 'string'
        },
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
            name: 'cta_text',
            title: 'CTA Text',
            type: 'string'
        },
        {
            name: 'all_elements',
            title: 'Elements',
            type: 'array',
            of: [{
                name: 'singleElement',
                title: 'Element',
                type: 'document',
                fields: [
                    {
                        name: 'element_name',
                        title: 'Element Name',
                        type: 'string'
                    },
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
                        name: 'image',
                        title: 'Image (1404px × 1028px)',
                        type: 'image'
                    }
                ]
            }]
        },
        {
            name: 'all_words',
            title: 'Palabras',
            type: 'array',
            of: [{
                name: 'singleWord',
                title: 'Word',
                type: 'document',
                fields: [
                    {
                        name: 'word',
                        title: 'Palabra',
                        type: 'string'
                    }
                ]
            }]
        }
    ]
}