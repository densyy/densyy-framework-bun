import languageSingleton from '../config/language'
import ptBR from './pt-BR'
import enUS from './en-US'

export default {
  data: languageSingleton,
  current: () => getCurrentLanguage()
}

function getCurrentLanguage () {
  const language = languageSingleton.get()
  if (language === 'en_US') return enUS
  if (language === 'pt_BR') return ptBR
}
