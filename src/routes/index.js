import MovieList from 'pages/MovieList';
import MovieDetail from 'pages/MovieDetail';

export default [
  { path: '/', component: MovieList },
  { path: '/movies/:id', component: MovieDetail }
];
