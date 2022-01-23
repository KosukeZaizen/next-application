import React from "react";
import { LazyLoad } from "../../../../shared/LazyLoad";
import { SoundLoader } from "../../../../shared/Sound/SoundLoader";

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
            showControl: false,
            isLoadingStarted: false,
        };

        this.refAudio = React.createRef();
    }

    componentDidMount() {
        if (!this.refAudio) return;

        const audio = this.refAudio.current;
        void audio?.load();
    }

    render() {
        const { audioPath, style } = this.props;
        const { isLoadingStarted } = this.state;

        return (
            <>
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
                            height: "30px",
                            marginTop: "5px",
                            ...style,
                        }}
                    />
                )}
                <LazyLoad>
                    <SoundLoader
                        load={() => {
                            this.setState({ startLoading: true });
                        }}
                    />
                </LazyLoad>
            </>
        );
    }
}
