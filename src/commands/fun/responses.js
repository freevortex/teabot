import Promise from 'bluebird';

import { quotes } from '../../data';



function quote(client, evt, suffix) {
  const rand = Math.floor(Math.random() * quotes.length);
  if (suffix && suffix >= 0 && suffix <= (quotes.length - 1)) return Promise.resolve(quotes[suffix]);
  return Promise.resolve(quotes[rand]);
}

export default {
  quote
};

export const help = {
  quote: {parameters: 'number'}
};
