import express, { Request, Response } from 'express';

interface Book {
  title: string;
  author: string;
}

interface User {
  id: string;
  name: string;
  favoriteBooks: Book[];
  currentReadings: Book[];
  booksToRead: Book[];
}

const app = express();
app.use(express.json());

let users: User[] = [];

// Rota de novo usuário
app.post('/users', (req: Request, res: Response) => {
  const { id, name } = req.body;
  const newUser: User = {
    id,
    name,
    favoriteBooks: [],
    currentReadings: [],
    booksToRead: []
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Rota de adicionar um livro fav
app.post('/users/:id/favoriteBooks', (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, author } = req.body;

  const user = users.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const newBook: Book = {
    title,
    author
  };

  user.favoriteBooks.push(newBook);
  res.status(201).json(newBook);
});

// Rota de adicionar uma leitura atual
app.post('/users/:id/currentReadings', (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, author } = req.body;

  const user = users.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const newBook: Book = {
    title,
    author
  };

  user.currentReadings.push(newBook);
  res.status(201).json(newBook);
});

// Rota de wish list
app.post('/users/:id/booksToRead', (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, author } = req.body;

  const user = users.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const newBook: Book = {
    title,
    author
  };

  user.booksToRead.push(newBook);
  res.status(201).json(newBook);
});

// Rota de obter os dados
app.get('/users/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const user = users.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

// Rota de listar usuários
app.get('/users', (_req: Request, res: Response) => {
  res.json(users);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
