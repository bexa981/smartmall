const products = [
    {
        id: 1,
        name: 'Product 1',
        price: 100,
        description: 'This is product 1'
    }
]

export async function getProducts() {
    return Promise.resolve(products)
}

export async function addProduct(product) {
    products.push(product)
    return Promise.resolve(product)
}
