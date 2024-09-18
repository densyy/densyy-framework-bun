export default class BunString {
  removeAccents (content) {
    const accents = {
      á: 'a',
      à: 'a',
      ã: 'a',
      â: 'a',
      ä: 'a',
      é: 'e',
      è: 'e',
      ê: 'e',
      ë: 'e',
      í: 'i',
      ì: 'i',
      î: 'i',
      ï: 'i',
      ó: 'o',
      ò: 'o',
      õ: 'o',
      ô: 'o',
      ö: 'o',
      ú: 'u',
      ù: 'u',
      û: 'u',
      ü: 'u',
      ç: 'c',
      ñ: 'n'
    }
    return content.split('').map(char => accents[char] || char).join('')
  }

  toSlug (content) {
    let formatedContent = content
      .toLowerCase()
      .trim()

    formatedContent = this.removeAccents(formatedContent)

    formatedContent = formatedContent
      .replace(/[^a-z0-9\s-_]/g, '')
      .replace(/\s+/g, '-')
      .replace(/_+/g, '-')
      .replace(/-+/g, '-')

    return formatedContent
  }

  capitalizeFirstLetter (content) {
    return content.charAt(0).toUpperCase() + content.slice(1).toLowerCase()
  }

  toTitleCase (content) {
    return content
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }
}
