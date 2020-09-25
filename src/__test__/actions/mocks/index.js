export const jwtUserToken = {
  exp: 1601024101,
  iat: 1600937701,
  id: 2,
  name: "Admin"
};

export const createPollData = {
  poll: {
    id: 49,
    title: "Poll Title",
    description: "Poll Description",
    status: "published",
    start_date: 1601014196,
    end_date: 1601100599,
    uuid: "yukP9g",
    user_id: 2,
    updatedAt: "2020-09-25T06:10:06.205Z",
    createdAt: "2020-09-25T06:10:06.205Z"
  },
  questions: [
    {
      id: 74,
      type: false,
      question: "question one",
      poll_id: 49,
      updatedAt: "2020-09-25T06:10:06.223Z",
      createdAt: "2020-09-25T06:10:06.223Z",
      options: [
        {
          id: 188,
          option: "option one",
          question_id: 74,
          createdAt: "2020-09-25T06:10:06.233Z",
          updatedAt: "2020-09-25T06:10:06.233Z"
        },
        {
          id: 189,
          option: "option two",
          question_id: 74,
          createdAt: "2020-09-25T06:10:06.233Z",
          updatedAt: "2020-09-25T06:10:06.233Z"
        }
      ]
    }
  ]
};

export const getPollData = {
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
        },
        {
          id: 186,
          option: "new option 2"
        }
      ]
    }
  ]
};
export const getPollAnalyticData = [
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
            color: "#1c7dc7"
          },
          {
            id: 145,
            option: "Superhuman Strength",
            percentage: 31,
            color: "#7242f7"
          },
          {
            id: 146,
            option: "Talk to animals",
            percentage: 25,
            color: "#745391"
          },
          {
            id: 147,
            option: "Read minds",
            percentage: 0,
            color: "#5fdce2"
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
            color: "#39abd8"
          },
          {
            id: 149,
            option: "Slytherin",
            percentage: 31,
            color: "#52a46b"
          },
          {
            id: 150,
            option: "Ravenclaw",
            percentage: 20,
            color: "#e9add0"
          },
          {
            id: 151,
            option: "Hufflepuff",
            percentage: 20,
            color: "#ca071f"
          }
        ]
      }
    ]
  },
  {
    id: 38,
    uuid: "YdfJIF",
    title: "Updated poll title changed",
    description: "Student favourite subject polling",
    status: "published",
    questions: [
      {
        id: 68,
        question: "its working Your favourite subject",
        options: [
          {
            id: 162,
            option: "updated Maths",
            percentage: 0,
            color: "#1e4845"
          },
          {
            id: 163,
            option: "Update History",
            percentage: 0,
            color: "#5c00ed"
          },
          {
            id: 164,
            option: "option3",
            percentage: 0,
            color: "#89b862"
          },
          {
            id: 165,
            option: "adding new option 444",
            percentage: 0,
            color: "#91251c"
          },
          {
            id: 168,
            option: "added option from UI",
            percentage: 0,
            color: "#b57c95"
          },
          {
            id: 173,
            option: "added option from UI",
            percentage: 0,
            color: "#4d5113"
          },
          {
            id: 174,
            option: "One more adding",
            percentage: 0,
            color: "#62d7fe"
          }
        ]
      },
      {
        id: 69,
        question: "Question 2 added UI",
        options: [
          {
            id: 179,
            option: "option 1 UI",
            percentage: 0,
            color: "#488dcc"
          },
          {
            id: 180,
            option: "option 2 UI",
            percentage: 0,
            color: "#8a43ea"
          }
        ]
      }
    ]
  }
];

export const deletePoll = "Poll 47 deleted successfully";

export const editPollSuccess = {
  errorCode: 0,
  status: 200,
  statusText: "OK",
  data: "Record Updated successfully"
};

export const deleteOPtion = {
  errorCode: 0,
  status: 200,
  statusText: "OK",
  data: "Option 186 deleted successfully"
};

export const deleteQuestion = {
  errorCode: 0,
  status: 200,
  statusText: "OK",
  data: "Option 38 deleted successfully"
};
