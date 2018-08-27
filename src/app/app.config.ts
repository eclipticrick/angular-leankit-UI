
export const APP_CONFIG = {

  // specify the questions and answers to be shown on the homepage (and in some of the 'help' pop-ups)
  questions: {
    'epic' : {
      question: 'Wat is een EPIC?',
      answer: `
        Een epic is een samenhangend geheel van user stories wat als geheel waarde oplevert voor de business.
        <br><br>
        Een epic is zelf ook een user story, maar heeft vaak meerdere onderliggende user stories & taken.
      `
    },
    'story' : {
      question: 'Wat is een user story?',
      answer: `
        Een user story is een korte beschrijving (story) van wat een gebruiker (user) wil.
      `
    },
    'doing' : {
      question: 'Waar staat doing voor?',
      answer: `
        Doing is de cateorie met user stories waar op dit moment aan gewerkt word.
      `
    },
    'backlog' : {
      question: 'Waar staat backlog voor?',
      answer: `
        Backlog is de cateorie met user stories die uitgevoerd moeten worden tijdens de ontwikkeling van het product.
      `
    },
    'onderliggende user story' : {
      question: 'Wat is een onderliggende user story?',
      answer: `
        Een onderliggende user story komt vaak voor bij een epic user story. Het kan gezien worden als een deel-taak van de epic.
      `
    }
  },

  // specify which boards and their columns of cards should be shown in the APP
  boards: {

    // boardId:
    '656398449': {
      displayName: 'Tjeam Exp',
      epicCardTypes: [ 656511283, 679850713 ],
      excludedCardTypes: [ 666699707 ],
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
