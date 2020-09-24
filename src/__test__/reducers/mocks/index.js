export const initialState = {
  username: null,
  id: "",
  errors: {}
};

export const userDetails = {
  exp: 1601013623,
  iat: 1600927223,
  id: 2,
  name: "Admin"
};

export const dashboard_initialState = {
  polls: [],
  pollsAnalytics: [],
  deletedPollId: "",
  editPoll: [],
  editDetails: {}
};

export const dashboard_pollAnalytics = [
  {
    id: 32,
    uuid: "GaQkVp",
    title: "Funny Icebreaker",
    description:
      "Lighten your audience’s mood and start with a positive first impression. ",
    status: "published",
    questions: [
      {
        id: 61,
        question:
          "If you could have one of these superpowers, which one would you choose?",
        options: [
          {
            id: 144,
            option: "Be invisible whenever you want",
            percentage: 44,
            color: "#b12858"
          },
          {
            id: 145,
            option: "Superhuman Strength",
            percentage: 31,
            color: "#7bf5d"
          },
          {
            id: 146,
            option: "Talk to animals",
            percentage: 25,
            color: "#6e1a4f"
          },
          {
            id: 147,
            option: "Read minds",
            percentage: 0,
            color: "#f1dbcd"
          }
        ]
      },
      {
        id: 62,
        question: "Which Harry Potter house do you belong in?",
        options: [
          {
            id: 148,
            option: "Gryffindor",
            percentage: 29,
            color: "#88d3dd"
          },
          {
            id: 149,
            option: "Slytherin",
            percentage: 31,
            color: "#922ec3"
          },
          {
            id: 150,
            option: "Ravenclaw",
            percentage: 20,
            color: "#b751fb"
          },
          {
            id: 151,
            option: "Hufflepuff",
            percentage: 20,
            color: "#3b4643"
          }
        ]
      }
    ]
  }
];

export const togglePollAnalytics =
  {
    id: 32,
    uuid: "GaQkVp",
    title: "Funny Icebreaker",
    description:
      "Lighten your audience’s mood and start with a positive first impression. ",
    status: "published",
    questions: [
      {
        id: 61,
        question:
          "If you could have one of these superpowers, which one would you choose?",
        options: [
          {
            id: 144,
            option: "Be invisible whenever you want",
            percentage: 44,
            color: "#4a654b"
          },
          {
            id: 145,
            option: "Superhuman Strength",
            percentage: 31,
            color: "#b750dd"
          },
          {
            id: 146,
            option: "Talk to animals",
            percentage: 25,
            color: "#d3f930"
          },
          {
            id: 147,
            option: "Read minds",
            percentage: 0,
            color: "#f7af73"
          }
        ]
      },
      {
        id: 62,
        question: "Which Harry Potter house do you belong in?",
        options: [
          {
            id: 148,
            option: "Gryffindor",
            percentage: 29,
            color: "#f84381"
          },
          {
            id: 149,
            option: "Slytherin",
            percentage: 31,
            color: "#a216fa"
          },
          {
            id: 150,
            option: "Ravenclaw",
            percentage: 20,
            color: "#64fcc1"
          },
          {
            id: 151,
            option: "Hufflepuff",
            percentage: 20,
            color: "#21c7fc"
          }
        ]
      }
    ],
    expanded: true
  }