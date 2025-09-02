
export default {
    name: 'destinations',
    title: 'Destinations Section',
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
            name: 'cta_text',
            title: 'CTA Text',
            type: 'string'
        },
        {
            name: 'all_destinations',
            title: 'Destinations',
            type: 'array',
            of: [{
                name: 'singleDestiny',
                title: 'Destiny',
                type: 'document',
                fields: [
                    {
                        name: 'destiny_name',
                        title: 'Destiny Name',
                        type: 'string'
                    },
                    {
                        name: 'first_coord',
                        title: 'First coord',
                        type: 'string'
                    },
                    {
                        name: 'second_coord',
                        title: 'Second coord',
                        type: 'string'
                    },
                    {
                        name: 'location1',
                        title: 'Location One',
                        type: 'string'
                    },
                    {
                        name: 'location2',
                        title: 'Location Two',
                        type: 'string'
                    },
                    {
                        name: 'text',
                        title: 'Text',
                        type: 'array',
                        of: [{type: 'block'}]
                    },
                    {
                        name: 'image',
                        title: 'Image (2844px × 1200px)',
                        type: 'image'
                    }
                ]
            }]
        },
    ]
}