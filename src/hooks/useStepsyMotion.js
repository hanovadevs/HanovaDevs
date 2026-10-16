import { useEffect } from 'react'

export default function useStepsyMotion(pageRef, stillView) {
  useEffect(() => {
    if (stillView || !window.matchMedia) return undefined
    let disposed = false
    let media
    const page = pageRef.current
    async function setup() {
      try {
        const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')])
        if (disposed) return
        gsap.registerPlugin(ScrollTrigger)
        media = gsap.matchMedia()
        page.dataset.motionReady = 'true'
        media.add('(prefers-reduced-motion: no-preference)', () => {
          const intro = gsap.timeline({ defaults: { ease: 'power3.out', duration: .9 } })
          intro.fromTo(page.querySelectorAll('.stepsy-hero__copy > *'), { y: 22, opacity: 0 }, { y: 0, opacity: 1, stagger: .06 })
            .fromTo('.stepsy-hero__visual', { y: 45, rotation: 5, scale: .94, opacity: 0 }, { y: 0, rotation: 0, scale: 1, opacity: 1 }, .15)
            .fromTo('.stepsy-thread path', { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.8 }, .15)
          page.querySelectorAll('[data-stepsy-reveal], .stepsy-connection h2, .stepsy-connection__grid article, .stepsy-partners__layout > div, .stepsy-direction__grid article, .stepsy-faq .stepsy-heading, .stepsy-closing h2').forEach(element => {
            gsap.fromTo(element, { y: 35, opacity: .45 }, { y: 0, opacity: 1, duration: .7, scrollTrigger: { trigger: element, start: 'top 95%', end: 'top 65%', scrub: .4 } })
          })
          gsap.fromTo('.stepsy-partners__ticket', { rotation: -7, y: 28 }, { rotation: 2, y: -12, ease: 'none', scrollTrigger: { trigger: '.stepsy-partners', start: 'top bottom', end: 'bottom top', scrub: .5 } })
        }, page)
        const story = page.querySelector('#stepsy-story')
        media.add('(min-width: 1000px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)', () => {
          story.dataset.cinematic = 'true'
          const frames = [...story.querySelectorAll('.stepsy-film__frame')]
          const chapters = [...story.querySelectorAll('.stepsy-scene')]
          const links = [...story.querySelectorAll('[data-scene-link]')]
          const tints = ['#edf6f0', '#e1f3ed', '#e9f1f5', '#f3f3e5', '#dfefe8']
          const updateChapter = index => {
            story.dataset.activeScene = chapters[index].dataset.scene
            story.querySelector('[data-scene-counter]').textContent = `0${index + 1} / 05`
            story.querySelector('[data-scene-label]').textContent = chapters[index].dataset.label
            links.forEach((link, position) => { if (position === index) link.setAttribute('aria-current', 'step'); else link.removeAttribute('aria-current') })
          }
          updateChapter(0)
          gsap.set(frames, { opacity: 0, scale: 1, y: 0, rotation: 0 })
          gsap.set(frames[0], { opacity: 1 })
          chapters.forEach((chapter, index) => {
            ScrollTrigger.create({ trigger: chapter, start: 'top 55%', end: 'bottom 55%', onEnter: () => updateChapter(index), onEnterBack: () => updateChapter(index) })
            gsap.fromTo(chapter.querySelector('.stepsy-scene__copy'), { y: 48, opacity: .25 }, { y: 0, opacity: 1, ease: 'none', scrollTrigger: { trigger: chapter, start: 'top 90%', end: 'top 30%', scrub: .4 } })
            if (!index) return
            gsap.timeline({ scrollTrigger: { trigger: chapter, start: 'top 85%', end: 'top 40%', scrub: .45, invalidateOnRefresh: true } })
              .fromTo(frames[index - 1], { opacity: 1, scale: 1, y: 0, rotation: 0 }, { opacity: 0, scale: .91, y: -42, rotation: -3, ease: 'none', immediateRender: false }, 0)
              .fromTo(frames[index], { opacity: 0, scale: 1.07, y: 70, rotation: 4 }, { opacity: 1, scale: 1, y: 0, rotation: 0, ease: 'none', immediateRender: false }, 0)
              .to(story.querySelector('.stepsy-film'), { '--film-tint': tints[index], ease: 'none' }, 0)
          })
          gsap.fromTo('.stepsy-film__progress span', { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: '.stepsy-film', start: 'top 25%', end: 'bottom 80%', scrub: .3 } })
          return () => {
            delete story.dataset.cinematic
            delete story.dataset.activeScene
            links.forEach(link => link.removeAttribute('aria-current'))
          }
        }, page)
        media.add('(max-width: 999px) and (prefers-reduced-motion: no-preference)', () => {
          page.querySelectorAll('.stepsy-scene__preview').forEach(preview => {
            gsap.fromTo(preview, { y: 32, scale: .96, rotation: -1.5 }, { y: 0, scale: 1, rotation: 0, ease: 'none', scrollTrigger: { trigger: preview, start: 'top 95%', end: 'top 40%', scrub: .4 } })
          })
        }, page)
        document.fonts?.ready.then(() => { if (!disposed) ScrollTrigger.refresh() })
      } catch {
        media?.revert()
        page.dataset.motionReady = 'unavailable'
      }
    }
    setup()
    return () => { disposed = true; media?.revert(); delete page.dataset.motionReady }
  }, [pageRef, stillView])
}
