
export default {
    name: 'capabilities',
    title: 'Capabilities Section',
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
            name: 'all_capabilities',
            title: 'Capabilities',
            type: 'array',
            of: [{
                name: 'singleCapability',
                title: 'Capability',
                type: 'document',
                fields: [
                    {
                        name: 'capability_name',
                        title: 'Capability Name',
                        type: 'string'
                    },
                    {
                        name: 'text1',
                        title: 'Text One',
                        type: 'string'
                    },
                    {
                        name: 'text2',
                        title: 'Text Two',
                        type: 'array',
                        of: [{type: 'block'}]
                    },
                    {
                        name: 'image',
                        title: 'Image (960px × 1100px)',
                        type: 'image'
                    },
                    {
                        name: 'image_mobile',
                        title: 'Image Mobile (768px × 484px)',
                        type: 'image'
                    }
                ]
            }]
        }
    ]
}