export const initialState = {
  token: {
    token: 'EncryptedJSONWebToken',
  },
  user: {
    user: {
      email: 'test@email.com',
      fullname: 'Test Test',
      username: 'Testuser',
      answeredQuestions: {
        React: [
          { id: 1, answer: 1 },
          { id: 2, answer: 2 },
        ],
      },
      answerStat: {
        React: {
          correct: 6,
          incorrect: 3,
        },
        HTML: {
          correct: 6,
          incorrect: 3,
        },
        CSS: {
          correct: 6,
          incorrect: 3,
        },
        SCSS: {
          correct: 6,
          incorrect: 3,
        },
        JavaScript: {
          correct: 6,
          incorrect: 3,
        },
        TypeScript: {
          correct: 6,
          incorrect: 3,
        },
      },
      img: 'user.img',
      id: 1,
    },
    error: null,
    message: null,
    history: ['/home'],
    lastActivity: null,
    darkMode: false,
  },
  filters: {
    quizBanks: [],
    quizTopics: [],
    availableTopics: [],
    difficulties: {
      React: ['Beginner', 'Easy', 'Intermediate', 'Advanced'],
      Other: ['Easy', 'Medium', 'Hard'],
    },
    selectedFilters: {
      quizBank: null,
      topic: null,
      difficulty: [],
      quantity: 1,
      isCorrectlyAnswered: true,
      isIncorrectlyAnswered: true,
      isUnanswered: true,
      multiAnswer: 'all',
    },
    availableQuestionsQuantity: null,
    isAvailableQuestionsByAnswer: {
      unanswered: true,
      correct: true,
      incorrect: true,
    },
  },
  quiz: {
    quiz: {
      userId: null,
      isFinished: false,
      filters: {
        quizBank: null,
        topic: null,
        difficulty: [],
        quantity: null,
      },
      questions: [],
      submittedAnswers: [],
      correctAnswers: [],
      date: null,
    },
    currentQuestion: null,
    selectedOptions: [],
  },
  userQuizzes: {
    quizzes: [],
  },
  summary: {
    questions: [],
    correctlyAnsweredQid: [],
    incorrectlyAnsweredQid: [],
    unansweredQid: [],
    partialyAnsweredQ: [],
  },
  highlight: {
    highlight: {
      isHighlight: false,
      highlighted: [],
    },
  },
};
