(function () {
  var frames = document.querySelectorAll('.video-frame');

  function closeFrame(frame) {
    var player = frame.querySelector('.video-player');
    player.hidden = true;

    var video = frame.querySelector('video');
    if (video) {
      video.pause();
      video.currentTime = 0;
    }

    var embed = frame.querySelector('.video-player__embed');
    if (embed) {
      embed.innerHTML = '';
    }
  }

  function openFrame(frame) {
    frames.forEach(function (other) {
      if (other !== frame) closeFrame(other);
    });
    var player = frame.querySelector('.video-player');
    player.hidden = false;

    var video = frame.querySelector('video');
    if (video) {
      video.play();
    }

    var embed = frame.querySelector('.video-player__embed');
    if (embed) {
      var iframe = document.createElement('iframe');
      iframe.src = 'https://player.vimeo.com/video/' + embed.getAttribute('data-vimeo-id') + '?autoplay=1&title=0&byline=0&portrait=0';
      iframe.setAttribute('allow', 'autoplay; fullscreen; picture-in-picture');
      iframe.setAttribute('allowfullscreen', '');
      embed.appendChild(iframe);
    }
  }

  frames.forEach(function (frame) {
    var cover = frame.querySelector('.video-cover');
    var closeBtn = frame.querySelector('.video-close');
    cover.addEventListener('click', function () {
      openFrame(frame);
    });
    closeBtn.addEventListener('click', function () {
      closeFrame(frame);
    });
  });
})();

(function () {
  var ADDRESS = 'nikittaputintsev@gmail.com';
  var emailBtn = document.getElementById('email-btn');
  var emailLabel = document.getElementById('email-label');
  var resetTimeout;

  function showCopied() {
    emailLabel.textContent = 'Copied to clipboard';
    clearTimeout(resetTimeout);
    resetTimeout = setTimeout(function () {
      emailLabel.textContent = ADDRESS;
    }, 2200);
  }

  emailBtn.addEventListener('click', function () {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(ADDRESS).then(showCopied, showCopied);
    } else {
      showCopied();
    }
  });
})();
