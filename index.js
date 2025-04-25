document.addEventListener("DOMContentLoaded", () => {
  function displayCoffeeDrinks() {
    // GET request to  API for all coffee drinks
    fetch("https://api.sampleapis.com/coffee/hot")
      .then((res) => res.json())
      .then((data) => {
        const cofeeMenuContainer = document.querySelector("#coffee-menu");
        data.forEach((coffee, index) => {
          const card = document.createElement("div");
          card.style.border = "none";
          card.classList.add("card");
          card.style.width = "18rem";
          card.style.backgroundColor = "#352b2d";
          //displaying the coffee drinks in cards
          card.innerHTML = `
            <p class="d-inline-flex gap-1">
            <button class="btn btn-dark" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="false" aria-controls="collapse${index}">
              ${coffee.title}
            </button>
          </p>
          <div class="collapse" id="collapse${index}">
            <div class="card" style="width: 18rem;">
                <img src="${coffee.image}" class="card-img-top" alt="Coffee drink">
                <div class="card-body">
                  <h5 class="card-title">${coffee.title}</h5>
                  <p class="card-text">Description: ${coffee.description}</p>
                  <p class="card-text"><b>Ingredients:</b> ${coffee.ingredients}</p>
                  <button id="order" class="btn btn-dark btn-sm" type="button">Order Now!</button>
                </div>
              </div>
          </div>
            `;
          cofeeMenuContainer.appendChild(card);

          // adding the order response when order button is pressed
          const orderButtons = document.querySelectorAll('#order');
          orderButtons.forEach((button, i) => {
              button.addEventListener('click', () => {
                
                  const p = document.createElement('p');
                  let min = Math.floor((Math.random() * 10) + 10);
                  p.textContent = `Your Order will be ready in ${min} minutes!`;
                  card.querySelector('.card-body').appendChild(p);
          })
          })

          // using a mouseover event
          orderButtons.forEach((button, i) => {
            button.addEventListener('mouseover', () => {
              button.style.backgroundColor = 'brown';
              button.style.border = '1px solid black';
            })
          })

          // using a mouseout event
          orderButtons.forEach((button, i) => {
            button.addEventListener('mouseout', () => {
              button.style.backgroundColor = '#2e282b';
            })
          })
        });
        updatePrices() // function to update prices
      }).catch((err) => {
        console.log(err);
      });

  }
  displayCoffeeDrinks();

  function searchCoffeeDrinks() {
// creating a search bar for finding coffee drinks based on their names
    fetch("https://api.sampleapis.com/coffee/hot")
      .then((res) => res.json())
      .then((data) => {
        const form = document.querySelector('#search')
        form.addEventListener('submit', (e) => {
          e.preventDefault();
        
        const input = document
          .querySelector("#search-input")
          .value.toLowerCase();
        const results = document.querySelector(".results");
        results.innerHTML = ""; // Clear previous results

        const filteredDrink = data.find(
          (coffeeDrink) => coffeeDrink.title.toLowerCase() === input
        );

        if (filteredDrink) {
          const card = document.createElement("div");
          card.style.border = "none";
          card.classList.add("card");
          card.style.width = "18rem";
          card.style.backgroundColor = "#352b2d";
          card.innerHTML = `
                <p class="d-inline-flex gap-1">
                    <button class="btn btn-dark" type="button" data-bs-toggle="collapse" data-bs-target="#collapse" aria-expanded="false" aria-controls="collapse">
                        ${filteredDrink.title}
                    </button>
                </p>
                <div class="collapse" id="collapse">
                    <div class="card" style="width: 18rem;">
                        <img src="${filteredDrink.image}" class="card-img-top" alt="Coffee drink">
                        <div class="card-body">
                            <h5 class="card-title">${filteredDrink.title}</h5>
                            <p class="card-text">Description: ${filteredDrink.description}</p>
                            <p class="card-text">Ingredients: ${filteredDrink.ingredients}</p>
                            <button class="btn btn-dark btn-sm" type="button">Order Now!</button>
                        </div>
                    </div>
                </div>
            `;
          results.appendChild(card);
        } else {
          results.innerHTML = "No matching drink found";
        }
      })
    })
    .catch((error) => {
      console.error(error);
    });

  }

  searchCoffeeDrinks();

  // update the coffee drink list prices
  function updatePrices(){
    const prices = 10.00
    const p = document.createElement('p')
    p.textContent = `Price: ${prices}`
    const cardBodies = document.querySelectorAll('.card-body');
        cardBodies.forEach(cardBody => {
            const btn = cardBody.querySelector('button');
            cardBody.insertBefore(p.cloneNode(true), btn);
        });   
  }
});
