// ** React Imports
import { useState, createContext } from 'react'

// ** Intl Provider Import
import { IntlProvider } from 'react-intl'

// ** Core Language Data
import messagesEn from '@Assets/data/locales/en.json'
import messagesDe from '@Assets/data/locales/de.json'
import messagesFr from '@Assets/data/locales/fr.json'
import messagesPt from '@Assets/data/locales/pt.json'
import messagesVi from '@Assets/data/locales/vi.json'

// ** User Language Data
import userMessagesEn from '@Assets/data/locales/en.json'
import userMessagesDe from '@Assets/data/locales/de.json'
import userMessagesFr from '@Assets/data/locales/fr.json'
import userMessagesPt from '@Assets/data/locales/pt.json'
import userMessagesVi from '@Assets/data/locales/vi.json'

// ** Menu msg obj
const menuMessages = {
  en: { ...messagesEn, ...userMessagesEn },
  de: { ...messagesDe, ...userMessagesDe },
  fr: { ...messagesFr, ...userMessagesFr },
  pt: { ...messagesPt, ...userMessagesPt },
  vi: { ...messagesVi, ...userMessagesVi }
}

// ** Create Context
const Context = createContext()

const IntlProviderWrapper = ({ children }) => {
  // ** States
  const [locale, setLocale] = useState('vi')
  const [messages, setMessages] = useState(menuMessages['vi'])

  // ** Switches Language
  const switchLanguage = lang => {
    setLocale(lang)
    setMessages(menuMessages[lang])
  }

  return (
    <Context.Provider value={{ locale, switchLanguage }}>
      <IntlProvider key={locale} locale={locale} messages={messages} defaultLocale='vi'>
        {children}
      </IntlProvider>
    </Context.Provider>
  )
}

export { IntlProviderWrapper, Context as IntlContext }
