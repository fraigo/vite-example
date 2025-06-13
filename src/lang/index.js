import { createI18n } from 'vue-i18n'
const messages = {
  en: { 
    Hello: 'Hello' 
  },
  es: { 
    Hello: 'Hola' 
  },
}
const i18n = createI18n({ 
    locale: 'en', 
    fallbackLocale: 'en',
    messages })
export default i18n