import React from "react";
import { LazyExecutor } from "../../../shared/LazyLoad";
import CircularProgress from "@material-ui/core/CircularProgress";

type AudioControlProps = {
    audioPath: string;
    style?: React.CSSProperties;
};
export class AudioControl extends React.Component<AudioControlProps> {
    refAudio: React.RefObject<HTMLAudioElement>;
    state: { showControl: boolean; isLoadingStarted: boolean };

    constructor(props: AudioControlProps) {
        super(props);

        this.state = {
            showControl: true, // iPhoneで表示されない問題のため、trueから開始
            isLoadingStarted: false,
        };

        this.refAudio = React.createRef();
    }

    componentDidMount() {
        if (!this.refAudio) return;

        const audio = this.refAudio.current;
        void audio?.load();
    }

    load = () => {
        this.setState({ isLoadingStarted: true });
    };

    render() {
        const { audioPath, style } = this.props;
        const { isLoadingStarted } = this.state;

        return (
            <div style={{ position: "relative", textShadow: "none" }}>
                {isLoadingStarted ? (
                    <audio
                        ref={this.refAudio}
                        src={audioPath}
                        css={{
                            width: "100%",
                            height: "30px",
                            marginTop: "5px",
                            opacity: this.state.showControl ? 1 : 0,
                            transition: "1s",
                            ...style,
                        }}
                        onCanPlayThrough={() => {
                            this.setState({ showControl: true });
                        }}
                        controls
                    />
                ) : (
                    <div
                        css={{
                            width: "100%",
                            height: "35px",
                            marginTop: "5px",
                            ...style,
                        }}
                    />
                )}
                {!this.state.showControl && (
                    <div
                        css={{
                            width: "100%",
                            height: "35px",
                            marginTop: "5px",
                            position: "absolute",
                            top: 0,
                            ...style,
                        }}
                    >
                        <CircularProgress size="30px" />
                    </div>
                )}
                <LazyExecutor fnc={this.load} />
            </div>
        );
    }
}
