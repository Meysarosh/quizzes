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
  },
  questions: [],
  submittedAnswers: [],
  correctAnswers: [],
  date: 1714666494894,
  id: 1,
};
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
];
const quizzes = [];

const headers = {
  Link: 'http://localhost:4000/660/Topics?&_page=1&_limit=8>; rel="first", <http://localhost:4000/660/Topics?&_page=2&_limit=8>; rel="next", <http://localhost:4000/660/Topics?&_page=5&_limit=8>; rel="last"',
};

const headers2 = {
  Link: 'http://localhost:4000/660/Topics?&_page=1&_limit=8>; rel="first", <http://localhost:4000/660/Topics?&_page=1&_limit=8>; rel="prev", <http://localhost:4000/660/Topics?&_page=3&_limit=8>; rel="next", <http://localhost:4000/660/Topics?&_page=5&_limit=8>; rel="last"',
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
  },
  questions: [],
  submittedAnswers: [],
  correctAnswers: [],
  date: 1714666494894,
  id: 13,
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

export const handlers = [
  http.get('http://localhost:4000/structure', () => {
    return HttpResponse.json({
      React: ['React Components', 'React Basics', 'State and Props'],
      HTML: ['html'],
      JavaScript: ['Classes'],
    });
  }),
  http.get('http://localhost:4000/topics', ({ request }) => {
    if (request.url === 'http://localhost:4000/topics?&_page=1&_limit=8')
      return new HttpResponse(JSON.stringify(data), { headers });
    if (request.url === 'http://localhost:4000/topics?&_page=2&_limit=8')
      return new HttpResponse(JSON.stringify(data2), { headers: headers2 });
  }),

  http.get('http://localhost:4000/React', ({ request }) => {
    // console.log(request.url);
    if (request.url === 'http://localhost:4000/React?topic=React%20Components')
      return HttpResponse.json(questions.filter((q) => q.topic === 'React Components'));
    if (
      request.url ===
      'http://localhost:4000/React?topic=React%20Components&level=Beginner&level=Easy&level=Intermediate&level=Advanced'
    )
      return HttpResponse.json(questions.filter((q) => q.topic === 'React Components'));

    if (request.url === 'http://localhost:4000/React?&level=Easy&level=Intermediate&level=Advanced')
      return HttpResponse.json(questions.filter((q) => q.level !== 'Beginner'));

    if (request.url === 'http://localhost:4000/React?topic=React%20Basics&id_ne=1')
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

    return HttpResponse.json(questions);
  }),
  http.get('http://localhost:4000/HTML', () => {
    return HttpResponse.json(htmlQuestion);
  }),
  http.put('http://localhost:3000/users/:id', () => {
    return HttpResponse.json(user);
  }),
  http.post('http://localhost:3000/quizzes', () => {
    return HttpResponse.json(quiz);
  }),
  http.post('http://localhost:3000/login', () => {
    return HttpResponse.json({ user, accessToken: 'EncryptedJSONWebToken' });
  }),
  http.post('http://localhost:3000/users', () => {
    return HttpResponse.json({ user, accessToken: 'EncryptedJSONWebToken' });
  }),
  http.get('http://localhost:3000/quizzes', ({ request }) => {
    if (request.url === 'http://localhost:3000/quizzes?id=13') return HttpResponse.json(quiz13);
  }),
];
