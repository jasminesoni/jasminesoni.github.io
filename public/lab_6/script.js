// You may wish to find an effective randomizer function on MDN.

function range(int) {
  const arr = [];
  for (let i = 0; i < int; i += 1) {
    arr.push(i);
  }
  return arr;
}

// sortFunction(b, a) <-- descending sort
function sortFunction(a, b, key) { 
  if (a[key] < b[key]) {
    return -1;
  } if (a[key] > b[key]) {
    return 1;
  }
  return 0;
}

document.body.addEventListener('submit', async (evt) => {
  evt.preventDefault(); // this stops whatever the browser wanted to do itself.
  const form = $(evt.target).serializeArray(); // here we're using jQuery to serialize the form
  fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then((fromServer) => fromServer.json()) // JSON.parse()
    .then((fromServer) => {
      // You're going to do your lab work in here. Replace this comment.
      console.log('fromServer', fromServer);
    })
    .catch((err) => console.log(err));
});