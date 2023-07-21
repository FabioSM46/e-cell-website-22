import React, { useState, useEffect, useRef } from 'react'
import './GalleryCard.css'
import { BsFullscreen } from 'react-icons/bs'
import { MdCloseFullscreen } from 'react-icons/md'
const config = {
  rootMargin: "0px 0px 0px 0px",
  threshold: 0.2,
};
function GalleryCard(props) {
  const [loaded, setIsLoaded] = useState(false);
  const [fullscreenclass, setFullscreenclass] = useState(false)
  const [blurbg, setBlurbg] = useState(false)
  const [currentFullscreenImg, setCurrentFullscreenImg] = useState(null);
  useEffect(() => {
    let observer = new window.IntersectionObserver(function (entries, self) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadImages(entry.target);
          self.unobserve(entry.target);
        }
      });
    }, config);
    const imgs = document.querySelectorAll("[data-src]");
    imgs.forEach((img) => {
      observer.observe(img);
    });
    return () => {
      imgs.forEach((img) => {
        observer.unobserve(img);
      });
    };
  }, []);

  const loadImages = (image) => {
    image.src = image.dataset.src;
  };

  const handleFullscreenImage = () => {
    setFullscreenclass(true)
    setBlurbg(true)
    setCurrentFullscreenImg(props.id);
    // document.body.classList.add('blur-background');
  }

  const handleNormalImage = () => {
    setFullscreenclass(prevMenu => !prevMenu)
    setBlurbg(prevMenu => !prevMenu)
    setCurrentFullscreenImg(null);
    // document.body.classList.remove('blur-background');
  }

  useEffect(() => {
    if (fullscreenclass === true) {
      // document.body.style.cursor = "not-allowed"
      document.body.style.height = "100vh"
      document.body.style.overflow = "hidden"
      // document.body.classList.add("greyishbg")
    } else {
      // document.body.style.cursor = "default"
      document.body.style.height = ""
      document.body.style.overflow = ""
      // document.body.classList.remove("greyishbg")
    }
  })

  const screenWidth = window.innerWidth || document.documentElement.clientWidth
  const tabletPc = screenWidth < 660

  const custombg = {
    width: "100%",
    height: "100%",
    position: "relative",
    zIndex: 1500,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  }

  useEffect(() => {
    if (currentFullscreenImg !== props.id && fullscreenclass) {
      handleNormalImage();
    }
  }, [props.id, currentFullscreenImg, fullscreenclass]);

  useEffect(() => {
    if (fullscreenclass) {
      document.querySelectorAll('.Gallery_card:not(.full-screen)').forEach((card) => {
        card.style.zIndex = -1000000000;
        // card.style.display = "none";
        // card.style.backgroundColor="white"

      });
      // document.querySelectorAll("Gallery_card").style.minHeight = "100vh"
    } else {
      document.querySelectorAll('.Gallery_card:not(.full-screen)').forEach((card) => {
        // card.style.display = 'block';
        card.style.zIndex = 0;
      });
      // document.querySelectorAll("Gallery_card").style.minHeight = "auto"
    }
  }, [fullscreenclass]);
  


  return (

    <div>
      <div className={`Gallery_card ${fullscreenclass ? 'full-screen' : ''}`}
      >
        <img id={fullscreenclass ? "fullscreen_custom" : ""} src={""} key={props.id} data-src={props.imgsrc} alt="img"
          className={`${loaded ? "loaded" : "loading"}  card-img-top`}
          onLoad={() => setIsLoaded(true)}
          style={{
            width: fullscreenclass && tabletPc ? '95vw' : fullscreenclass ? '80vw' : '',
            height: fullscreenclass && tabletPc ? '100vh' : fullscreenclass ? '80vh' : '',
            top: fullscreenclass ? '50%' : '',
            left: fullscreenclass ? '50%' : '',
            transform: fullscreenclass ? 'translate(-50%, -50%)' : '',
            pointerEvents: fullscreenclass ? "none" : ""

          }}
        />

        {
          fullscreenclass ? (<MdCloseFullscreen className='fullscreenplace' id={fullscreenclass ? "fullscreenplace_custom" : ""} onClick={handleNormalImage} />) : (<BsFullscreen className='fullscreenplace' id={fullscreenclass ? "fullscreenplace_custom" : ""} onClick={handleFullscreenImage} />)
        }

      </div>
      {/* </div> */}
    </div>
  )
}

export default GalleryCard
