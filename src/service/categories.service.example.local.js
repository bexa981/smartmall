const categories = [
    {
        id: 1,
        name: 'Kabellar',
        icon: 'fa-sharp fa-solid fa-wine-glass',
        subCategories: [
            {
                name: "ABB",
                id: 1
            },
            {
                name: "ABB",
                id: 2
            },
            {
                name: "ABB",
                id: 3
            },
            {
                name: "ABB",
                id: 4
            },
            {
                name: "ABB",
                id: 5
            }
        ]
    }
]

export async function getCategories() {
    return Promise.resolve(categories)
}