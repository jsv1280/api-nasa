
// CONSUMIR LA API

fetch('http://localhost:7777/api/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify({query: "{ getNeos { _id } }"})
})
  .then(r => r.json())
  .then(data => console.log('data returned:', data));
