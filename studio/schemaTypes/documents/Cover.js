
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
        /*{
            name: 'image1',
            title: 'Image One (1514px × 1940px)',
            type: 'image'
        },
        {
            name: 'image2',
            title: 'Image Two (1514px × 1940px)',
            type: 'image'
        },*/
        {
            name: 'all_images_left',
            title: 'Imágenes Izquierda',
            type: 'array',
            of: [
                {
                    name: 'image_gallery',
                    title: 'Imagen (1514px × 1940px)',
                    type: 'image',
                    options: {
                        hotspot: true,
                    }
                },
            ],
            options: {
                layout: 'grid',
            },
        },
        {
            name: 'all_images_right',
            title: 'Imágenes Derecha',
            type: 'array',
            of: [
                {
                    name: 'image_gallery',
                    title: 'Imagen (1514px × 1940px)',
                    type: 'image',
                    options: {
                        hotspot: true,
                    }
                },
            ],
            options: {
                layout: 'grid',
            },
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