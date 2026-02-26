import { Composition } from "remotion";
import { VN_Automation, VNIntro, VNOutro } from "./channels/vn-automation/Main";
import { Global_AI, GlobalIntro, GlobalOutro } from "./channels/global-ai/Main";

export const MyVideoRoot: React.FC = () => {
    return (
        <>
            {/* VN Samples */}
            <Composition
                id="VN-Intro-Sample"
                component={VNIntro}
                durationInFrames={480}
                fps={24}
                width={1920}
                height={1080}
            />
            <Composition
                id="VN-Outro-Sample"
                component={VNOutro}
                durationInFrames={600}
                fps={24}
                width={1920}
                height={1080}
            />

            {/* Global Samples */}
            <Composition
                id="Global-Intro-Sample"
                component={GlobalIntro}
                durationInFrames={480}
                fps={24}
                width={1920}
                height={1080}
            />
            <Composition
                id="Global-Outro-Sample"
                component={GlobalOutro}
                durationInFrames={600}
                fps={24}
                width={1920}
                height={1080}
            />

            {/* Full Versions (Giữ lại nếu bạn cần) */}
            <Composition
                id="VN-Automation-Full"
                component={VN_Automation}
                durationInFrames={12633}
                fps={24}
                width={1920}
                height={1080}
            />
            <Composition
                id="Global-AI-Full"
                component={Global_AI}
                durationInFrames={15211}
                fps={24}
                width={1920}
                height={1080}
            />
        </>
    );
};
