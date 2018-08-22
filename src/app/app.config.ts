
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
    },
    {
      key: 'backlog',
      question: 'Waar staat backlog voor?',
      answer: 'Voor onzin.'
    }
  ],

  // // specify the NOT-FOUND and NO-DATA messages for the application
  // messages: {
  //   notFound: {
  //     board: 'Het bord met het id {id} is niet gevonden', // unused
  //     card: 'De kaart met het id {id} is niet gevonden', // unused
  //   },
  //   emptyData: {
  //     cards: 'Er zijn geen kaarten om weer te geven', // unused
  //     cardTitle: 'Naamloze kaart', // unused
  //     cardDescription: 'Er is geen omschrijving bij deze kaart', // unused
  //     cardTags: 'Er zijn geen tags aan deze kaart toegewezen', // unused
  //     cardChildCards: 'Deze kaart heeft geen onderliggende kaarten', // unused
  //     cardParentCards: 'Deze kaart is niet toegewezen aan een andere kaart', // unused
  //     cardTasks: 'Er zijn geen taken toegewezen aan deze kaart', // unused
  //     cardComments: 'Er is geen commentaar op deze kaart', // unused
  //     cardHistory: 'Er is geen geschiedenis om weer te geven', // unused
  //     cardUsers: 'Er zijn geen gebruikers toegewezen aan deze kaart' // unused
  //   }
  // },

  // specify which boards and their columns of cards should be shown in the APP
  boards: {

    // boardId:
    '656398449': {
      displayName: 'Tjeam Exp',
      epicCardTypes: [ 656511283, 679850713 ],
      excludedCardTypes: [ 666699707 ],                    // temp: mendix excluded    todo: remove comment
      excludedCards: [],
      includedLanes: {
        backlog: [
          656585578,
          656585579,
          656638600,
          692248681,
          656585580,
          656585581,
          656585582,
          692238518,
          663564621,
          663564620,
          663564619,
          663564618
        ],
        doing: [ 656585589, 657394416, 657394415 ]
      }
    },
    '663196440': {
      displayName: 'Tjeam Leerplanner',
      epicCardTypes: [ 663292245, 678980828 ],
      excludedCardTypes: [],
      excludedCards: [],
      includedLanes: {
        backlog: [
          690107618,
          690107615,
          690202469,
          690107616,
          690107619,
          690107620,
          690107621,
          690107622,
          663437831,
          676971659,
          676971660
        ],
        doing: [ 663437832, 663437834, 663437835 ]
      }
    }
  }
};
