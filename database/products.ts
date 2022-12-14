interface SeedProduct {
  description: string
  images: string[]
  inStock: number
  price: number
  sizes: ValidSizes[]
  slug: string
  tags: string[]
  title: string
  type: ValidTypes
}

type ValidSizes = 'Pequeño' | 'Mediano' | 'Grande'
type ValidTypes =
  | 'San Valentín'
  | 'Cumpleaños'
  | 'Halloween'
  | 'Sin gluten'
  | 'Sin huevo'
  | 'Rellenos'
  | 'Sin relleno'

interface SeedData {
  products: SeedProduct[]
}

export const initialData: SeedData = {
  products: [
    {
      description:
        'Este cupcake está cubierto con dulces chispas y corazones comestibles, crema y por dentro relleno con manjar',
      images: ['1473809-00-A_1_2000.jpg', '1473809-00-A_alt.jpg'],
      inStock: 7,
      price: 75,
      sizes: ['Pequeño', 'Mediano', 'Grande'],
      slug: 's0',
      type: 'San Valentín',
      tags: ['sweatshirt'],
      title: 'Cupcake con corazones',
    },
    {
      description: 'Este cupcake es fenomenal!!!',
      images: ['1473814-00-A_1_2000.jpg', '1473814-00-A_alt.jpg'],
      inStock: 3,
      price: 75,
      sizes: ['Mediano', 'Grande'],
      slug: 's1',
      type: 'Rellenos',
      tags: ['sweatshirt'],
      title: 'Cupcake de chocolate',
    },
    {
      description: 'Único en La Serena',
      images: ['1473815-00-A_1_2000.jpg', '1473815-00-A_1_2000-00-A_alt.jpg'],
      inStock: 17,
      price: 75,
      sizes: ['Mediano', 'Grande'],
      slug: 's2',
      type: 'Sin relleno',
      tags: ['sweatshirt'],
      title: 'Cupcake de chocolate',
    },
    {
      description: 'Cupcake con gran decoración, ideal para regalar',
      images: ['1473816-00-A_1_2000.jpg', '1473816-00-A_1_2000-00-A_alt.jpg'],
      inStock: 10,
      price: 75,
      sizes: ['Mediano'],
      slug: 's3',
      type: 'Halloween',
      tags: ['sweatshirt'],
      title: 'Cupcake de chocolate - Halloween',
    },
    {
      description: '<3',
      images: ['1473817-00-A_1_2000.jpg', '1473817-00-A_1_2000-00-A_alt.jpg'],
      inStock: 30,
      price: 75,
      sizes: ['Mediano'],
      slug: 's4',
      type: 'Halloween',
      tags: ['sweatshirt'],
      title: 'Cupcake con frutas',
    },
  ],
}
