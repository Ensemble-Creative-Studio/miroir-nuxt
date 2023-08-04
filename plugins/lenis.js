import Lenis from '@studio-freight/lenis'

export default defineNuxtPlugin(() => {
  let lenis
  let raf

  const initLenis = () => {
    lenis = new Lenis()

    raf = (time) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    // console.log('Lenis initialized')
  }

  const destroyLenis = () => {
    if (lenis) {
      lenis.destroy()
      cancelAnimationFrame(raf)
      lenis = null
      raf = null
      // console.log('Lenis destroyed')
    }
  }

  return {
    provide: { initLenis, destroyLenis },
  }
})
