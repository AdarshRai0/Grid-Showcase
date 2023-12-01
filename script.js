const carousel = document.querySelector(".carousel"),
  firstImg = carousel.querySelectorAll("img")[0],
  arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false,
  isDragging = false,
  prevPageX,
  prevScrollLeft,
  positionDiff;

const showHideIcons = () => {
  // showing and hiding prev/next icon according to carousel scroll left value
  let scrollWidth = carousel.scrollWidth - carousel.clientWidth; // getting max scrollable width
  arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
  arrowIcons[1].style.display =
    carousel.scrollLeft == scrollWidth ? "none" : "block";
};

arrowIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    let firstImgWidth = firstImg.clientWidth + 14; // getting first img width & adding 14 margin value
    // if clicked icon is left, reduce width value from the carousel scroll left else add to it
    carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
    //Yeh line determine karta hai ki kaunsa arrow click hua hai (left ya right). Agar icon.id left arrow ka hai, to carousel.scrollLeft se firstImgWidth subtract kiya jaata hai, jisse carousel ki scroll position left ki taraf move hoti hai. Agar right arrow click hota hai, to firstImgWidth add kiya jaata hai, jisse carousel ki scroll position right ki taraf move hoti hai.
    setTimeout(() => showHideIcons(), 60); // calling showHideIcons after 60ms
  });
});

const autoSlide = () => {
  // if there is no image left to scroll then return from here
  if (
    carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) > -1 ||
    carousel.scrollLeft <= 0
  )
    return;

  positionDiff = Math.abs(positionDiff); // making positionDiff value to positive
  let firstImgWidth = firstImg.clientWidth + 14;
  // getting difference value that needs to add or reduce from carousel left to take middle img center
  let valDifference = firstImgWidth - positionDiff;

  if (carousel.scrollLeft > prevScrollLeft) {
    // if user is scrolling to the right
    return (carousel.scrollLeft +=
      positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff);
    //if you didnt understand terneary then see this if else this will do the same

    // if (positionDiff > firstImgWidth / 3) {
    //     carousel.scrollLeft += valDifference
    // }else{
    //     carousel.scrollLeft -= positionDiff
    // }
  }
  // if user is scrolling to the left
  carousel.scrollLeft -=
    positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
};

const dragStart = (e) => {
  // updatating global variables value on mouse down event
  isDragStart = true;
  prevPageX = e.pageX || e.touches[0].pageX;
  prevScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
  // scrolling images/carousel to left according to mouse pointer
  if (!isDragStart) return;
  e.preventDefault();
  isDragging = true;
  carousel.classList.add("dragging");
  positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
  carousel.scrollLeft = prevScrollLeft - positionDiff;
  showHideIcons();
};

const dragStop = () => {
  isDragStart = false;
  carousel.classList.remove("dragging");

  if (!isDragging) return;
  isDragging = false;
  autoSlide();
};

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart, { passive: true });

document.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging, { passive: true });

document.addEventListener("mouseup", dragStop);
carousel.addEventListener("touchend", dragStop, { passive: true });

//////////////////////////////////////////////////////////////////////////////////

// document.querySelectorAll(".carousel2").forEach((carousel2) => {
//   const items = carousel2.querySelectorAll(".carousel__item");
//   const buttonsHtml = Array.from(items, () => {
//     return `<span class="carousel__button"></span>`;
//   });

//   carousel2.insertAdjacentHTML(
//     "beforeend",
//     `
// 		<div class="carousel__nav">
// 			${buttonsHtml.join("")}
// 		</div>
// 	`
//   );

//   const buttons = carousel2.querySelectorAll(".carousel__button");

//   buttons.forEach((button, i) => {
//     button.addEventListener("click", () => {
//       changeCarouselItem(i);
//     });
//   });

//   let startX = 0;
//   let isDragging = false;

//   carousel2.addEventListener("mousedown", (e) => {
//     startX = e.clientX;
//     isDragging = true;
//   });

//   carousel2.addEventListener("mouseup", () => {
//     isDragging = false;
//   });

//   carousel2.addEventListener("mousemove", (e) => {
//     if (isDragging) {
//       const diffX = e.clientX - startX;
//       if (diffX > 50) {
//         // Dragged right, show previous item
//         const selectedItemIndex = Array.from(items).findIndex((item) =>
//           item.classList.contains("carousel__item--selected")
//         );
//         if (selectedItemIndex > 0) {
//           changeCarouselItem(selectedItemIndex - 1);
//         }
//         isDragging = false;
//       } else if (diffX < -50) {
//         // Dragged left, show next item
//         const selectedItemIndex = Array.from(items).findIndex((item) =>
//           item.classList.contains("carousel__item--selected")
//         );
//         if (selectedItemIndex < items.length - 1) {
//           changeCarouselItem(selectedItemIndex + 1);
//         }
//         isDragging = false;
//       }
//     }
//   });

//   carousel2.addEventListener("touchstart", (e) => {
//     startX = e.touches[0].clientX;
//   });

//   carousel2.addEventListener("touchmove", (e) => {
//     const diffX = e.touches[0].clientX - startX;
//     if (diffX > 50) {
//       // Swiped right, show previous item
//       const selectedItemIndex = Array.from(items).findIndex((item) =>
//         item.classList.contains("carousel__item--selected")
//       );
//       if (selectedItemIndex > 0) {
//         changeCarouselItem(selectedItemIndex - 1);
//       }
//     } else if (diffX < -50) {
//       // Swiped left, show next item
//       const selectedItemIndex = Array.from(items).findIndex((item) =>
//         item.classList.contains("carousel__item--selected")
//       );
//       if (selectedItemIndex < items.length - 1) {
//         changeCarouselItem(selectedItemIndex + 1);
//       }
//     }
//   });

//   function changeCarouselItem(index) {
//     // un-select all the items
//     items.forEach((item) => item.classList.remove("carousel__item--selected"));
//     buttons.forEach((button) =>
//       button.classList.remove("carousel__button--selected")
//     );

//     items[index].classList.add("carousel__item--selected");
//     buttons[index].classList.add("carousel__button--selected");
//   }
//   carousel2.addEventListener("mousedown", (e) => {
//     startX = e.clientX;
//     isDragging = true;
//     // Rokna yehi hai ki browser default drag action na kare
//     e.preventDefault();
//   });

//   carousel2.addEventListener("touchstart", (e) => {
//     startX = e.touches[0].clientX;
//     // Rokna yehi hai ki browser default drag action na kare
//     e.preventDefault();
//   });

// /* if you wanted to move the div using right left arrow key in keyboard then uncomment this*/

//   // document.addEventListener("keydown", (e) => {
//   //   const selectedItemIndex = Array.from(items).findIndex((item) =>
//   //     item.classList.contains("carousel__item--selected")
//   //   );

//   //   if (e.key === "ArrowLeft" && selectedItemIndex > 0) {
//   //     // Agar left arrow press kiya gaya hai aur current item index 0 se bada hai, toh previous item select karo
//   //     changeCarouselItem(selectedItemIndex - 1);
//   //   } else if (e.key === "ArrowRight" && selectedItemIndex < items.length - 1) {
//   //     // Agar right arrow press kiya gaya hai aur current item index last item se kam hai, toh next item select karo
//   //     changeCarouselItem(selectedItemIndex + 1);
//   //   }
//   // });
//   // Select the first item on page load
//   items[0].classList.add("carousel__item--selected");
//   buttons[0].classList.add("carousel__button--selected");
// });

document.querySelectorAll(".carousel2").forEach((carousel2) => {
  const items = carousel2.querySelectorAll(".carousel__item");
  const buttonsHtml = Array.from(items, () => {
    return `<span class="carousel__button"></span>`;
  });

  carousel2.insertAdjacentHTML(
    "beforeend",
    `
		<div class="carousel__nav">
			${buttonsHtml.join("")}
		</div>
	`
  );

  const buttons = carousel2.querySelectorAll(".carousel__button");

  buttons.forEach((button, i) => {
    button.addEventListener("click", () => {
      changeCarouselItem(i);
    });
  });

  let startX = 0;
  let isDragging = false;

  carousel2.addEventListener("mousedown", (e) => {
    startX = e.clientX;
    isDragging = true;
    // Rokna yehi hai ki browser default drag action na kare
    e.preventDefault();
  });

  carousel2.addEventListener(
    "touchstart",
    (e) => {
      startX = e.touches[0].clientX;
      // Rokna yehi hai ki browser default drag action na kare
      e.preventDefault();
    },
    { passive: true }
  );

  carousel2.addEventListener("mousemove", (e) => {
    if (isDragging) {
      const diffX = e.clientX - startX;
      if (diffX > 100) {
        // Dragged right, show previous item
        const selectedItemIndex = Array.from(items).findIndex((item) =>
          item.classList.contains("carousel__item--selected")
        );
        if (selectedItemIndex > 0) {
          changeCarouselItem(selectedItemIndex - 1);
        }
        isDragging = false;
      } else if (diffX < -100) {
        // Dragged left, show next item
        const selectedItemIndex = Array.from(items).findIndex((item) =>
          item.classList.contains("carousel__item--selected")
        );
        if (selectedItemIndex < items.length - 1) {
          changeCarouselItem(selectedItemIndex + 1);
        }
        isDragging = false;
      }
    }
  });

  carousel2.addEventListener(
    "touchmove",
    (e) => {
      const diffX = e.touches[0].clientX - startX;
      if (diffX > 50) {
        // Swiped right, show previous item
        const selectedItemIndex = Array.from(items).findIndex((item) =>
          item.classList.contains("carousel__item--selected")
        );
        if (selectedItemIndex > 0) {
          changeCarouselItem(selectedItemIndex - 1);
        }
      } else if (diffX < -50) {
        // Swiped left, show next item
        const selectedItemIndex = Array.from(items).findIndex((item) =>
          item.classList.contains("carousel__item--selected")
        );
        if (selectedItemIndex < items.length - 1) {
          changeCarouselItem(selectedItemIndex + 1);
        }
      }
    },
    { passive: true }
  );

  function changeCarouselItem(index) {
    // un-select all the items
    items.forEach((item) => item.classList.remove("carousel__item--selected"));
    buttons.forEach((button) =>
      button.classList.remove("carousel__button--selected")
    );

    items[index].classList.add("carousel__item--selected");
    buttons[index].classList.add("carousel__button--selected");
  }

  let isMouseDown = false;

  carousel2.addEventListener("mousedown", (e) => {
    isMouseDown = true;
    startX = e.clientX;
    carousel2.style.transition = "none"; // Disable transition while dragging
  });

  carousel2.addEventListener("mouseup", () => {
    isMouseDown = false;
    carousel2.style.transition = "transform 0.3s ease"; // Enable transition after dragging
  });

  carousel2.addEventListener("mousemove", (e) => {
    if (isMouseDown) {
      const diffX = e.clientX - startX;
      const newScrollLeft = prevScrollLeft - diffX;
      carousel2.scrollLeft = newScrollLeft;
    }
  });
  // Select the first item on page load
  items[0].classList.add("carousel__item--selected");
  buttons[0].classList.add("carousel__button--selected");
});

var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

