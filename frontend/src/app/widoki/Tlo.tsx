import { Container } from "@mui/material"
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { Engine } from "tsparticles-engine";

interface Props {
    amount?: number;
}

export default function Tlo({amount = 30}: Props) {

    const particlesInit = async (main:Engine) => {
        console.log(main);
        await loadFull(main);
    };

    return (
        <Container>
            <Particles
                id="tsparticles"
                init={particlesInit}

                options={{
                    "fullScreen": {
                        "enable": true,
                        "zIndex": -1
                    },
                    "detectRetina": true,
                    "fpsLimit": 120,
                    "interactivity": {
                        "events": {
                            "onClick": {
                                "enable": true,
                                "mode": "push"
                            },
                            "onDiv": {
                                "elementId": "repulse-div",
                                "enable": false,
                                "mode": "repulse"
                            },
                            "onHover": {
                                "enable": true,
                                "mode": "bubble",
                                "parallax": {
                                    "enable": false,
                                    "force": 60,
                                    "smooth": 10
                                }
                            },
                            "resize": true
                        },
                        "modes": {
                            "bubble": {
                                "distance": 400,
                                "duration": 2,
                                "opacity": 0.8,
                                "size": 40,
                                "speed": 3
                            },
                            "connect": {
                                "distance": 80,
                                "lineLinked": {
                                    "opacity": 0.5
                                },
                                "radius": 60
                            },
                            "grab": {
                                "distance": 400,
                                "lineLinked": {
                                    "opacity": 1
                                }
                            },
                            "push": {
                                "quantity": 4
                            },
                            "remove": {
                                "quantity": 2
                            },
                            "repulse": {
                                "distance": 200,
                                "duration": 0.4
                            }
                        }
                    },
                    "particles": {
                        "color": {
                            "value": "#ffffff"
                        },
                        "lineLinked": {
                            "blink": false,
                            "color": "#000",
                            "consent": false,
                            "distance": 150,
                            "enable": false,
                            "opacity": 0.4,
                            "width": 1
                        },
                        "move": {
                            "attract": {
                                "enable": false,
                                "rotate": {
                                    "x": 600,
                                    "y": 1200
                                }
                            },
                            "bounce": false,
                            "direction": "none",
                            "enable": true,
                            "outMode": "out",
                            "random": false,
                            "speed": 2,
                            "straight": false
                        },
                        "number": {
                            "density": {
                                "enable": true,
                                "area": 800
                            },
                            "limit": 0,
                            "value": amount
                        },
                        "opacity": {
                            "animation": {
                                "enable": true,
                                "minimumValue": 0.2,
                                "speed": 1,
                                "sync": false
                            },
                            "random": true,
                            "value": 1
                        },
                        "rotate": {
                            "animation": {
                                "enable": true,
                                "speed": 5,
                                "sync": false
                            },
                            "direction": "random",
                            "random": true,
                            "value": 0
                        },
                        "shape": {
                            "character": {
                                "fill": false,
                                "font": "Verdana",
                                "style": "",
                                "value": "*",
                                "weight": "400"
                            },
                            "image": [
                                {
                                    "src": "https://particles.js.org/images/fruits//apple.png",
                                    "width": 32,
                                    "height": 32
                                },
                                {
                                    "src": "https://particles.js.org/images/fruits//avocado.png",
                                    "width": 32,
                                    "height": 32
                                },
                                {
                                    "src": "https://particles.js.org/images/fruits//banana.png",
                                    "width": 32,
                                    "height": 32
                                },
                                {
                                    "src": "https://particles.js.org/images/fruits//berries.png",
                                    "width": 32,
                                    "height": 32
                                },
                                {
                                    "src": "https://particles.js.org/images/fruits//cherry.png",
                                    "width": 32,
                                    "height": 32
                                },
                                {
                                    "src": "https://particles.js.org/images/fruits//grapes.png",
                                    "width": 32,
                                    "height": 32
                                },
                                {
                                    "src": "https://particles.js.org/images/fruits//lemon.png",
                                    "width": 32,
                                    "height": 32
                                },
                                {
                                    "src": "https://particles.js.org/images/fruits//orange.png",
                                    "width": 32,
                                    "height": 32
                                },
                                {
                                    "src": "https://particles.js.org/images/fruits//peach.png",
                                    "width": 32,
                                    "height": 32
                                },
                                {
                                    "src": "https://particles.js.org/images/fruits//pear.png",
                                    "width": 32,
                                    "height": 32
                                },
                                {
                                    "src": "https://particles.js.org/images/fruits//pepper.png",
                                    "width": 32,
                                    "height": 32
                                },
                                {
                                    "src": "https://particles.js.org/images/fruits//plum.png",
                                    "width": 32,
                                    "height": 32
                                },
                                {
                                    "src": "https://particles.js.org/images/fruits//star.png",
                                    "width": 32,
                                    "height": 32
                                },
                                {
                                    "src": "https://particles.js.org/images/fruits//strawberry.png",
                                    "width": 32,
                                    "height": 32
                                },
                                {
                                    "src": "https://particles.js.org/images/fruits//watermelon.png",
                                    "width": 32,
                                    "height": 32
                                },
                                {
                                    "src": "https://particles.js.org/images/fruits//watermelon_slice.png",
                                    "width": 32,
                                    "height": 32
                                }
                            ],
                            "polygon": {
                                "sides": 5
                            },
                            "stroke": {
                                "color": "#000000",
                                "width": 0
                            },
                            "type": "image"
                        },
                        "size": {
                            "animation": {
                                "enable": false,
                                "minimumValue": 0.1,
                                "speed": 40,
                                "sync": false
                            },
                            "random": false,
                            "value": 16
                        }
                    },
                    "polygon": {
                        "draw": {
                            "enable": false,
                            "lineColor": "#ffffff",
                            "lineWidth": 0.5
                        },
                        "move": {
                            "radius": 10
                        },
                        "scale": 1,
                        "type": "none",
                        "url": ""
                    },
                    "background": {
                        "color": "#fff",
                        "image": "",
                        "position": "50% 50%",
                        "repeat": "no-repeat",
                        "size": "cover"
                    
                
                    }
                }}/>
        </Container>
        
    )
}