import imageUrlBuilder from '@sanity/image-url'

export default defineNuxtPlugin(() => {
  const builder = imageUrlBuilder(useSanity().config)

  const urlFor = (source) => {
    return builder.image(source).auto('format')
  }

  return {
    provide: { urlFor },
  }
})
