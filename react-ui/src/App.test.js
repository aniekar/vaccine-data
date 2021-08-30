import { render, screen } from '@testing-library/react';
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import App from './App';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:3001',
  }),
});

test('Renders Vaccine data title text', () => {
  render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
  const titleElement = screen.getByText(/Vaccine data/);
  expect(titleElement).toBeInTheDocument();
});

test('Renders the notes on the data section', () => {
  render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
  const notesElement = screen.getByText(/Notes on the data/);
  expect(notesElement).toBeInTheDocument();
});
