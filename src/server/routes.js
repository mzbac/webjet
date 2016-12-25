import moviesRoute from './routes/movies';

const routes = (router) => {
  router.get('/movies', moviesRoute);
  return router;
};
export default routes;
