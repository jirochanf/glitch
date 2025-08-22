   const showInfo = () => {
      let y = 0;
      const profileButton = document.querySelector("#profile-button");
      const webButton = document.querySelector("#web-button");
      const emailButton = document.querySelector("#email-button");
      const locationButton = document.querySelector("#location-button");
      const namecard = document.querySelector("#namecard");

      profileButton.setAttribute("visible", true);
      setTimeout(() => {
        webButton.setAttribute("visible", true);
      }, 10);
      setTimeout(() => {
        emailButton.setAttribute("visible", true);
      }, 10);
      setTimeout(() => {
        locationButton.setAttribute("visible", true);
      }, 10);
      setTimeout(() => {
        namecard.setAttribute("visible", true);
      }, 10);

   }

      const showPortfolio = (done) => {
      const portfolio = document.querySelector("#panel");
      const LeftButton = document.querySelector("#left-button");
      const RightButton = document.querySelector("#right-button");
      const PreviewButton = document.querySelector("#preview-button");

      let y = 0;
      let currentItem = 0;
      let maximages = 10 //スライド画像の数オーバーレイ含む
 
      portfolio.setAttribute("visible", true);

      const showPortfolioItem = (item) => {
        for (let i = 0; i <= maximages; i++) {
          document.querySelector("#panel-item" + i).setAttribute("visible", i === item);
        }
      }
      const id = setInterval(() => {
        y += 0.008;
        if (y >= 0.6) {
          clearInterval(id);
          LeftButton.setAttribute("visible", true);
          RightButton.setAttribute("visible", true);
          LeftButton.addEventListener('click', () => {            
            currentItem = (currentItem + 1) % maximages;
            showPortfolioItem(currentItem);
          });
          RightButton.addEventListener('click', () => {
            currentItem = (currentItem - 1 + maximages ) % maximages;
            showPortfolioItem(currentItem);
          });

          PreviewButton.addEventListener('click', () => {
            PreviewButton.setAttribute("visible", false);
            const testVideo = document.createElement( "video" );
            const canplayWebm = testVideo.canPlayType( 'video/webm; codecs="vp8, vorbis"' );
//追加
            let is_playing = false;

            if (canplayWebm == "") {
              document.querySelector("#video-link").setAttribute("src", "#video-mp4");
              document.querySelector("#video-mp4").muted = false; 
 //削除             document.querySelector("#video-mp4").play();
 //追加
              if (!is_playing) {
             document.querySelector("#video-mp4").play();
            is_playing = true;
           } else {
            document.querySelector("#video-mp4").pause();
            is_playing = false;
           } 
//追加
            } else {
              document.querySelector("#video-link").setAttribute("src", "#video-mp4");
              document.querySelector("#video-mp4").muted = false; 
              document.querySelector("#video-mp4").play();
            }
          });

          setTimeout(() => {
            done();
          }, 50);
        }
        portfolio.setAttribute("position", "0 " + 0 + " -0.01");
      }, 10);
    }

    //  Aframeでターゲット0を摘出 
AFRAME.registerComponent('mytarget', {
      init: function () {
        this.el.addEventListener('targetFound', event => {
          console.log("target found");
//           showAvatar(() => {
            setTimeout(() => {
              showPortfolio(() => {
                setTimeout(() => {
                  showInfo();
                }, 600);
              });
            }, 600);
//           });
        });
        this.el.addEventListener('targetLost', event => {
          console.log("target found");
        });
        //this.el.emit('targetFound');
      }
    });
