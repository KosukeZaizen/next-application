import React from "react";
import { BLOB_URL } from "../../../../const/public";
import { getClasses } from "../../../../lib/css";
import { Img } from "../../../shared/Img";
import ShurikenProgress from "../../../shared/ShurikenProgress";

interface SpeakerProps {
    src: string;
    alt: string;
}
export class Speaker extends React.Component<
    SpeakerProps,
    {
        showImg: boolean;
    }
> {
    vocabSound?: HTMLAudioElement;
    didUnmount: boolean;

    constructor(props: SpeakerProps) {
        super(props);

        this.state = {
            showImg: false,
        };

        this.didUnmount = false;
    }

    componentDidMount = () => {
        this.loadSound();
    };

    loadSound = () => {
        const { src } = this.props;

        this.vocabSound = new Audio();
        this.vocabSound.preload = "none";
        this.vocabSound.autoplay = false;
        this.vocabSound.src = src;

        this.vocabSound.oncanplaythrough = () => {
            if (!this.didUnmount) this.setState({ showImg: true });
        };
        this.vocabSound.load();
    };

    componentWillUnmount() {
        this.didUnmount = true;
    }

    render() {
        const { alt } = this.props;
        const { showImg } = this.state;
        const { vocabSound } = this;
        return showImg ? (
            <button css={c.greenBtn} className="btn">
                <Img
                    alt={alt}
                    src={BLOB_URL + "/articles/img/speaker.png"}
                    containerStyle={c.img}
                    onClick={() => {
                        vocabSound && vocabSound.play();
                    }}
                    autoHeight
                />
            </button>
        ) : (
            <ShurikenProgress key="circle" size="100%" style={c.shuriken} />
        );
    }
}

const c = getClasses({
    greenBtn: { backgroundColor: "green", width: "20%", maxWidth: 70 },
    img: {
        cursor: "pointer",
        zIndex: 900,
    },
    shuriken: {
        width: "60%",
        maxWidth: 30,
    },
});
