import MailchimpSubForm from './components/MailchimpSubForm';
import BasicForm from './components/BasicForm';
import Navigation from './components/Navigation';

export default [
  {
    path: '/mailchimp-subscribe',
    component: MailchimpSubForm,
  },
  {
    path: '/basic',
    component: BasicForm,
  },
  {
    path: '/',
    component: Navigation,
  },
];
