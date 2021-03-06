const contentStoresTLD = [
  'githubusercontent.com'
]

const contentStoresSLD = [
  '123rf.com',
  '163.com',
  '3sk.tv',
  'adobe.com',
  'amazonaws.com',
  'atlassian.net',
  'baixaki.com.br',
  'beeg.com',
  'bongacams.com',
  'chaturbate.com',
  'dailymotion.com',
  'dmm.co.jp',
  'filehippo.com',
  'freepik.com',
  'giphy.com',
  'herokuapp.com',
  'hotstar.com',
  'kissanime.to',
  'mozilla.org',
  'netflix.com',
  'pinimg.com',
  'putlockers.ch',
  'rarbg.to',
  'rutracker.org',
  'seasonvar.ru',
  'shutterstock.com',
  'softonic.com',
  'sourceforge.net',
  'thepiratebay.org',
  'trello.com',
  'tumblr.com',
  'uptodown.com',
  'wordpress.com',
  'yts.ag'
]

const regexpEscape = function (s) { return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') }

module.exports = {
  retrieve: function (cb) {
    cb(null, contentStoresSLD.concat(contentStoresTLD))
  },

  build: function (cb) {
    const transformedListTLD = contentStoresTLD.map((item) => { return `'${item}'` }).join(', ')
    var condition = `(new Set([ ${transformedListTLD} ])).has(TLD)`
    contentStoresSLD.forEach(function (SLD) {
      condition += ' || /' + regexpEscape(SLD) + '$/.test(SLD)'
    })

    const rule = {
      condition: condition,
      consequent: null,
      description: 'exclude content stores'
    }
    cb(null, rule)
  }
}
