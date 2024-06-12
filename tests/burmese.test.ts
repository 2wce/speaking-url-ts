import { describe, expect, it } from 'vitest'
import { getSlug } from '../src/get-slug.js'

describe('getSlug translate burmese letters', () => {
  it('one consonant', () => {
    expect(
      getSlug('မ', {
        lang: 'my'
      })
    ).toBe('m')
  })

  it('one independent vowel', () => {
    expect(
      getSlug('ဪ', {
        lang: 'my'
      })
    ).toBe('aw')
  })

  it('one consonant with one vowel', () => {
    expect(
      getSlug('ကာ', {
        lang: 'my'
      })
    ).toBe('ka')
  })

  it('one consonant and multiple vowels', () => {
    expect(
      getSlug('ကော', {
        lang: 'my'
      })
    ).toBe('kaw')

    expect(
      getSlug('ကော်', {
        lang: 'my'
      })
    ).toBe('kaw')

    expect(
      getSlug('ကွဲ', {
        lang: 'my'
      })
    ).toBe('kwe')

    expect(
      getSlug('ပေါ်', {
        lang: 'my'
      })
    ).toBe('paw')

    expect(
      getSlug('ပို', {
        lang: 'my'
      })
    ).toBe('po')

    expect(
      getSlug('ကူ', {
        lang: 'my'
      })
    ).toBe('ku')
  })

  it('one consonant and multiple medials', () => {
    expect(
      getSlug('မျှ', {
        lang: 'my'
      })
    ).toBe('myah')

    expect(
      getSlug('ကြွ', {
        lang: 'my'
      })
    ).toBe('kyw')

    expect(
      getSlug('လွှ', {
        lang: 'my'
      })
    ).toBe('lwh')

    expect(
      getSlug('မြွှ', {
        lang: 'my'
      })
    ).toBe('mywh')

    expect(
      getSlug('ကုံ', {
        lang: 'my'
      })
    ).toBe('kon')

    expect(
      getSlug('ဘွိုင်း', {
        lang: 'my'
      })
    ).toBe('bawaing')

    expect(
      getSlug('လျှင်', {
        lang: 'my'
      })
    ).toBe('lyahin')
  })

  it('one pali word', () => {
    expect(
      getSlug('စ္စ', {
        lang: 'my'
      })
    ).toBe('ss')
  })

  it('one single consonant and one consonant with asat', () => {
    expect(
      getSlug('ကက်', {
        lang: 'my'
      })
    ).toBe('ket')

    expect(
      getSlug('ပိုက်', {
        lang: 'my'
      })
    ).toBe('paik')

    expect(
      getSlug('ကောက်', {
        lang: 'my'
      })
    ).toBe('kauk')
  })

  it('pali asat and tone marks', () => {
    expect(
      getSlug('ကျွန်ုပ်', {
        lang: 'my'
      })
    ).toBe('kyawnub')

    expect(
      getSlug('ပစ္စည်း', {
        lang: 'my'
      })
    ).toBe('pssi')

    expect(
      getSlug('တက္ကသိုလ်', {
        lang: 'my'
      })
    ).toBe('tkkthol')

    expect(
      getSlug('သဏ္ဍာန်', {
        lang: 'my'
      })
    ).toBe('thnadan')
    expect(
      getSlug('လိမ္မော်', {
        lang: 'my'
      })
    ).toBe('limmaw')
    expect(
      getSlug('စက္ကူ', {
        lang: 'my'
      })
    ).toBe('skku')
    expect(
      getSlug('ဘဏ္ဍာ', {
        lang: 'my'
      })
    ).toBe('banada')
    expect(
      getSlug('မင်္ဂလာ', {
        lang: 'my'
      })
    ).toBe('mingla')
  })

  it('simple sentence with spaces and tone marks', () => {
    expect(
      getSlug('မြန်မာပြည် ကို တို့ချစ်သည်၊ တို့တိုင်းတို့ပြည်', {
        lang: 'my'
      })
    ).toBe('myanmapyi-ko-tokhyaitthi-totaingtopyi')

    expect(
      getSlug('သတ္တဝါတွေ ကျန်းမာပါစေ။', {
        lang: 'my'
      })
    ).toBe('thttwatwe-kyaanmapase')

    expect(
      getSlug('မြန်မာ သာဓက', {
        lang: 'my'
      })
    ).toBe('myanma-thadak')
  })

  it('complex sentences with combinations of consonants, vowels and diatrics', () => {
    expect(
      getSlug('ဘင်္ဂလား ပင်လယ်အော် တွင် ယနေ့ နေသာသည်။', {
        lang: 'my'
      })
    ).toBe('baingla-pinleaaw-twin-yne-nethathi')

    expect(
      getSlug('ဗုဒ္ဓဘာသာ မြန်မာလူမျိုး', {
        lang: 'my'
      })
    ).toBe('buddabaatha-myanmalumyao')
  })
})
