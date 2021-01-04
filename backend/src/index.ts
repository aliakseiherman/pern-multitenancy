import App from './app';
import AccountRouter from './routers/account.router';
import CarBrandRouter from './routers/car-brand.router';
import SessionRouter from './routers/session.router';

const app = new App([new AccountRouter(), new SessionRouter(), new CarBrandRouter()]);

app.init().then(() => {
  app.listen();
});