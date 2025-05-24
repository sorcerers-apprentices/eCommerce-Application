import type { ProductProjectionPagedSearchResponse } from '@commercetools/platform-sdk'

export type CategoryItem = {
  name: string
  children?: CategoryItem[]
}

export const categories: CategoryItem[] = [
  {
    name: 'Dog',
    children: [
      {
        name: 'Food',
        children: [{ name: 'Dry-Food' }, { name: 'Wet-Food' }],
      },
      { name: 'Treats' },
      { name: 'Toys' },
      { name: 'Coats & Clothing' },
    ],
  },
  {
    name: 'Cat',
    children: [
      {
        name: 'Food',
        children: [{ name: 'Dry-Food' }, { name: 'Wet-Food' }],
      },
      { name: 'Treats' },
      { name: 'Trees & Scratching Posts' },
      { name: 'Healthcare & Treatments' },
    ],
  },
  {
    name: 'Small_Animal',
    children: [{ name: 'Rabbit' }, { name: 'Hamster' }, { name: 'Rat' }, { name: 'Chinchilla' }],
  },
  {
    name: 'Fish',
    children: [{ name: 'Food' }, { name: 'Fish tanks' }, { name: 'Health & Tank Cleaning' }],
  },
]

export const categoryIdMapForProductsFetch: { [key: string]: string } = {
  Dog: '5457f5cb-aa13-4944-812c-df486f2b1573',
  'Dog-Food': 'fbc340c4-07cc-4220-9361-77eaca56b84e',
  'Dog-Food-Dry-Food': 'c8051c37-e43a-43dc-aa1e-066d547903c1',
  'Dog-Food-Wet-Food': '3de56087-0a05-4392-b555-be4d75aa5b09',
  'Dog-Treats': 'e72af030-9427-483a-b545-ec1a0444293e',
  'Dog-Toys': '526e2c6b-1b06-4eda-ac2d-9be737df95c0',
  'Dog-Coats & Clothing': 'bbd20825-8745-4b53-8f7d-88a075d03e7a',
  Cat: '98da5116-7c00-46e6-9b05-96f2dacdbe1b',
  'Cat-Food': '4bc3c417-4d1c-4442-a055-ed8cd654f8cc',
  'Cat-Food-Dry-Food': 'fd909829-04fe-4c84-8194-414a1769f88a',
  'Cat-Food-Wet-Food': '85451049-324b-4ffe-9c95-f9a0a5ce3ed3',
  'Cat-Treats': '78f7b9fd-28ff-4bd9-bdfd-c0c748053c58',
  'Cat-Trees & Scratching Posts': '207c4f0b-1a9c-422d-b54c-46d745c1e3b0',
  'Cat-Healthcare & Treatments': 'ab5e394d-50c8-4b6d-9f8d-cfbe351dd114',
  Small_Animal: 'd81a4337-ac3c-4698-ae78-6523577b9acb',
  'Small_Animal-Rabbit': 'c2de6270-4929-4457-808d-b3061f34b259',
  'Small_Animal-Hamster': 'f340b5ce-6a4d-4226-a2cb-54cf13b6fe5b',
  'Small_Animal-Rat': '1ae7ca64-2b87-4a90-b32f-e94291481a1c',
  'Small_Animal-Chinchilla': '256a5076-70e9-45c9-9f52-ffd09116dff2',
  Fish: '87544310-b398-4e11-a2ae-222843c0d50f',
  'Fish-Food': '228aeb54-4a0c-4e90-95ed-9c077484e950',
  'Fish-Fish tanks': '62751421-d2ee-45d8-8506-6ec4cea909b7',
  'Fish-Health & Tank Cleaning': 'e55be1aa-4fe8-4325-8436-0f6bf5c8fb20',
}

export type FetchProductsResponse = {
  products: ProductProjectionPagedSearchResponse | null
  error: string | null
  loading: boolean
}
