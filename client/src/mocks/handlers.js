import { http, HttpResponse } from 'msw';

const questions = [
  {
    id: 1,
    topic: 'React Basics',
    level: 'Beginner',
    question: 'What is React?',
    answers: {
      1: {
        text: 'A JavaScript library for building user interfaces',
        correct: true,
      },
      2: {
        text: 'A programming language',
      },
      3: {
        text: 'A database management system',
      },
    },
    correct_answer: 1,
  },
  {
    id: 2,
    topic: 'React Components',
    level: 'Intermediate',
    question: 'What are React components?',
    answers: {
      1: {
        text: 'Reusable pieces of UI',
        correct: true,
      },
      2: {
        text: 'HTML elements',
      },
      3: {
        text: 'JavaScript functions',
      },
    },
    correct_answer: 1,
  },
  {
    id: 3,
    topic: 'State and Props',
    level: 'Intermediate',
    question: 'What is the difference between state and props in React?',
    answers: {
      1: {
        text: 'State is mutable and controlled by the component itself, whereas props are immutable and controlled by parent components',
        correct: true,
      },
      2: {
        text: 'State and props are the same thing',
      },
      3: {
        text: 'Props are mutable and controlled by the component itself, whereas state is immutable and controlled by parent components',
      },
    },
    correct_answer: 1,
  },

  {
    id: 4,
    topic: 'Test topic 4',
    level: 'Intermediate',
  },
  {
    id: 5,
    topic: 'Test topic 5',
    level: 'Intermediate',
  },
  {
    id: 6,
    topic: 'Test topic 6',
    level: 'Intermediate',
  },
  {
    id: 7,
    topic: 'Test topic 7',
    level: 'Intermediate',
  },
  {
    id: 8,
    topic: 'Test topic 8',
    level: 'Intermediate',
  },
  {
    id: 9,
    topic: 'Test topic 9',
    level: 'Intermediate',
  },
];

const questionMulti = {
  id: 433,
  topic: 'React Components',
  level: 'Easy',
  question: 'Which of the following is true about useState?',
  answers: {
    1: { text: 'It returns an array with two elements' },
    2: { text: 'The first element is the current state' },
    3: { text: 'The second element is a function to update the state' },
    4: { text: 'It can only be used in class components' },
  },
  correct_answer: [1, 2, 3],
  isMulti: true,
};

const user = {
  email: 'test@email.com',
  fullname: 'Test Test',
  username: 'Testuser',
  quizzes: {
    finished: [],
    unfinished: [],
    answeredQuestions: {
      React: [
        { id: 1, answer: 1 },
        { id: 2, answer: 2 },
      ],
    },
  },
  id: 1,
};

const quiz = {
  userId: 1,
  isFinished: false,
  filters: {
    quizBank: 'React',
    topic: 'React Components',
    difficulty: [],
    quantity: 6,
    isCorrectlyAnswered: true,
    isIncorrectlyAnswered: true,
    isUnanswered: true,
    multiAnswer: 'all',
  },
  questions: [49],
  submittedAnswers: [],
  correctAnswers: [],
  date: 1714666494894,
  id: 1,
};

const quiz1 = {
  userId: 1,
  isFinished: true,
  filters: {
    quizBank: 'React',
    topic: 'React Basics',
    difficulty: [],
    quantity: 2,
    isCorrectlyAnswered: true,
    isIncorrectlyAnswered: true,
    isUnanswered: true,
    multiAnswer: 'all',
  },
  questions: [1, 49],
  submittedAnswers: [1, 2],
  correctAnswers: [1, 1],
  date: 1716980237670,
  id: 1,
};

const quiz2 = {
  userId: 1,
  isFinished: true,
  filters: {
    quizBank: 'React',
    topic: 'React Router',
    difficulty: ['Beginner', 'Easy', 'Intermediate', 'Advanced'],
    quantity: 3,
    isCorrectlyAnswered: true,
    isIncorrectlyAnswered: true,
    isUnanswered: true,
    multiAnswer: 'multi',
  },
  questions: [400, 403, 406],
  submittedAnswers: [[1, 3], [1, 3], [2]],
  correctAnswers: [
    [1, 3],
    [1, 2],
    [1, 3],
  ],
  date: 1716991897726,
  id: 2,
};

const quiz13 = {
  userId: 1,
  isFinished: false,
  filters: {
    quizBank: 'React',
    topic: 'React Components',
    difficulty: [],
    quantity: 6,
    isCorrectlyAnswered: true,
    isIncorrectlyAnswered: true,
    isUnanswered: true,
    multiAnswer: 'all',
  },
  questions: [2],
  submittedAnswers: [],
  correctAnswers: [],
  date: 1714666494894,
  id: 13,
};

const questionsForQuiz1 = [
  {
    id: 1,
    topic: 'React Basics',
    level: 'Beginner',
    question: 'What is React?',
    answers: {
      1: {
        text: 'A JavaScript library for building user interfaces',
        correct: true,
      },
      2: {
        text: 'A programming language',
      },
      3: {
        text: 'A database management system',
      },
    },
    correct_answer: 1,
  },
  {
    id: 49,
    topic: 'React Basics',
    level: 'Easy',
    question: 'What is React?',
    answers: {
      1: {
        text: 'React is a JavaScript library for building user interfaces.',
        correct: true,
      },
      2: {
        text: 'React is a programming language.',
      },
      3: {
        text: 'React is a server-side rendering framework.',
      },
    },
    correct_answer: 1,
  },
];

const questionsForQuiz2 = [
  {
    id: 400,
    topic: 'React Router',
    level: 'Easy',
    question: 'Which of the following hooks are used for navigation in React Router?',
    answers: {
      1: {
        text: 'useHistory',
      },
      2: {
        text: 'useLocation',
      },
      3: {
        text: 'useNavigate',
      },
      4: {
        text: 'useRouteMatch',
      },
    },
    correct_answer: [1, 3],
    isMulti: true,
  },
  {
    id: 403,
    topic: 'React Router',
    level: 'Intermediate',
    question: 'Which hooks can be used to access route parameters in React Router?',
    answers: {
      1: {
        text: 'useParams',
      },
      2: {
        text: 'useRouteMatch',
      },
      3: {
        text: 'useLocation2',
      },
    },
    correct_answer: [1, 2],
    isMulti: true,
  },
  {
    id: 406,
    topic: 'React Router',
    level: 'Advanced',
    question:
      'Which of the following hooks would you use to get the current URL path in a React Router application?',
    answers: {
      1: {
        text: 'useRouteMatch2',
      },
      2: {
        text: 'useParams',
      },
      3: {
        text: 'useLocation',
      },
    },
    correct_answer: [1, 3],
    isMulti: true,
  },
];

const htmlQuestion = [
  {
    id: 77,
    topic: 'HTML Basics',
    level: 'Easy',
    question: 'What does HTML stand for?',
    answers: {
      1: {
        text: 'Hypertext Markup Language',
        correct: true,
      },
      2: {
        text: 'Hyperlink and Text Markup Language',
      },
      3: {
        text: 'High Text Markup Language',
      },
    },
    correct_answer: 1,
  },
  {
    id: 78,
    topic: 'HTML',
    level: 'Medium',
    question: 'What is the purpose of the <div> element in HTML?',
    answers: {
      1: {
        text: 'To group and style content.',
        correct: true,
      },
      2: {
        text: 'To create links to other documents.',
      },
      3: {
        text: 'To define a list of items.',
      },
    },
    correct_answer: 1,
  },
];

const headers = {
  Link: 'http://localhost:4000/660/Topics?&_page=1&_limit=8>; rel="first", <http://localhost:4000/660/Topics?&_page=2&_limit=8>; rel="next", <http://localhost:4000/660/Topics?&_page=5&_limit=8>; rel="last"',
};

const headers2 = {
  Link: 'http://localhost:4000/660/Topics?&_page=1&_limit=8>; rel="first", <http://localhost:4000/660/Topics?&_page=1&_limit=8>; rel="prev", <http://localhost:4000/660/Topics?&_page=3&_limit=8>; rel="next", <http://localhost:4000/660/Topics?&_page=5&_limit=8>; rel="last"',
};

const data = [
  { topic: 'React Basics', title: 'React' },
  { topic: 'React Components', title: 'React' },
  { topic: 'State and Props', title: 'React' },
  { topic: 'html', title: 'HTML' },
  { topic: 'Classes', title: 'JavaScript' },
  { topic: 'React Lifecycle Methods', title: 'React' },
  { topic: 'React Hooks', title: 'React' },
  { topic: 'React Router', title: 'React' },
];

const data2 = [
  { topic: 'React Testing', title: 'React' },
  { topic: 'React PropTypes', title: 'React' },
  { topic: 'React Error Boundaries', title: 'React' },
  { topic: 'React Lifecycle', title: 'React' },
  { topic: 'React State Management', title: 'React' },
  { topic: 'React Server-Side Rendering', title: 'React' },
  { topic: 'React Forms', title: 'React' },
  { topic: 'React Higher-Order Components (HOC)', title: 'React' },
];

const user1quizzes = [
  {
    userId: 1,
    isFinished: true,
    filters: {
      quizBank: 'React',
      topic: 'React Basics',
      difficulty: [],
      quantity: 2,
      isCorrectlyAnswered: true,
      isIncorrectlyAnswered: true,
      isUnanswered: true,
      multiAnswer: 'all',
    },
    questions: [1, 49],
    submittedAnswers: [1, 1],
    correctAnswers: [1, 1],
    date: 1716980237670,
    id: 1,
  },
  {
    userId: 1,
    isFinished: true,
    filters: {
      quizBank: 'React',
      topic: 'React Basics',
      difficulty: [],
      quantity: 2,
      isCorrectlyAnswered: true,
      isIncorrectlyAnswered: true,
      isUnanswered: true,
      multiAnswer: 'all',
    },
    questions: [1, 49],
    submittedAnswers: [1, 2],
    correctAnswers: [1, 1],
    date: 1716987340621,
    id: 2,
  },
  {
    userId: 1,
    isFinished: false,
    filters: {
      quizBank: 'React',
      topic: 'React Basics',
      difficulty: [],
      quantity: 1,
      isCorrectlyAnswered: true,
      isIncorrectlyAnswered: true,
      isUnanswered: true,
      multiAnswer: 'all',
    },
    questions: [49],
    submittedAnswers: [null],
    correctAnswers: [1],
    date: 1716987359999,
    id: 3,
  },
];

export const handlers = [
  http.get('http://localhost:4000/structure', () => {
    return HttpResponse.json({
      React: ['React Components', 'React Basics', 'State and Props'],
      HTML: ['html'],
      CSS: ['css'],
      JavaScript: ['Classes'],
    });
  }),
  http.get('http://localhost:4000/topics', ({ request }) => {
    if (request.url === 'http://localhost:4000/topics?&_page=1&_limit=8')
      return new HttpResponse(JSON.stringify(data), { headers });
    if (request.url === 'http://localhost:4000/topics?&_page=2&_limit=8')
      return new HttpResponse(JSON.stringify(data2), { headers: headers2 });
    if (request.url === 'http://localhost:4000/topics?&_page=3&_limit=8')
      return new HttpResponse(JSON.stringify(null), {
        status: 400,
        statusText: 'An error occured!',
      });
  }),

  http.get('http://localhost:4000/CSS', ({ request }) => {
    if (request.url === 'http://localhost:4000/CSS?topic=CSS&_limit=1')
      return HttpResponse.networkError();

    if (request.url === 'http://localhost:4000/CSS?&level=Easy&level=Medium&level=Hard')
      return new HttpResponse('jwt expired', { status: 400 });
  }),

  http.get('http://localhost:4000/React', ({ request }) => {
    if (request.url === 'http://localhost:4000/React?&id=1&id=49')
      return HttpResponse.json(questionsForQuiz1);

    if (request.url === 'http://localhost:4000/React?&id=400&id=403&id=406')
      return HttpResponse.json(questionsForQuiz2);

    if (request.url === 'http://localhost:4000/React?topic=React%20Components')
      return HttpResponse.json(questions.filter((q) => q.topic === 'React Components'));

    if (
      request.url ===
      'http://localhost:4000/React?topic=React%20Components&level=Beginner&level=Easy&level=Intermediate&level=Advanced'
    )
      return HttpResponse.json(questions.filter((q) => q.topic === 'React Components'));

    if (request.url === 'http://localhost:4000/React?&level=Easy&level=Intermediate&level=Advanced')
      return HttpResponse.json(questions.filter((q) => q.level !== 'Beginner'));

    if (
      request.url ===
      'http://localhost:4000/React?topic=React%20Basics&correct_answer=1&correct_answer=2&correct_answer=3&id_ne=1&_limit=1'
    )
      return HttpResponse.json([
        {
          id: 49,
          topic: 'React Basics',
          level: 'Easy',
          question: 'What is React?',
          answers: {
            1: {
              text: 'React is a JavaScript library for building user interfaces.',
              correct: true,
            },
            2: {
              text: 'React is a programming language.',
            },
            3: {
              text: 'React is a server-side rendering framework.',
            },
          },
          correct_answer: 1,
        },
      ]);

    if (
      request.url ===
      'http://localhost:4000/React?topic=React%20Basics&correct_answer=1&correct_answer=2&correct_answer=3&id_ne=1&id_ne=49&_limit=1'
    )
      return new HttpResponse('An error occured!', { status: 400 });

    if (
      request.url ===
      'http://localhost:4000/React?topic=React%20Basics&isMulti=true&id_ne=1&id_ne=2&_limit=1'
    )
      return HttpResponse.json([questionMulti]);

    return HttpResponse.json(questions);
  }),

  http.get('http://localhost:4000/HTML', ({ request }) => {
    if (
      request.url ===
      'http://localhost:4000/HTML?topic=HTML&level=Easy&level=Medium&level=Hard&id_ne=77&_limit=1'
    )
      return HttpResponse.json([htmlQuestion[1]]);

    return HttpResponse.json(htmlQuestion);
  }),

  http.put('http://localhost:3000/quizzes/:id', () => {
    return HttpResponse.json(quiz);
  }),

  http.post('http://localhost:3000/quizzes', async ({ request }) => {
    const newQuiz = await request.json();
    if (newQuiz.filters.topic === 'React Components')
      return new HttpResponse('jwt expired', { status: 400 });

    if (newQuiz.questions.length === 2) return HttpResponse.json(quiz1);

    return HttpResponse.json(quiz);
  }),

  http.get('http://localhost:3000/quizzes', ({ request }) => {
    if (request.url === 'http://localhost:3000/quizzes?id=1') return HttpResponse.json([quiz1]);
    if (request.url === 'http://localhost:3000/quizzes?id=2') return HttpResponse.json([quiz2]);
    if (request.url === 'http://localhost:3000/quizzes?id=13') return HttpResponse.json([quiz13]);
    if (request.url === 'http://localhost:3000/quizzes?id=14')
      return new HttpResponse('An error occured!', { status: 400 });
    if (request.url === 'http://localhost:3000/quizzes?userId=1')
      return HttpResponse.json([...user1quizzes]);
    if (request.url === 'http://localhost:3000/quizzes?userId=2')
      return new HttpResponse('An error occured!', { status: 400 });
  }),

  http.post('http://localhost:3000/login', async ({ request }) => {
    const body = await request.json();
    if (body.password === 'error') return new HttpResponse('An error occured!', { status: 400 });

    return HttpResponse.json({ user, accessToken: 'EncryptedJSONWebToken' });
  }),

  http.post('http://localhost:3000/users', async ({ request }) => {
    const newUser = await request.json();
    if (newUser.username === 'Error') return new HttpResponse('An error occured!', { status: 400 });

    return HttpResponse.json({ user, accessToken: 'EncryptedJSONWebToken' });
  }),

  http.put('http://localhost:3000/users/:id', async ({ request }) => {
    const updateUser = await request.json();

    if (updateUser.password === 'Wrongpassword-400')
      return new HttpResponse('incorrect password', { status: 400 });

    return HttpResponse.json(user);
  }),
];
