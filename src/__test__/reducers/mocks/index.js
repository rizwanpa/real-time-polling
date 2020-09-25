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

export const togglePollAnalytics = {
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
};

export const createPollDetails = {
  pollData: {
    poll: {
      id: 51,
      title: "Poll title",
      description: "Poll description",
      status: "published",
      start_date: 1601019173,
      end_date: 1601105577,
      uuid: "MSTSBg",
      user_id: 2,
      updatedAt: "2020-09-25T07:33:04.887Z",
      createdAt: "2020-09-25T07:33:04.887Z"
    },
    questions: [
      {
        id: 76,
        type: false,
        question: "question number one",
        poll_id: 51,
        updatedAt: "2020-09-25T07:33:04.899Z",
        createdAt: "2020-09-25T07:33:04.899Z",
        options: [
          {
            id: 192,
            option: "option one",
            question_id: 76,
            createdAt: "2020-09-25T07:33:04.916Z",
            updatedAt: "2020-09-25T07:33:04.916Z"
          },
          {
            id: 193,
            option: "option two",
            question_id: 76,
            createdAt: "2020-09-25T07:33:04.916Z",
            updatedAt: "2020-09-25T07:33:04.916Z"
          }
        ]
      }
    ]
  }
};

export const getPollDetails = {
  pollData: {
    id: 39,
    uuid: "a11nb8",
    title: "Poll title ",
    description: "description",
    status: "draft",
    start_date: 1600864448,
    end_date: 1600950851,
    questions: [
      {
        id: 72,
        question: "Question new ",
        type: false,
        options: [
          {
            id: 185,
            option: "new option 1"
          }
        ]
      }
    ]
  }
};

export const editPollDetails = {
  errorCode: 0,
  status: 200,
  statusText: "OK",
  data: "Record Updated successfully"
};

export const deletePollMsg = "Poll 46 deleted successfully";

//submit Poll reducers mock data 
export const initialSubmitState = {
  poll: [],
  voteDetails : {}
}
export const getSubmitPoll = {
  pollData: [
    {
      id: 32,
      title: "Funny Icebreaker",
      uuid: "GaQkVp",
      description:
        "Lighten your audience’s mood and start with a positive first impression. ",
      user_id: 2,
      status: "published",
      start_date: 1600668627,
      end_date: 1600841429,
      user_required: null,
      createdAt: "2020-09-21T06:10:58.000Z",
      updatedAt: "2020-09-21T06:10:58.000Z",
      questions: [
        {
          id: 61,
          poll_id: 32,
          question:
            "If you could have one of these superpowers, which one would you choose?",
          type: false,
          createdAt: "2020-09-21T06:10:58.000Z",
          updatedAt: "2020-09-21T06:10:58.000Z",
          options: [
            {
              id: 144,
              question_id: 61,
              option: "Be invisible whenever you want",
              createdAt: "2020-09-21T06:10:58.000Z",
              updatedAt: "2020-09-21T06:10:58.000Z"
            },
            {
              id: 145,
              question_id: 61,
              option: "Superhuman Strength",
              createdAt: "2020-09-21T06:10:58.000Z",
              updatedAt: "2020-09-21T06:10:58.000Z"
            },
            {
              id: 146,
              question_id: 61,
              option: "Talk to animals",
              createdAt: "2020-09-21T06:10:58.000Z",
              updatedAt: "2020-09-21T06:10:58.000Z"
            },
            {
              id: 147,
              question_id: 61,
              option: "Read minds",
              createdAt: "2020-09-21T06:10:58.000Z",
              updatedAt: "2020-09-21T06:10:58.000Z"
            }
          ]
        },
        {
          id: 62,
          poll_id: 32,
          question: "Which Harry Potter house do you belong in?",
          type: true,
          createdAt: "2020-09-21T06:10:58.000Z",
          updatedAt: "2020-09-21T06:10:58.000Z",
          options: [
            {
              id: 148,
              question_id: 62,
              option: "Gryffindor",
              createdAt: "2020-09-21T06:10:58.000Z",
              updatedAt: "2020-09-21T06:10:58.000Z"
            },
            {
              id: 149,
              question_id: 62,
              option: "Slytherin",
              createdAt: "2020-09-21T06:10:58.000Z",
              updatedAt: "2020-09-21T06:10:58.000Z"
            },
            {
              id: 150,
              question_id: 62,
              option: "Ravenclaw",
              createdAt: "2020-09-21T06:10:58.000Z",
              updatedAt: "2020-09-21T06:10:58.000Z"
            },
            {
              id: 151,
              question_id: 62,
              option: "Hufflepuff",
              createdAt: "2020-09-21T06:10:58.000Z",
              updatedAt: "2020-09-21T06:10:58.000Z"
            }
          ]
        }
      ]
    }
  ]
};

export const submitPollData = {
  voteDetails: {
    errorCode: 0,
    status: 200,
    statusText: "OK",
    data: {
      message: "Your response is successfully submitted."
    }
  }
};