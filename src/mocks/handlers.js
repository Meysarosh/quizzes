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

export const handlers = [
  http.get('http://localhost:4000/structure', () => {
    return HttpResponse.json({
      React: ['React Components', 'React Basics', 'State and Props'],
      HTML: ['html'],
      JavaScript: ['Classes'],
    });
  }),
  http.get('http://localhost:4000/React', ({ request }) => {
    // console.log(request.url);
    if (
      request.url ===
      'http://localhost:4000/React?topic=React%20Components&level=Beginner&level=Easy&level=Intermediate&level=Advanced'
    )
      return HttpResponse.json(questions.filter((q) => q.topic === 'React Components'));

    if (request.url === 'http://localhost:4000/React?&level=Easy&level=Intermediate&level=Advanced')
      return HttpResponse.json(questions.filter((q) => q.level !== 'Beginner'));
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
  http.get('http://localhost:3000/quizzes', () => {
    return HttpResponse.json(quizzes);
  }),
];
