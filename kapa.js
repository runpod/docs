const script = document.createElement("script");
script.src = "https://widget.kapa.ai/kapa-widget.bundle.js";
script.async = true;
script.setAttribute("data-website-id", "d8e25089-cadd-4c1c-9010-7e83cd99a2a5");
script.setAttribute("data-project-name", "Runpod");
script.setAttribute("data-project-color", "#070D27");
script.setAttribute("data-button-image-width", 30);
script.setAttribute("data-button-image-height", 30);
script.setAttribute("data-font-family", "Inter");
script.setAttribute("data-modal-title-font-weight", "600");

// v1 (white/black)
// script.setAttribute("data-project-logo", "https://raw.githubusercontent.com/runpod/docs/51f96638ad16845f314e140d93ea55f33876fc43/logo/icon_square.svg",);
// script.setAttribute("data-button-bg-color", "#F3F3F3");
// script.setAttribute("data-button-hover-bg-color", "#FFFFFF");
// script.setAttribute("data-button-text-color", "#19181E");
// script.setAttribute("data-button-text-shadow", "0px 0px 0px 0px");
// script.setAttribute("data-button-border", "1px solid #E1E1E5");

// v2 (purple/white)
script.setAttribute("data-project-logo", "https://raw.githubusercontent.com/runpod/docs/c29473974f2eb4162345d634a5b443db34781660/logo/icon_square_white.svg",);
script.setAttribute("data-button-bg-color", "#5D29F0");
script.setAttribute("data-button-hover-bg-color", "#AE6DFF");
script.setAttribute("data-button-text-color", "#FFFFFF");
script.setAttribute("data-button-text-shadow", "0px 0px 0px 0px");
script.setAttribute("data-button-border", "0px solid #E1E1E5");
script.setAttribute("data-modal-header-bg-color", "#5D29F0");
script.setAttribute("data-modal-title-color", "#FFFFFF");

document.head.appendChild(script);