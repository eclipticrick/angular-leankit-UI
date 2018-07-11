
export const APP_CONFIG = {

  // specify the questions and answers to be shown on the homepage (and in some of the 'help' pop-ups)
  questions: [
    {
      key: 'epic',
      question: 'Wat is een EPIC?',
      answer: 'Een samenhangend geheel van user stories wat als geheel waarde oplevert voor de business.'
    },
    {
      key: 'doing',
      question: 'Waar staat doing voor?',
      answer: 'Waar op dit moment aan gewerkt word.'
    }
  ],

  // specify the NOT-FOUND and NO-DATA messages for the application
  messages: {
    nofFound: {
      board: 'Het bord met het id {id} is niet gevonden', // unused
      card: 'De kaart met het id {id} is niet gevonden', // unused
    },
    emptyData: {
      cards: 'Er zijn geen kaarten om weer te geven', // unused
      card: {
        details: {
          title: 'Naamloze kaart', // unused
          description: 'Er is geen omschrijving bij deze kaart', // unused
          tags: 'Er zijn geen tags aan deze kaart toegewezen', // unused
          childCards: 'Deze kaart heeft geen onderliggende kaarten', // unused
          parentCards: 'Deze kaart is niet toegewezen aan een andere kaart' // unused
        },
        tasks: 'Er zijn geen taken toegewezen aan deze kaart', // unused
        comments: 'Er is geen commentaar op deze kaart', // unused
        history: 'Er is geen geschiedenis om weer te geven', // unused
        users: 'Er zijn geen gebruikers toegewezen aan deze kaart' // unused
      }
    }
  },

  // specify which boards and their columns of cards should be shown in the APP
  boards: [
    {
      board: 685758525,
      displayName: 'Tjeam Testingzz',
      epicCardType: 685909861,
      excludedCardTypes: [ 688910018 ],
      lanes: [
        {
          displayName: 'Backlog',
          link: 'backlog',
          include: [ 685920266 ],
          exclude: [ 685920267, 685920268 ]
        },
        {
          displayName: 'Mee bezig',
          link: 'doing',
          include: [ 685920274, 685920275, 685920276 ],
          exclude: []
        },
        {
          displayName: 'Klaar',
          link: 'done',
          include: [ 689096976 ],
          exclude: [ 689096974 ]
        }
      ]
    },
    {
      board: 685758526,
      displayName: 'Tjeam Netflix',
      epicCardType: 685909868,
      excludedCardTypes: [],
      lanes: [
        {
          displayName: 'Backlog',
          link: 'backlog',
          include: [ 685920277, 685934939 ],
          exclude: []
        },
        {
          displayName: 'Mee bezig',
          link: 'doing',
          include: [ 685934936, 685934944 ],
          exclude: []
        }
      ]
    }
  ]
};
