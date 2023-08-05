import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 'psy845lh',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-08-03',
})

export async function getSelectedBrands() {
  const data = await client.fetch(`*[_type == "brandsPage"][0]
  {
    ...,
    selectedBrands[]->{
      ...,
    }
  }`)
  return data
}

export async function getBrandPage(slug) {
  const data = await client.fetch(
    `*[_type == "brands" && slug.current == $slug][0]`,
    { slug }
  )
  return data
}

export async function getAgencyPage() {
  const data = await client.fetch('*[_type == "agency"][0]')
  return data
}

export async function getContactPage() {
  const data = await client.fetch('*[_type == "contact"][0]')
  return data
}

export async function getCookiesPage() {
  const data = await client.fetch('*[_type == "cookies"][0]')
  return data
}

export async function getLegalPage() {
  const data = await client.fetch('*[_type == "legal"][0]')
  return data
}
