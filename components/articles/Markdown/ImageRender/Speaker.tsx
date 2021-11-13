import React from "react";
import { BLOB_URL } from "../../../../const/public";
import { getClasses } from "../../../../lib/css";
import { CenterImg } from "../../../shared/Img";
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
            if (!this.didUnmount) {
                this.setState({ showImg: true });
            }
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

        if (showImg) {
            return (
                <button
                    css={c.greenBtn}
                    className="btn"
                    onClick={() => {
                        vocabSound && vocabSound.play();
                    }}
                >
                    <CenterImg
                        alt={alt}
                        src={BLOB_URL + "/articles/img/speaker.png"}
                    />
                </button>
            );
        }
        return <ShurikenProgress key="circle" size={40} style={c.shuriken} />;
    }
}

const c = getClasses({
    greenBtn: {
        backgroundColor: "green",
        width: "20%",
        maxWidth: 70,
        minWidth: 40,
        minHeight: 40,
        padding: 5,
        cursor: "pointer",
        zIndex: 900,
    },
    shuriken: {
        width: "60%",
        maxWidth: 40,
    },
});
