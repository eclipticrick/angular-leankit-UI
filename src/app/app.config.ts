
export const APP_CONFIG = {

  // the URL of the backend
  nodeJsServerUrl: 'https://server.ecliptic.nl/hu/leankit/io/',

  // specify the questions and answers to be shown on the homepage (and in some of the 'help' pop-ups)
  questions: {
    'epic' : {
      question: 'Wat is een epic?',
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
    },
    'meer user stories dan de onderliggende user stories' : {
      question: 'Waarom staat er een groter aantal user stories dan de onderliggende user stories?',
      answer: `
        Het kan voorkomen dat een van de onderliggende stories ook zelf nog een onderliggende user story heeft.
        <br><br>
        "stories: 18 (20)" betekent (bijvoorbeeld) dat er 18 direct onderliggende stories zijn, waarvan er een
        nog 2 onderliggende user stories heeft.
      `
    }
  },



  // specify which boards and their columns of cards should be shown in the APP
  boards: {

    // boardId:
    '656398449': {
      displayName: 'Team Experience',
      description: `
        Team Experience houd zich bezig met Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis suscipit fermentum.
        et volutpat velit posuere non. Nullam nec metus urna. Suspendisse et tortor quis tortor pharetra pretium vitae eget ex. Aenean
        <br><br>
        id vulputate enim, nec fermentum lectus. Sed tincidunt condimentum felis. In rutrum venenatis iaculis. Phasellus molestie, sapien
        ac pharetra lobortis, enim leo pellentesque turpis, eu aliquam nulla lacus eu augue. Duis ullamcorper libero velit, eget vestibulum
        massa finibus nec. Etiam consequat ex eget lacinia aliquam. Fusce imperdiet quis arcu sed volutpat. Proin non sodales velit.
      `,
      epicCardTypes: [ 656511283, 679850713 ],
      excludedCardTypes: [ 666699707 ],
      excludedCards: [],
      includedLanes: {
        backlog: [
          656585578,
          656585579,
          711403039,
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
      displayName: 'Team Leren',
      description: `
        Team Leerplanner is een Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis suscipit fermentum. Aliquam,
        et volutpat velit posuere non. Nullam nec metus urna. Suspendisse et tortor quis tortor pharetra pretium vitae eget ex. Aenean
        <br><br>
        id vulputate enim, nec fermentum lectus. Sed tincidunt condimentum felis. In rutrum venenatis iaculis. Phasellus molestie, sapien
        ac pharetra lobortis, enim leo pellentesque turpis, eu aliquam nulla lacus eu augue. Duis ullamcorper libero velit, eget vestibulum
        massa finibus nec. Etiam consequat ex eget lacinia aliquam. Fusce imperdiet quis arcu sed volutpat. Proin non sodales velit.
      `,
      epicCardTypes: [ 663292245 ],
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
          676971660,
          663437825,
          690128983,
          690128984
        ],
        doing: [ 663437832, 663437834, 663437835, 667284637, 676971662, 676971663 ]
      }
    }
  }
};
