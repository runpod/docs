const script = document.createElement("script");
script.src = "https://widget.kapa.ai/kapa-widget.bundle.js";
script.async = true;
script.setAttribute("data-website-id", "5b21ac2d-dd52-41f2-b02b-cd82467e45cc");
script.setAttribute("data-project-name", "RunPod");
script.setAttribute("data-project-color", "#070D27");
// script.setAttribute("data-project-logo", "https://raw.githubusercontent.com/runpod/docs/refs/heads/main/og-icon-trim.svg",);
script.setAttribute("data-button-image-width", 30);
script.setAttribute("data-button-image-height", 30);

// v1
// script.setAttribute("data-project-logo", "https://raw.githubusercontent.com/runpod/docs/51f96638ad16845f314e140d93ea55f33876fc43/logo/icon_square.svg",);
// script.setAttribute("data-button-bg-color", "#F3F3F3");
// script.setAttribute("data-button-hover-bg-color", "#FFFFFF");
// script.setAttribute("data-button-text-color", "#19181E");
// script.setAttribute("data-button-text-shadow", "0px 0px 0px 0px");
// script.setAttribute("data-button-border", "1px solid #E1E1E5");

// v2
script.setAttribute("data-project-logo", "https://raw.githubusercontent.com/runpod/docs/22268d7d3adb48de47dd22a72f554c9aff9b9971/logo/icon_square_white.svg",);
script.setAttribute("data-button-bg-color", "#5D29F0");
script.setAttribute("data-button-hover-bg-color", "#AE6DFF");
script.setAttribute("data-button-text-color", "#FFFFFF");
script.setAttribute("data-button-text-shadow", "0px 0px 0px 0px");
script.setAttribute("data-button-border", "0px solid #E1E1E5");
// script.setAttribute("data-button-hover-border", "1px solid rgb(7, 7, 7)");
script.setAttribute("data-modal-header-bg-color", "#5D29F0");
script.setAttribute("data-modal-title-color", "#FFFFFF");
// script.setAttribute("data-button-hover-border", "#5D29F0");

document.head.appendChild(script);