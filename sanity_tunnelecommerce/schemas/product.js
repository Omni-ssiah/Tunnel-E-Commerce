export default {
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
        {
            name: 'image',
            title: 'Image',
            type: 'array',
            of: [{type: 'image'}],
            option: {
                hotspot: true,
            }
        },
        {
            name: 'name',
            title: 'Name',
            type: 'string',
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            option: {
                source: 'name',
                maxLength: 90,
                slugify: (input) =>
                input
                .toLowerCase()
                //Remove spaces
                .replace(/\s+/g, "-")
                //Remove special characters
                .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, ""),
                validation: (Rule) => Rule.required(),
            }
        },
        {
            name: 'price',
            title: 'Price',
            type: 'number',
        },
        {
            name: 'details',
            title: 'Details',
            type: 'string',
        },
    ]
}