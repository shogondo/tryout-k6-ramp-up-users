import exec from 'k6/execution';
import http from 'k6/http'
import { sleep } from 'k6';
import { SharedArray } from 'k6/data';

const TARGET = '<URL>';

const users = new SharedArray('users', () => {
  return open('./users.csv').split('\n').filter((o) => !!o).map((o) => o.split(','));
});

export const options = {
  executor: 'shared-iterations',
  stages: [
    { duration: '5m', target: users.length },
    { duration: '3m', target: users.length },
    { duration: '1m', target: 0 },
  ],
}

export default function () {
  const user = users[exec.vu.idInTest - 1];
  scenario_1(user);
}

function scenario_1(user) {
  http.get(`${TARGET}?user=${user}`);
  sleep(60);
}
