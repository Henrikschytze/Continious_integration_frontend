'use strict';

var novicell = novicell || {};

novicell.pageheaderVideoFullscreen =
    novicell.pageheaderVideoFullscreen ||
    new function () {
        this.init = function () {
            if (screenWidth()) {
                const fullscreenBackground = document.querySelector(".background-fullscreen");
                const vimeoIframeList = document.querySelector(".vimeo__iframe") || false;
                const youtubeIframeList = document.querySelector(".youtube__iframe-wrapper") || false;
                if (vimeoIframeList) {
                    const vimeoId = vimeoIframeList.dataset.vimeoid;
                    const fullUrl = `https://player.vimeo.com/video/${vimeoId}?autoplay=1&loop=1&color=000000&title=0&byline=0&portrait=0&muted=1&controls=0&background=1`;
                    const shortUrl = `https://vimeo.com/${vimeoId}`;
                    validateVimeoId(shortUrl)
                        .then(response => {
                            // Regardless of outcome, remove the ajax loader
                            removeAjaxLoader(fullscreenBackground);
                            if (response === 200) {
                                // Load video if the vimeo id exists
                                vimeoIframeList.src = fullUrl;
                            } else {
                                // If bad status, we remove the iframe and add the fallback BG image
                                fullscreenBackground.style.backgroundImage = `url(${fullscreenBackground.dataset.backgroundImage})`;
                                vimeoIframeList.remove();
                            }
                        }).catch(err => console.log(err));
                }
                if (youtubeIframeList) {
                    let player;
                    let videoStart = 0;
                    let youtubeid = youtubeIframeList.dataset.youtubeid;
                    let tag = document.createElement("script");
                    tag.src = "https://www.youtube.com/player_api";
                    let lastScriptTag = document.getElementsByTagName("script")[
                        document.getElementsByTagName("script").length - 1
                    ];
                    lastScriptTag.parentNode.insertBefore(tag, lastScriptTag);
                    this.onPlayerReady = function (event) {
                        event.target.mute();
                        event.target.seekTo(videoStart);
                        removeAjaxLoader(fullscreenBackground);
                    };
                    this.onErrorResponse = function (event) {
                        // In case of bad response, kill the player and add the background image.
                        // Currently, the url for the BG image is stored on the background-fullscreen wrapper itself.
                        // An alternative would be having a css class added that holds a background image attribute and the path value already, and simply append the classname to the element
                        fullscreenBackground.style.backgroundImage = `url(${fullscreenBackground.dataset.backgroundImage})`;
                        event.target.destroy();
                        removeAjaxLoader(fullscreenBackground);
                    };
                    this.onYouTubeFullscreenIframeAPIReady = function () {
                        player = new YT.Player(youtubeIframeList, {
                            videoId: youtubeid,
                            playerVars: {
                                autoplay: 1,
                                autohide: 1,
                                loop: 1,
                                // Playlist is required, otherwise the video refuses to loop for some reason
                                playlist: youtubeid,
                                modestbranding: 1,
                                rel: 0,
                                controls: 0,
                                disablekb: 1,
                                enablejsapi: 0,
                                iv_load_policy: 3
                            },
                            events: {
                                onReady: novicell.pageheaderVideoFullscreen.onPlayerReady,
                                onError: novicell.pageheaderVideoFullscreen.onErrorResponse
                            }
                        });
                    };
                    window.addEventListener(
                        "load",
                        function () {
                            novicell.pageheaderVideoFullscreen.onYouTubeFullscreenIframeAPIReady();
                        },
                        true
                    );
                }
            }
        };
    }();


function screenWidth() {
    return window.screen.width > 768;
}
// Function for removing the loader that runs during iframe fetches
function removeAjaxLoader(element) {
    element.classList.remove("background-fullscreen--inactive");
}
// Function for checking vimeo validity
function validateVimeoId(url) {
    let options = {
        method: 'GET'
    };
    return fetch(`https://vimeo.com/api/oembed.json?url=${encodeURIComponent(url)}`, options)
        .then((response) => {
            if (response.status === 200) {
                return response.status;
            } else {
                throw Error(`Bad response: ${response.status}`);
            }
        })
        .catch(err => console.log(err));
}
