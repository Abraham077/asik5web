$(function() {
  $("#change-text").on("click", function() {
    $("#demo-text").text("Текст изменён! Использован .text()");
    $("#main-title").html("<em>Web Technologies — demo</em>");
  });
  $("#change-css").on("click", function() {
    $(".box").css({ "border": "2px solid #333", "padding": "14px" });
    $(".small").css("background-color", "#dff0d8");
  });

  $("#btn-hide").on("click", () => $("#effect-par").hide());
  $("#btn-show").on("click", () => $("#effect-par").show());
  $("#btn-toggle").on("click", () => $("#effect-par").toggle());

  $("#fade-in").click(() => $("#effect-img").fadeIn(500));
  $("#fade-out").click(() => $("#effect-img").fadeOut(500));
  $("#fade-toggle").click(() => $("#effect-img").fadeToggle(400));

  $("#slide-toggle").click(() => $(".collapsible-body").slideToggle(300));

  $("#reset-anim").click(() => {
    $("#anim-box").stop(true).css({left:0, top:0, width:60, height:60, opacity:1});
  });

  $("#step-animate").click(function() {
    const box = $("#anim-box");
    box.animate({ left: "+=200px" }, 600)
       .animate({ top: "+=80px" }, 600)
       .animate({ width: "40px", height: "40px" }, 400)
       .animate({ left: "0px", top: "0px", width: "60px", height: "60px" }, 600);
  });

  $("#combo-animate").click(function() {
    $("#anim-box").animate({ left: "+=150px", top: "+=40px", width: "120px", opacity: 0.5 }, 800);
  });

  $("#add-item").click(function() {
    const text = $("#new-item-text").val().trim() || ("Item " + ($("#item-list li").length + 1));
    $("#item-list").append(`<li>${escapeHtml(text)} <button class="remove-item">Remove</button></li>`);
    $("#new-item-text").val("");
  });
  $("#prepend-item").click(function() {
    const text = $("#new-item-text").val().trim() || ("Item " + ($("#item-list li").length + 1));
    $("#item-list").prepend(`<li>${escapeHtml(text)} <button class="remove-item">Remove</button></li>`);
    $("#new-item-text").val("");
  });
  $(document).on("click", ".remove-item", function() {
    $(this).closest("li").remove();
  });

  $("#change-image").click(function() {
    const cur = $("#target-image").attr("src");
    const alt = cur.includes("photo") ? "photo/moscva.jpg" : "photo/green.jpg";
    $("#target-image").attr("src", alt);
  });

  $("#change-link").click(function() {
    $("#dynamic-link").attr("href", "https://www.youtube.com/?app=desktop&hl=ru").text("Youtube");
  });

  $(".thumb").on("click", function() {
    const big = $(this).attr("data-large");
    $(".thumb").removeClass("active");
    $(this).addClass("active");
    $("#viewer").hide().html(`<img src="${big}" style="max-width:100%;max-height:420px;" />`).fadeIn(300);
});

  $(".acc-title").on("click", function() {
    $(this).next(".acc-body").slideToggle(250);
  });

  let target = null, attempts = 0, maxAttempts = 100;
  function newGame() {
    target = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    $("#game-status").text("Игра начата! Угадывай число от 1 до 100");
    $("#attempts").text("Ходов: 0");
    $("#guess-input").val("").prop("disabled", false);
    $("#guess-btn").prop("disabled", false);
    console.log("target:", target); 
  }
  $("#new-game").on("click", newGame);
  $("#guess-btn").on("click", function() {
    const val = parseInt($("#guess-input").val(), 10);
    if (!val || val < 1 || val > 100) {
      $("#game-status").text("Введите число от 1 до 100!");
      return;
    }
    attempts++;
    if (val === target) {
      $("#game-status").text(`Верно! Число ${target}. Попыток: ${attempts}`);
      $("#guess-input").prop("disabled", true);
      $("#guess-btn").prop("disabled", true);
    } else if (val < target) {
      $("#game-status").text("Слишком маленькое!");
    } else {
      $("#game-status").text("Слишком большое!");
    }
    $("#attempts").text("Ходов: " + attempts);
  });

  if ($("#guess-game").length) newGame();

  let ballInterval = null;
  function startBall() {
    const arena = $("#arena");
    if (!arena.length) return;
    const ball = $("#ball");
    const maxX = arena.width() - ball.width();
    const maxY = arena.height() - ball.height();
    let vx = 3, vy = 3;
    if (ballInterval) clearInterval(ballInterval);
    ballInterval = setInterval(() => {
      let x = parseFloat(ball.css("left")) || 0;
      let y = parseFloat(ball.css("top")) || 0;
      x += vx; y += vy;
      if (x <= 0 || x >= maxX) vx = -vx;
      if (y <= 0 || y >= maxY) vy = -vy;
      ball.css({ left: x + "px", top: y + "px" });
    }, 16);
  }
  function stopBall() { if (ballInterval) clearInterval(ballInterval); ballInterval = null; }

  $("#start-ball").on("click", startBall);
  $("#stop-ball").on("click", stopBall);

  function escapeHtml(str) {
    return String(str).replace(/[&<>"'`=\/]/g, function (s) {
      return ({
        '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;','/':'&#x2F;','`':'&#x60;','=':'&#x3D;'
      })[s];
    });
  }
});
