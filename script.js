/* =========================================================
   ANNIVERSARY WEBSITE
   SIMPLE PHOTO VERSION
   NO PUZZLE
   ========================================================= */


/* =========================================================
   MUSIC
   ========================================================= */

const song =
  document.getElementById("song");

const musicToggle =
  document.getElementById("musicToggle");

let musicStarted = false;


function startMusic() {

  if (!song || musicStarted) {
    return;
  }

  song.volume = 0.45;

  song.play()
    .then(() => {

      musicStarted = true;

      if (musicToggle) {
        musicToggle.textContent = "❚❚";
      }

      const musicCard =
        document.querySelector(".music-card");

      if (musicCard) {
        musicCard.classList.add("playing");
      }

    })
    .catch(() => {});

}


/* Start music after first interaction */

document.addEventListener("click", (event) => {

  /*
   * IMPORTANT:
   * If the first interaction is the gift button,
   * do NOT start Sparks.
   */
  if (event.target.closest("#giftButton")) {
    return;
  }

  startMusic();

}, { once: true });


/* Play / pause button */

if (musicToggle && song) {

  musicToggle.addEventListener(
    "click",
    (event) => {

      event.stopPropagation();

      if (song.paused) {

        song.play()
          .then(() => {

            musicStarted = true;

            musicToggle.textContent =
              "❚❚";

            const musicCard =
              document.querySelector(
                ".music-card"
              );

            if (musicCard) {
              musicCard.classList.add(
                "playing"
              );
            }

          })
          .catch(() => {});

      } else {

        song.pause();

        musicToggle.textContent =
          "▶";

        const musicCard =
          document.querySelector(
            ".music-card"
          );

        if (musicCard) {
          musicCard.classList.remove(
            "playing"
          );
        }

      }

    }
  );


  song.addEventListener(
    "play",
    () => {

      musicToggle.textContent =
        "❚❚";

      const musicCard =
        document.querySelector(
          ".music-card"
        );

      if (musicCard) {
        musicCard.classList.add(
          "playing"
        );
      }

    }
  );


  song.addEventListener(
    "pause",
    () => {

      musicToggle.textContent =
        "▶";

      const musicCard =
        document.querySelector(
          ".music-card"
        );

      if (musicCard) {
        musicCard.classList.remove(
          "playing"
        );
      }

    }
  );

}

/* =========================================================
   ANNIVERSARY GIFT VIDEO
   ========================================================= */

const giftButton =
  document.getElementById("giftButton");

const giftInstruction =
  document.getElementById("giftInstruction");

const giftVideoWrapper =
  document.getElementById("giftVideoWrapper");

const anniVid =
  document.getElementById("anniVid");


if (giftButton) {

  giftButton.addEventListener("click", async (event) => {

    event.preventDefault();
    event.stopPropagation();

    console.log("🎁 GIFT CLICKED");

    /* -----------------------------------------
       TAP TAP EFFECT
       ----------------------------------------- */

    const tap = document.createElement("div");

    tap.className = "memory-tap";

    tap.textContent = "tap tap! ♡";

    tap.style.left =
      `${event.clientX}px`;

    tap.style.top =
      `${event.clientY}px`;

    document.body.appendChild(tap);

    setTimeout(() => {
      tap.remove();
    }, 1000);
    /* -----------------------------------------
       STOP SPARKS COMPLETELY
       ----------------------------------------- */

    if (song) {

      song.pause();

      /*
       * Reset Sparks so it cannot resume
       * from the previous playback position.
       */
      song.currentTime = 0;
    }


    /* -----------------------------------------
       UPDATE MUSIC BUTTON
       ----------------------------------------- */

    if (musicToggle) {
      musicToggle.textContent = "▶";
    }


    /* -----------------------------------------
       OPEN GIFT
       ----------------------------------------- */

    giftButton.classList.add("opened");


    if (giftInstruction) {
      giftInstruction.classList.add("opened");
    }


    /* -----------------------------------------
       SHOW VIDEO
       ----------------------------------------- */

    if (giftVideoWrapper) {

      giftVideoWrapper.classList.add("show");

      console.log("🎬 Video wrapper shown");
    }


    /* -----------------------------------------
       START VIDEO
       ----------------------------------------- */

    if (anniVid) {

      /*
       * Make sure the video itself is audible.
       */
      anniVid.muted = false;

      anniVid.volume = 1;

      anniVid.currentTime = 0;

      try {

        await anniVid.play();

        console.log("🎬 Anniversary video started");
        console.log("🔊 Video audio playing");

      } catch (error) {

        console.error(
          "❌ Video playback failed:",
          error
        );

      }

    }

  });

}

/* =========================================================
   KISS BUTTON
   KISSES SPRING FROM THE BUTTON
   ========================================================= */

const kissButton = document.getElementById("kissButton");
const kissLayer = document.getElementById("kissLayer");

if (kissButton && kissLayer) {

  kissButton.addEventListener("click", () => {

    const rect = kissButton.getBoundingClientRect();

    const startX = rect.left + rect.width / 2;
    const startY = rect.top + rect.height / 2;

    const emojis = [
      "💋",
      "💋",
      "💋",
      "♡",
      "♥",
      "😘",
      "💗"
    ];

    for (let i = 0; i < 18; i++) {

      const kiss = document.createElement("span");

      kiss.className = "kiss";

      kiss.textContent =
        emojis[Math.floor(Math.random() * emojis.length)];

      /* Start exactly from the Kiss Me button */
      kiss.style.position = "fixed";
      kiss.style.left = `${startX}px`;
      kiss.style.top = `${startY}px`;

      kiss.style.zIndex = "99999";
      kiss.style.pointerEvents = "none";

      /* Random movement */
      const x =
        -110 + Math.random() * 220;

      const y =
        -120 - Math.random() * 180;

      const rotation =
        -35 + Math.random() * 70;

      const scale =
        0.7 + Math.random() * 0.7;

      const delay =
        Math.random() * 0.18;

      kiss.style.setProperty("--kiss-x", `${x}px`);
      kiss.style.setProperty("--kiss-y", `${y}px`);
      kiss.style.setProperty("--kiss-r", `${rotation}deg`);
      kiss.style.setProperty("--kiss-scale", scale);
      kiss.style.animationDelay = `${delay}s`;

      kissLayer.appendChild(kiss);

      setTimeout(() => {
        kiss.remove();
      }, 2200);
    }

  });

}


/* =========================================================
   SMOOTH SCROLL
   ========================================================= */

document
  .querySelectorAll(
    'a[href^="#"]'
  )
  .forEach((link) => {

    link.addEventListener(
      "click",
      (event) => {

        const targetId =
          link.getAttribute(
            "href"
          );


        if (
          !targetId ||
          targetId === "#"
        ) {
          return;
        }


        const target =
          document.querySelector(
            targetId
          );


        if (!target) {
          return;
        }


        event.preventDefault();


        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }
    );

  });


/* =========================================================
   DRAWING CANVAS
   ========================================================= */

const canvas =
  document.getElementById(
    "loveCanvas"
  );


if (canvas) {

  const ctx =
    canvas.getContext("2d");


  const colorPicker =
    document.getElementById(
      "colorPicker"
    );


  const brushSize =
    document.getElementById(
      "brushSize"
    );


  const clearCanvas =
    document.getElementById(
      "clearCanvas"
    );


  let drawing = false;

  let lastX = 0;

  let lastY = 0;


  function setupCanvas() {

    const rect =
      canvas.getBoundingClientRect();


    const ratio =
      window.devicePixelRatio || 1;


    canvas.width =
      rect.width * ratio;


    canvas.height =
      rect.height * ratio;


    ctx.setTransform(
      ratio,
      0,
      0,
      ratio,
      0,
      0
    );


    ctx.lineCap =
      "round";


    ctx.lineJoin =
      "round";


    ctx.lineWidth =
      brushSize
        ? Number(
            brushSize.value
          )
        : 4;


    ctx.strokeStyle =
      colorPicker
        ? colorPicker.value
        : "#e84968";

  }


  setupCanvas();


  window.addEventListener(
    "resize",
    setupCanvas
  );


  function getPosition(event) {

    const rect =
      canvas.getBoundingClientRect();


    if (
      event.touches &&
      event.touches.length
    ) {

      return {

        x:
          event.touches[0].clientX -
          rect.left,

        y:
          event.touches[0].clientY -
          rect.top

      };

    }


    return {

      x:
        event.clientX -
        rect.left,

      y:
        event.clientY -
        rect.top

    };

  }


  function startDrawing(event) {

    event.preventDefault();

    drawing = true;


    const position =
      getPosition(event);


    lastX =
      position.x;

    lastY =
      position.y;

  }


  function draw(event) {

    if (!drawing) {
      return;
    }


    event.preventDefault();


    const position =
      getPosition(event);


    ctx.beginPath();


    ctx.moveTo(
      lastX,
      lastY
    );


    ctx.lineTo(
      position.x,
      position.y
    );


    ctx.stroke();


    lastX =
      position.x;

    lastY =
      position.y;

  }


  function stopDrawing(event) {

    if (event) {
      event.preventDefault();
    }

    drawing = false;

  }


  /* Mouse */

  canvas.addEventListener(
    "mousedown",
    startDrawing
  );


  canvas.addEventListener(
    "mousemove",
    draw
  );


  canvas.addEventListener(
    "mouseup",
    stopDrawing
  );


  canvas.addEventListener(
    "mouseleave",
    stopDrawing
  );


  /* Touch */

  canvas.addEventListener(
    "touchstart",
    startDrawing,
    { passive: false }
  );


  canvas.addEventListener(
    "touchmove",
    draw,
    { passive: false }
  );


  canvas.addEventListener(
    "touchend",
    stopDrawing,
    { passive: false }
  );


  /* Color */

  if (colorPicker) {

    colorPicker.addEventListener(
      "input",
      () => {

        ctx.strokeStyle =
          colorPicker.value;

      }
    );

  }


  /* Brush */

  if (brushSize) {

    brushSize.addEventListener(
      "input",
      () => {

        ctx.lineWidth =
          Number(
            brushSize.value
          );

      }
    );

  }


  /* Clear */

  if (clearCanvas) {

    clearCanvas.addEventListener(
      "click",
      () => {

        ctx.clearRect(
          0,
          0,
          canvas.width,
          canvas.height
        );

      }
    );

  }

}

/* =========================================================
   SEND DRAWING BY EMAIL
   ========================================================= */

const sendDrawingButton =
  document.getElementById("sendDrawing");

const sendStatus =
  document.getElementById("sendStatus");

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxhnVXsTRvetlDn4HxjFQDDqNl90r1ipmcufQHWxlkBVDqmqeZPYUFhF-9wxBtomRwfyA/exec";


if (sendDrawingButton && canvas) {

  sendDrawingButton.addEventListener("click", () => {

    sendDrawingButton.disabled = true;
    sendDrawingButton.textContent = "Sending… ♡";

    if (sendStatus) {
      sendStatus.textContent =
        "Sending your little masterpiece ♡";
    }

    try {

      /*
       * Convert drawing to PNG
       */
      const imageData =
        canvas.toDataURL("image/png");

      console.log(
        "Drawing size:",
        imageData.length
      );


      /*
       * Create hidden iframe
       */
      const iframe =
        document.createElement("iframe");

      iframe.name =
        "hiddenEmailFrame";

      iframe.style.display =
        "none";

      document.body.appendChild(iframe);


      /*
       * Create POST form
       */
      const form =
        document.createElement("form");

      form.method =
        "POST";

      form.action =
        GOOGLE_SCRIPT_URL;

      form.target =
        "hiddenEmailFrame";

      form.style.display =
        "none";


      /*
       * Send image directly as "image"
       *
       * IMPORTANT:
       * Apps Script also expects "image".
       */
      const imageInput =
        document.createElement("input");

      imageInput.type =
        "hidden";

      imageInput.name =
        "image";

      imageInput.value =
        imageData;


      form.appendChild(
        imageInput
      );

      document.body.appendChild(
        form
      );


      console.log(
        "Sending drawing to Google Apps Script..."
      );


      /*
       * Submit
       */
      form.submit();


      /*
       * We cannot read the iframe response
       * because of cross-origin restrictions.
       */
      setTimeout(() => {

        sendDrawingButton.disabled =
          false;

        sendDrawingButton.textContent =
          "Sent ♡";

        if (sendStatus) {
          sendStatus.textContent =
            "Your drawing is on its way to us 💌";
        }

        setTimeout(() => {

          sendDrawingButton.textContent =
            "💌 Send drawing";

        }, 3000);

      }, 5000);


      /*
       * Clean up AFTER submission
       */
      setTimeout(() => {

        form.remove();
        iframe.remove();

      }, 10000);


    } catch (error) {

      console.error(
        "SEND DRAWING ERROR:",
        error
      );

      sendDrawingButton.disabled =
        false;

      sendDrawingButton.textContent =
        "💌 Send drawing";

      if (sendStatus) {
        sendStatus.textContent =
          "Could not send the drawing. Please try again.";
      }

    }

  });

}

/* =========================================================
   MEMORY JOURNEY
   NO PUZZLE
   ONE NORMAL PHOTO AT A TIME
   ========================================================= */

const memoryCards =
  document.querySelectorAll(
    ".memory-card"
  );


const memoryProgress =
  document.getElementById(
    "memoryProgress"
  );


const memoryHint =
  document.getElementById(
    "memoryHint"
  );


const memoryDots =
  document.querySelectorAll(
    ".progress-dot"
  );


const memoryFinish =
  document.getElementById(
    "memoryFinish"
  );


let currentMemory = 1;


/* =========================================================
   MEMORY HINTS
   ========================================================= */

const memoryHints = {

  1:
    "Start at the beginning. Tap the first photo. ♡",

  2:
    "Our first day as a couple. ♡",

  3:
    "Another little memory...",

  4:
    "Our first Diwali together. ♡",

  5:
    "We even made long distance work.",

  6:
    "Our first Valentine's together. ♡",

  7:
    "One last memory... ♡"

};


/* =========================================================
   UPDATE PROGRESS
   ========================================================= */
function updateMemoryProgress() {

  const totalMemories = memoryCards.length;

  if (memoryProgress) {
    memoryProgress.textContent =
      `MEMORY ${String(currentMemory).padStart(2, "0")} / ${String(totalMemories).padStart(2, "0")}`;
  }

  memoryDots.forEach((dot, index) => {

    dot.classList.toggle(
      "current",
      index === currentMemory - 1
    );

    dot.classList.toggle(
      "done",
      index < currentMemory - 1
    );

  });

  if (memoryHint) {

   if (currentMemory === 1) {
  memoryHint.textContent =
    "Tap each memory to see the next one! ♡♡";
} else if (currentMemory === totalMemories) {
      memoryHint.textContent =
        "One last memory. ♡";
    } else {
      memoryHint.textContent =
        "Another little memory. Tap to continue. ♡";
    }

  }

}


/* =========================================================
   SHOW MEMORY
   ========================================================= */

function showMemory(number) {

  memoryCards.forEach(
    (card) => {

      const cardNumber =
        Number(
          card.dataset.memory
        );


      card.classList.toggle(
        "active",
        cardNumber === number
      );

    }
  );


  updateMemoryProgress();

}


/* =========================================================
   MEMORY CLICK
   ========================================================= */

memoryCards.forEach(
  (card) => {

    const button =
      card.querySelector(
        ".memory-button"
      );


    if (!button) {
      return;
    }


    button.addEventListener(
      "click",
      (event) => {

        const number =
          Number(
            card.dataset.memory
          );


        if (
          number !==
          currentMemory
        ) {
          return;
        }


        /* -----------------------------------------
           SMALL TAP EFFECT
           ----------------------------------------- */

        card.style.transform =
          "translateY(0) scale(.97)";


        setTimeout(
          () => {

            card.style.transform =
              "translateY(0) scale(1)";

          },
          160
        );


        /* -----------------------------------------
           TAP TAP MESSAGE
           ----------------------------------------- */

        const tap =
          document.createElement(
            "div"
          );


        tap.className =
          "memory-tap";


        tap.textContent =
          "tap tap! ♡";


        tap.style.left =
          `${event.clientX}px`;


        tap.style.top =
          `${event.clientY}px`;


        document.body.appendChild(
          tap
        );


        setTimeout(
          () => tap.remove(),
          900
        );


        /* -----------------------------------------
           LAST MEMORY
           ----------------------------------------- */

        if (
          number ===
          memoryCards.length
        ) {

          currentMemory =
            number;


          updateMemoryProgress();


          if (memoryHint) {

            memoryHint.textContent =
              "You found every little memory of us. ♡";

          }


          if (memoryFinish) {

            setTimeout(
              () => {

                memoryFinish.classList.add(
                  "show"
                );

              },
              450
            );

          }


          return;

        }


        /* -----------------------------------------
           NEXT MEMORY
           ----------------------------------------- */

        currentMemory =
          number + 1;


        showMemory(
          currentMemory
        );

      }
    );

  }
);


/* =========================================================
   INITIAL MEMORY
   ========================================================= */

if (
  memoryCards.length > 0
) {

  currentMemory = 1;

  showMemory(1);

}


/* =========================================================
   OPTIONAL FLOATING HEARTS
   ========================================================= */

function createHeartParticle() {

  const heart =
    document.createElement(
      "span"
    );


  heart.textContent =
    Math.random() > .5
      ? "♡"
      : "♥";


  heart.style.position =
    "fixed";


  heart.style.left =
    `${Math.random() * 100}vw`;


  heart.style.bottom =
    "-30px";


  heart.style.zIndex =
    "10";


  heart.style.pointerEvents =
    "none";


  heart.style.color =
    "var(--pink)";


  heart.style.fontFamily =
    "Georgia, serif";


  heart.style.fontSize =
    `${12 + Math.random() * 15}px`;


  heart.style.opacity =
    ".45";


  heart.style.animation =
    `memoryFloat ${
      5 + Math.random() * 5
    }s ease-out forwards`;


  document.body.appendChild(
    heart
  );


  setTimeout(
    () => heart.remove(),
    11000
  );

}


/* Animation for hearts */

const heartStyle =
  document.createElement(
    "style"
  );


heartStyle.textContent = `

@keyframes memoryFloat {

  0% {
    transform:
      translateY(0)
      scale(.7);

    opacity: 0;
  }

  15% {
    opacity: .45;
  }

  100% {

    transform:
      translateY(-100vh)
      translateX(30px)
      scale(1.1);

    opacity: 0;
  }

}

`;


document.head.appendChild(
  heartStyle
);


for (
  let i = 0;
  i < 6;
  i++
) {

  setTimeout(
    createHeartParticle,
    i * 1200
  );

}

/* =========================================================
   KISS ANIMATION STYLE
   ========================================================= */

const kissAnimationStyle = document.createElement("style");

kissAnimationStyle.textContent = `

  .kiss-layer {
    position: fixed !important;
    inset: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    pointer-events: none !important;
    overflow: visible !important;
    z-index: 99998 !important;
  }

  .kiss {
    position: fixed !important;
    display: block !important;

    transform:
      translate(-50%, -50%)
      scale(.4)
      rotate(0deg);

    opacity: 0;

    font-size: 28px;
    line-height: 1;

    animation:
      kissSpring 1.8s cubic-bezier(.18,.89,.32,1.28) forwards;

    will-change:
      transform,
      opacity;
  }

  @keyframes kissSpring {

    0% {
      opacity: 0;
      transform:
        translate(-50%, -50%)
        scale(.2)
        rotate(0deg);
    }

    12% {
      opacity: 1;
      transform:
        translate(-50%, -50%)
        scale(1.25)
        rotate(var(--kiss-r));
    }

    45% {
      opacity: 1;
      transform:
        translate(
          calc(-50% + var(--kiss-x)),
          calc(-50% + var(--kiss-y))
        )
        scale(var(--kiss-scale))
        rotate(var(--kiss-r));
    }

    75% {
      opacity: .85;
    }

    100% {
      opacity: 0;
      transform:
        translate(
          calc(-50% + var(--kiss-x)),
          calc(-50% + var(--kiss-y) - 45px)
        )
        scale(.75)
        rotate(var(--kiss-r));
    }

  }

`;

document.head.appendChild(kissAnimationStyle);

/* =========================================================
   FLOATING HEARTS — WHOLE WEBSITE
   ========================================================= */

(function createFloatingHearts() {

  const layer = document.createElement("div");

  layer.className = "floating-hearts-layer";

  layer.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.appendChild(layer);


  const heartSymbols = [
    "♡",
    "♡",
    "♡",
    "♥"
  ];


  const HEART_COUNT = 18;


  for (let i = 0; i < HEART_COUNT; i++) {

    const heart =
      document.createElement("span");

    heart.className =
      "floating-heart-global";


    heart.textContent =
      heartSymbols[
        Math.floor(
          Math.random() *
          heartSymbols.length
        )
      ];


    /* Random horizontal starting position */

    heart.style.left =
      `${Math.random() * 100}%`;


    /* Different heart sizes */

    heart.style.setProperty(
      "--heart-size",
      `${12 + Math.random() * 25}px`
    );


    /* Very subtle opacity */

    heart.style.setProperty(
      "--heart-opacity",
      `${0.12 + Math.random() * 0.20}`
    );


    /* Some hearts slightly blurred */

    heart.style.setProperty(
      "--heart-blur",
      `${Math.random() * 1.2}px`
    );


    /* Different floating speeds */

    heart.style.setProperty(
      "--heart-duration",
      `${12 + Math.random() * 13}s`
    );


    /* Random starting delay */

    heart.style.setProperty(
      "--heart-delay",
      `${Math.random() * -18}s`
    );


    /* Horizontal movement */

    heart.style.setProperty(
      "--heart-x",
      `${-80 + Math.random() * 160}px`
    );


    heart.style.setProperty(
      "--heart-x-end",
      `${-120 + Math.random() * 240}px`
    );


    /* Random rotation */

    heart.style.setProperty(
      "--heart-rotate",
      `${-25 + Math.random() * 50}deg`
    );


    layer.appendChild(heart);

  }

})();


/* =========================================================
   OUR MASTERPIECES GALLERY
   ========================================================= */

const masterpiecesButton =
  document.getElementById("masterpiecesButton");

const masterpiecesOverlay =
  document.getElementById("masterpiecesOverlay");

const masterpiecesClose =
  document.getElementById("masterpiecesClose");

const masterpieceItems =
  document.querySelectorAll(".masterpiece-item");

const masterpieceLightbox =
  document.getElementById("masterpieceLightbox");

const masterpieceLightboxImage =
  document.getElementById("masterpieceLightboxImage");

const masterpieceLightboxClose =
  document.getElementById("masterpieceLightboxClose");


/* ---------------------------------------------------------
   OPEN GALLERY
   --------------------------------------------------------- */

if (
  masterpiecesButton &&
  masterpiecesOverlay
) {

  masterpiecesButton.addEventListener(
    "click",
    () => {

      masterpiecesOverlay.classList.add("show");

      masterpiecesOverlay.setAttribute(
        "aria-hidden",
        "false"
      );

      /*
       * Stop the page from scrolling behind
       * the gallery.
       *
       * IMPORTANT:
       * We do NOT touch the song.
       * Sparks continues playing.
       */

      document.body.style.overflow = "hidden";

    }
  );

}


/* ---------------------------------------------------------
   CLOSE GALLERY
   --------------------------------------------------------- */

function closeMasterpiecesGallery() {

  if (masterpiecesOverlay) {

    masterpiecesOverlay.classList.remove("show");

    masterpiecesOverlay.setAttribute(
      "aria-hidden",
      "true"
    );

  }

  /*
   * Restore normal website scrolling.
   *
   * Sparks is never paused.
   */

  document.body.style.overflow = "";

}


/* ---------------------------------------------------------
   CLOSE BUTTON
   --------------------------------------------------------- */

if (masterpiecesClose) {

  masterpiecesClose.addEventListener(
    "click",
    closeMasterpiecesGallery
  );

}


/* ---------------------------------------------------------
   CLICK OUTSIDE MODAL
   --------------------------------------------------------- */

if (masterpiecesOverlay) {

  masterpiecesOverlay.addEventListener(
    "click",
    (event) => {

      if (
        event.target === masterpiecesOverlay
      ) {

        closeMasterpiecesGallery();

      }

    }
  );

}


/* ---------------------------------------------------------
   OPEN INDIVIDUAL PHOTO
   --------------------------------------------------------- */

masterpieceItems.forEach(
  (item) => {

    item.addEventListener(
      "click",
      () => {

        const image =
          item.querySelector("img");

        if (
          !image ||
          !masterpieceLightbox ||
          !masterpieceLightboxImage
        ) {
          return;
        }

        masterpieceLightboxImage.src =
          image.src;

        masterpieceLightboxImage.alt =
          image.alt;

        masterpieceLightbox.classList.add(
          "show"
        );

        masterpieceLightbox.setAttribute(
          "aria-hidden",
          "false"
        );

      }
    );

  }
);


/* ---------------------------------------------------------
   CLOSE INDIVIDUAL PHOTO
   --------------------------------------------------------- */

function closeMasterpiecePhoto() {

  if (masterpieceLightbox) {

    masterpieceLightbox.classList.remove(
      "show"
    );

    masterpieceLightbox.setAttribute(
      "aria-hidden",
      "true"
    );

  }

}


if (masterpieceLightboxClose) {

  masterpieceLightboxClose.addEventListener(
    "click",
    closeMasterpiecePhoto
  );

}


/* ---------------------------------------------------------
   CLOSE LARGE PHOTO BY CLICKING OUTSIDE
   --------------------------------------------------------- */

if (masterpieceLightbox) {

  masterpieceLightbox.addEventListener(
    "click",
    (event) => {

      if (
        event.target === masterpieceLightbox
      ) {

        closeMasterpiecePhoto();

      }

    }
  );

}


/* ---------------------------------------------------------
   ESCAPE KEY
   --------------------------------------------------------- */

document.addEventListener(
  "keydown",
  (event) => {

    if (event.key !== "Escape") {
      return;
    }

    if (
      masterpieceLightbox &&
      masterpieceLightbox.classList.contains("show")
    ) {

      closeMasterpiecePhoto();

      return;

    }

    if (
      masterpiecesOverlay &&
      masterpiecesOverlay.classList.contains("show")
    ) {

      closeMasterpiecesGallery();

    }

  }
);
/* =========================================================
   OUR PLANS — INLINE CATEGORY + RANDOM PICK
   ========================================================= */

const plansCategories =
  document.querySelectorAll(".plan-category");

const plansList =
  document.getElementById("plansList");

const plansRandomButton =
  document.getElementById("plansRandomButton");

const plansAgainButton =
  document.getElementById("plansAgainButton");

const plansResult =
  document.getElementById("plansResult");

const plansResultTitle =
  document.getElementById("plansResultTitle");

const plansResultSubtitle =
  document.getElementById("plansResultSubtitle");


/* ---------------------------------------------------------
   THE PLANS
   --------------------------------------------------------- */

const relationshipPlans = {

  hungry: [
    {
      title: "Kollage",
      subtitle: "Garlic butter naan, chicken tangdi",
      url: "https://maps.app.goo.gl/6Yy8AA8SkjvguvG29?g_st=aw"
    },
    {
      title: "Cafe Flex",
      subtitle: "Thin crust pizza, peri-peri chicken steak",
      url: "https://maps.app.goo.gl/d6baepRdHASGejR19?g_st=aw"
    },
    {
      title: "Ahilyadevi's Thali",
      subtitle: "my favourite thali place <3",
      url: "https://maps.app.goo.gl/7pzpYzZj9RYnZtSF7?g_st=aw"
    },
    {
      title: "Verandah",
      subtitle: "hot chocolate date!",
      url: "https://maps.app.goo.gl/QAg8uZ7M8bZFCMUC6?g_st=aw"
    },

    {
      title: "Tipplr",
      subtitle: "questionable decisions incomin after having some 🍷",
      url: "https://maps.app.goo.gl/6eEST9iFPixZmjwy7?g_st=aw"
    }
  ],

  fun: [
    {
      title: "Arai",
      subtitle: "Have to go there with you 🥺♡",
      url: "https://maps.app.goo.gl/6eEST9iFPixZmjwy7?g_st=aw"
      
    },
    {
      title: "Anand Niketan Badminton court",
      subtitle: "let's see who wins.",
      url: "https://maps.app.goo.gl/VTbuT7s63JNARHya8?g_st=aw"
    },
    {
      title: "Shopping for new clothes",
      subtitle: "you obviously need new outfits."
    },
    {
      title: "See all brainrot Sallu movies",
      subtitle: "a completely serious cinematic commitment."
    }
  ],

  romantic: [
    {
      title: "University walk",
      subtitle: "Anu cha naav gheu, but it'll be just us, walking around ♡",
      url: "https://maps.app.goo.gl/hE5HMJgZb7Tzpu4S8?g_st=aw"
    },
    {
      title: "Driving late at night <3",
      subtitle: "with no particular destination required."
    },
    {
      title: "a home cooked meal by yours truly 💓",
      subtitle: "This is something I've been learning for 1 year to do for you. Tap on this to choose any one of the dishes you like, and I'll make it for you.",
      url: "https://www.instagram.com/s/aGlnaGxpZ2h0OjE3OTYyODM1NTY1MDEwMzkw?story_media_id=3802020761074979589_47706904695&stkn=eW9tanVhcWhwZmdk"
    }
  ],

  selfcare: [
    {
      title: "Dermatologist appointment",
      subtitle: "First visit's on me, no arguments."
    },
    {
      title: "Getting your corn re-checked",
      subtitle: "very very important business"
    }
  ]

};


/* ---------------------------------------------------------
   CATEGORY NAMES
   --------------------------------------------------------- */

const categoryNames = {

  hungry: "Hungry 🍴",

  fun: "Fun 🎉",

  romantic: "Romantic ♡",

  selfcare: "Self care ✨",


};


/* ---------------------------------------------------------
   SHOW CATEGORY
   --------------------------------------------------------- */

function showPlanCategory(category) {

  if (!plansList) {
    return;
  }

  const plans =
    relationshipPlans[category] || [];

  plansList.innerHTML = "";


  plans.forEach((plan) => {

    const item = document.createElement(
  plan.url ? "a" : "div"
);

item.className = "plan-item";

if (plan.url) {
  item.href = plan.url;
  item.target = "_blank";
  item.rel = "noopener noreferrer";
}

item.innerHTML = `
  <span>${plan.title}</span>
  <small>${plan.subtitle}</small>
`;

plansList.appendChild(item);

  });


  /* Update active category */

  plansCategories.forEach(
    (button) => {

      button.classList.toggle(
        "active",
        button.dataset.category === category
      );

    }
  );

}


/* ---------------------------------------------------------
   CATEGORY BUTTONS
   --------------------------------------------------------- */

plansCategories.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const category =
          button.dataset.category;

        showPlanCategory(category);


        /* Hide previous random result */

        if (plansResult) {

          plansResult.classList.remove(
            "show"
          );

        }

      }
    );

  }
);


/* ---------------------------------------------------------
   RANDOM PICK
   --------------------------------------------------------- */

function pickRandomPlan() {

  const allPlans = [];


  Object.entries(
    relationshipPlans
  ).forEach(
    ([category, plans]) => {

      plans.forEach(
        (plan) => {

          allPlans.push({
            ...plan,
            category
          });

        }
      );

    }
  );


  const randomPlan =
    allPlans[
      Math.floor(
        Math.random() *
        allPlans.length
      )
    ];


  if (
    !randomPlan ||
    !plansResult ||
    !plansResultTitle ||
    !plansResultSubtitle
  ) {

    return;

  }


  /* Set result */

  plansResultTitle.textContent =
    randomPlan.title;

  plansResultSubtitle.textContent =
    `${categoryNames[randomPlan.category]} · ${randomPlan.subtitle}`;


  /* Restart animation */

  plansResult.classList.remove(
    "show"
  );

  void plansResult.offsetWidth;

  plansResult.classList.add(
    "show"
  );

}


/* ---------------------------------------------------------
   PICK FOR US BUTTON
   --------------------------------------------------------- */

if (plansRandomButton) {

  plansRandomButton.addEventListener(
    "click",
    pickRandomPlan
  );

}

