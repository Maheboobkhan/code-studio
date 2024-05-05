document.addEventListener("DOMContentLoaded", function () {
  const cardsContainer = document.getElementById("cards-container");

  const jsonData = [
    {
      "id": 1,
      "title": "Holistic Development",
      "description": "Right Mix of Curricular and Co-Curricular Activities.",
      "colors": ["white", "#FFC758"],
      "img": "images/card1.svg"
    },
    {
      "id": 2,
      "title": "Proven and Tested Centralized Curriculum",
      "description": "CBSE school with balanced traditional & contemporary curriculum to foster growth in all its students.",
      "colors": ["#FFC758", "white", "#FFC758", "white", "white"],
      "img": "images/card2.svg"
    },
    {
      "id": 3,
      "title": "Innovative and Challenging learning Methodologies",
      "description": "Facilitate excellence through critical thinking and profound learning.",
      "colors": ["#FFC758", "white", "#FFC758", "white", "white"],
      "img": "images/card3.svg"
    },
    {
      "id": 4,
      "title": "Faculty Enrichment Program",
      "description": "Regular teacher training and curriculum workshops",
      "colors": ["#FFC758", "white", "white", "white"],
      "img": "images/card4.svg"
    }
  ];

  function createCard(data) {
    const card = document.createElement("div");
    card.classList.add("card");

    const image = document.createElement("div");
    image.classList.add("image");
    image.style.backgroundImage = `url('${data.img}')`;
    card.appendChild(image);

    const title = document.createElement("h2");
    title.classList.add("title");
    const titleWords = data.title.split(" ");
    for (let i = 0; i < titleWords.length; i++) {
      const word = titleWords[i];
      const span = document.createElement("span");
      span.textContent = word + " ";
      span.style.color = data.colors[i % data.colors.length];
      title.appendChild(span);
    }
    card.appendChild(title);

    const description = document.createElement("p");
    description.classList.add("description");
    description.textContent = data.description;
    card.appendChild(description);

    if (window.matchMedia("(min-width: 769px)").matches) {
      let isHoveringCard = false;

      card.addEventListener("mouseenter", function () {
        isHoveringCard = true;
        showDescription(card, data.title, data.description, data.colors);
      });

      card.addEventListener("mouseleave", function () {
        isHoveringCard = false;
        setTimeout(() => {
          if (!isHoveringCard) {
            hideDescription(card);
          }
        }, 400); // Delay hiding to check if the cursor is still inside

      });
    }

    else {
      let isHoveringCard = false;

      card.addEventListener("click", function () {
        if(isHoveringCard === false){
          showDescription(card, data.title, data.description, data.colors);
          isHoveringCard = true;
        }
        else{
          card.addEventListener("mouseleave", function () {
            setTimeout(() => {
              if (isHoveringCard) {
                hideDescription(card);
                isHoveringCard = false;
              }
            }, 300); // Delay hiding to check if the cursor is still inside
          });
        }
      });
    }

    cardsContainer.appendChild(card);
  }

  function showDescription(card, title, description, colors) {
    const hoveredBox = document.createElement("div");
    hoveredBox.classList.add("hovered-box");

    const titleWords = title.split(" ");
    const titleHTML = titleWords.map((word, index) => {
      const color = colors[index % colors.length]; // Loop through colors array, repeat if necessary
      return `<span style="color: ${color};">${word} </span>`;
    }).join('');

    hoveredBox.innerHTML = `<h1 style="opacity: 0;">${titleHTML}</h1><p style="opacity: 0;">${description}</p>`;
    card.appendChild(hoveredBox);

    setTimeout(() => {
      hoveredBox.querySelector("h1").style.opacity = 1;
    }, 360); // Delay of 0.5s

    setTimeout(() => {
      hoveredBox.querySelector("p").style.opacity = 1;
    }, 460); // Delay of 1s
  }

  function hideDescription(card) {
    const hoveredBox = card.querySelector(".hovered-box");
    if (hoveredBox) {
      hoveredBox.remove();
    }
  }

  jsonData.forEach(item => {
    createCard(item);
  });
});