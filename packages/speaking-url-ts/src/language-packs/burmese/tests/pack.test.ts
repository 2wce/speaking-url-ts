import { generateSlug } from '@/generate-slug.js'
import { describe, expect, it } from 'vitest'

describe.skip('generateSlug translate burmese letters', () => {
  it('one consonant', () => {
    expect(
      generateSlug('မ', {
        locale: 'my'
      })
    ).toBe('m')
  })

  it('one independent vowel', () => {
    expect(
      generateSlug('ဪ', {
        locale: 'my'
      })
    ).toBe('aw')
  })

  it('one consonant with one vowel', () => {
    expect(
      generateSlug('ကာ', {
        locale: 'my'
      })
    ).toBe('ka')
  })

  it('one consonant and multiple vowels', () => {
    expect(
      generateSlug('ကော', {
        locale: 'my'
      })
    ).toBe('kaw')

    expect(
      generateSlug('ကော်', {
        locale: 'my'
      })
    ).toBe('kaw')

    expect(
      generateSlug('ကွဲ', {
        locale: 'my'
      })
    ).toBe('kwe')

    expect(
      generateSlug('ပေါ်', {
        locale: 'my'
      })
    ).toBe('paw')

    expect(
      generateSlug('ပို', {
        locale: 'my'
      })
    ).toBe('po')

    expect(
      generateSlug('ကူ', {
        locale: 'my'
      })
    ).toBe('ku')
  })

  it('one consonant and multiple medials', () => {
    expect(
      generateSlug('မျှ', {
        locale: 'my'
      })
    ).toBe('myah')

    expect(
      generateSlug('ကြွ', {
        locale: 'my'
      })
    ).toBe('kyw')

    expect(
      generateSlug('လွှ', {
        locale: 'my'
      })
    ).toBe('lwh')

    expect(
      generateSlug('မြွှ', {
        locale: 'my'
      })
    ).toBe('mywh')

    expect(
      generateSlug('ကုံ', {
        locale: 'my'
      })
    ).toBe('kon')

    expect(
      generateSlug('ဘွိုင်း', {
        locale: 'my'
      })
    ).toBe('bawaing')

    expect(
      generateSlug('လျှင်', {
        locale: 'my'
      })
    ).toBe('lyahin')
  })

  it('one pali word', () => {
    expect(
      generateSlug('စ္စ', {
        locale: 'my'
      })
    ).toBe('ss')
  })

  it('one single consonant and one consonant with asat', () => {
    expect(
      generateSlug('ကက်', {
        locale: 'my'
      })
    ).toBe('ket')

    expect(
      generateSlug('ပိုက်', {
        locale: 'my'
      })
    ).toBe('paik')

    expect(
      generateSlug('ကောက်', {
        locale: 'my'
      })
    ).toBe('kauk')
  })

  it('pali asat and tone marks', () => {
    expect(
      generateSlug('ကျွန်ုပ်', {
        locale: 'my'
      })
    ).toBe('kyawnub')

    expect(
      generateSlug('ပစ္စည်း', {
        locale: 'my'
      })
    ).toBe('pssi')

    expect(
      generateSlug('တက္ကသိုလ်', {
        locale: 'my'
      })
    ).toBe('tkkthol')

    expect(
      generateSlug('သဏ္ဍာန်', {
        locale: 'my'
      })
    ).toBe('thnadan')
    expect(
      generateSlug('လိမ္မော်', {
        locale: 'my'
      })
    ).toBe('limmaw')
    expect(
      generateSlug('စက္ကူ', {
        locale: 'my'
      })
    ).toBe('skku')
    expect(
      generateSlug('ဘဏ္ဍာ', {
        locale: 'my'
      })
    ).toBe('banada')
    expect(
      generateSlug('မင်္ဂလာ', {
        locale: 'my'
      })
    ).toBe('mingla')
  })

  it('simple sentence with spaces and tone marks', () => {
    expect(
      generateSlug('မြန်မာပြည် ကို တို့ချစ်သည်၊ တို့တိုင်းတို့ပြည်', {
        locale: 'my'
      })
    ).toBe('myanmapyi-ko-tokhyaitthi-totaingtopyi')

    expect(
      generateSlug('သတ္တဝါတွေ ကျန်းမာပါစေ။', {
        locale: 'my'
      })
    ).toBe('thttwatwe-kyaanmapase')

    expect(
      generateSlug('မြန်မာ သာဓက', {
        locale: 'my'
      })
    ).toBe('myanma-thadak')
  })

  it('complex sentences with combinations of consonants, vowels and diatrics', () => {
    expect(
      generateSlug('ဘင်္ဂလား ပင်လယ်အော် တွင် ယနေ့ နေသာသည်။', {
        locale: 'my'
      })
    ).toBe('baingla-pinleaaw-twin-yne-nethathi')

    expect(
      generateSlug('ဗုဒ္ဓဘာသာ မြန်မာလူမျိုး', {
        locale: 'my'
      })
    ).toBe('buddabaatha-myanmalumyao')
  })
})
