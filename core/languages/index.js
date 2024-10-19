import languageSingleton from '../config/language'
import ptBR from './pt-BR'
import enUS from './en-US'

const languages = Object.freeze({
  en_US: enUS,
  pt_BR: ptBR
})

export default Object.freeze({
  data: languageSingleton,
  current: getCurrentLanguage
})

function getCurrentLanguage () {
  return languages[languageSingleton.get()] || languages.en_US
}
