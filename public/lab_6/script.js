// You may wish to find an effective randomizer function on MDN.
function getRandomIntInclusive(mn, mx) {
  const min = Math.ceil(mn);
  const max = Math.floor(mx);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

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
      if (document.querySelector('.flex-inner')) {
        document.querySelector('.flex-inner').remove();
      }
      const arr = range(10);
      const arrMap = arr.map(() => {
        const rand = getRandomIntInclusive(0, 243);
        return fromServer[rand];
      });

      const reverse = arrMap.sort((a, b) => sortFunction(b, a, 'name'));
      
      const ol = document.createElement('ol');
      ol.className = 'flex-inner';
      $('form').prepend(ol);

      reverse.forEach((el, i) => {
        const li = document.createElement('li');
        $(li).append(`<input type="checkbox" value=${el.code} id=${el.code} />`);
        $(li).append(`<label for=${el.code}> ${el.name} <label/>`);
        $(ol).append(li);
      });
      // console.log('fromServer', fromServer);
    })
    .catch((err) => console.log(err));
});