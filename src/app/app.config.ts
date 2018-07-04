// enter the API ID's for configuration
export const APP_CONFIG = {
  // specify which boards to show in the APP
  boards: [
    685758525,
    685758526
  ],

  // specify which columns of cards should be shown in the APP
  cards: [
    {
      forBoard: 685758525,
      excludeCardType: [688910018],
      lanes: [
        {
          name: 'backlog',
          include: [685920266],
          exclude: [685920267, 685920268]
        },
        {
          name: 'sprint backlog',
          include: [],
          exclude: [],
          excludeCardType: []
        },
        {
          name: 'doing',
          include: [685920274, 685920275, 685920276],
          exclude: []
        },
        {
          name: 'done',
          include: [689096976],
          exclude: [689096974]
        }
      ]
    }
  ]
};
