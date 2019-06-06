import Quasar from 'quasar'

export default async () => {
  let langIso = localStorage.getItem('local_lang') || 'en-us'
  if (langIso === 'en') langIso = 'en-us'
  try {
    await import(`quasar/lang/${langIso}`)
      .then(lang => {
        Quasar.lang.set(lang.default)
      })
  } catch (err) {
    console.log(err)
  }
}
