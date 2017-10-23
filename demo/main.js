document.body.scrollTop += 1;
var doc = document.body.scrollTop ? document.body : document.documentElement;
document.body.scrollTop -= 1;

window.onload = function() {
  var mobile = false;

  if(navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i) ) {
    var mask = document.getElementById("mask");
    mask.parentNode.removeChild(mask);
    document.getElementById("lines-dots").style.fill = "#fafafa";
    mobile = true;
  } else {
    var mask = document.getElementById("mask");
    mask.setAttribute("width", window.innerWidth * 2);
    mask.setAttribute("height", window.innerHeight * 2);
    mask.setAttribute("x", -window.innerWidth);
    mask.setAttribute("y", -window.innerHeight);
    document.onmousemove = function(evt) {
      mask.setAttribute("x", evt.clientX - mask.getAttribute("width") / 2);
      mask.setAttribute("y", evt.clientY - mask.getAttribute("height") / 2);
    }
  }

  document.onscroll= function() {
    if(doc.scrollTop > 100) {
      document.getElementsByTagName('nav')[0].style.background = "#FFF"
    } else if(doc.scrollTop < 100
       && window.innerWidth > 763) {
      document.getElementsByTagName('nav')[0].style.background = "transparent"
    }

  }

  var demo_btn = document.getElementById("demo-btn");
  var pulse_anime = anime({
    targets: "#demo-btn svg",
    top: "+=5",
    direction: "alternate",
    loop: true,
    easing: "easeInOutSine",
    duration: 400
  });

  demo_btn.onclick = function() {
    scrollTo(document.getElementById("demo-btn").offsetTop);
  }

  document.getElementById("tuts-a").onclick = function(){
    scrollTo(document.getElementById("tuts").offsetTop);
  }

  document.getElementById("api-a").onclick = function(){
    scrollTo(document.getElementById("ap").offsetTop);
  }

  document.getElementById("abt-a").onclick = function(){
    scrollTo(document.getElementById("abt").offsetTop);
  }

  var gs_btn = document.getElementById("get-started-btn");

  var demo_btns = document.getElementsByClassName("lbl");
  for(var i = 0; i < demo_btns.length; ++i) {
    demo_btns[i].anime = btn_animation(demo_btns[i])
    if(!mobile) {
      demo_btns[i].onmouseenter = function() {
        this.anime.out.pause();
        this.anime.in.restart();
      }
      demo_btns[i].onmouseleave = function() {
        this.anime.in.pause();
        this.anime.out.pause();
        this.anime.out.restart();
      }
      demo_btns[i].onclick = function() {
      }
    } else {
      demo_btns[i].onclick = function() {
        this.anime.in.pause();
        this.anime.click.restart();
      }
    }
  }

  var gs_btn = document.getElementById("get-started-btn");
  gs_btn.anime = btn_animation(gs_btn);

  if(!mobile) {
    gs_btn.onmouseenter = function() {
      gs_btn.anime.out.pause();
      gs_btn.anime.in.restart();
    }

    gs_btn.onmouseleave = function() {
      gs_btn.anime.in.pause();
      gs_btn.anime.out.restart();
    }
  }

  gs_btn.onclick = function() {
    gs_btn.anime.in.pause();
    gs_btn.anime.click.restart();
    scrollTo(document.getElementById("abt").offsetTop);
  }

}

function btn_animation(target) {
  var ain = anime({
    targets: target,
    scale: 1.05,
    duration: 1500
  });
  ain.pause();
  var cl = anime({
    targets: target,
    scale: .9,
    direction: 'alternate',
    ease: 'outCirc',
    duration: 50
  })
  cl.pause();
  var aout = anime({
    targets: target,
    scale: [1.05, 1]
  })

  return {in: ain, out: aout, click: cl};
}

function scrollTo(target) {

  anime({
    targets: doc,
    scrollTop: target,
    easing: 'easeInOutCubic',
    duration: 500
  })
}