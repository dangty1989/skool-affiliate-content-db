import { Series, AbsoluteFill, staticFile, Video, spring, useCurrentFrame, useVideoConfig, Audio, interpolate, Sequence } from "remotion";

const NeonTitle: React.FC<{ text: string; color: string; subText?: string }> = ({ text, color, subText }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const scale = spring({ frame, fps });
    const opacity = spring({ frame: frame - 10, fps, config: { damping: 200 } });

    return (
        <div style={{ textAlign: "center", transform: `scale(${scale})` }}>
            <h1 style={{
                color: color,
                fontSize: 90,
                fontFamily: "Arial",
                fontWeight: "900",
                textShadow: `0 0 20px ${color}`,
                margin: 0
            }}>
                {text}
            </h1>
            {subText && (
                <h2 style={{
                    color: "white",
                    fontSize: 40,
                    fontFamily: "Arial",
                    opacity: opacity,
                    fontWeight: "300",
                    marginTop: 20
                }}>
                    {subText}
                </h2>
            )}
        </div>
    );
};

const CyberBackground: React.FC<{ src: string }> = ({ src }) => {
    return (
        <AbsoluteFill>
            <img
                src={staticFile(src)}
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                }}
            />
            {/* Overlay một lớp đen mờ để text nổi bật */}
            <AbsoluteFill style={{ background: "rgba(0,0,0,0.4)" }} />
        </AbsoluteFill>
    );
};

const BreathingVideo: React.FC<{ src: string }> = ({ src }) => {
    const frame = useCurrentFrame();
    const scale = interpolate(
        Math.sin(frame / 100),
        [-1, 1],
        [1, 1.05]
    );

    return (
        <div style={{ width: "100%", height: "100%", transform: `scale(${scale})` }}>
            <Video
                src={src}
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
        </div>
    );
};

const CTAOverlay: React.FC<{ text: string; color: string }> = ({ text, color }) => {
    const frame = useCurrentFrame();

    // Xuất hiện mỗi 60 giây (1440 frames)
    const cycle = 1440;
    const localFrame = frame % cycle;

    const slide = spring({
        frame: localFrame,
        fps: 24,
        config: { damping: 20 },
    });

    const exit = spring({
        frame: localFrame - 200, // Biến mất sau ~8 giây
        fps: 24,
        config: { damping: 20 },
    });

    const x = interpolate(slide - exit, [0, 1], [100, 0]);

    return (
        <div style={{
            position: "absolute",
            bottom: 50,
            right: 50,
            transform: `translateX(${x}%)`,
            backgroundColor: "white",
            padding: "15px 30px",
            borderRadius: 15,
            borderLeft: `8px solid ${color}`,
            boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
            display: localFrame < 300 ? "block" : "none" // Chỉ hiện trong ~12s đầu mỗi chu kỳ
        }}>
            <span style={{ fontSize: 28, fontWeight: "bold", fontFamily: "Arial", color: "#333" }}>
                {text}
            </span>
        </div>
    );
};

export const VNIntro: React.FC = () => {
    return (
        <AbsoluteFill style={{ backgroundColor: "black" }}>
            <Sequence durationInFrames={480}>
                <Sequence from={24}>
                    <Audio
                        src={staticFile("audio/intro-vn.mp3")}
                        volume={1}
                    />
                </Sequence>
                <CyberBackground src="images/intro-bg-vn.png" />
                <AbsoluteFill style={{
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <NeonTitle text="CỖ MÁY TỰ ĐỘNG HÓA" color="#FFD700" subText="CHÀO MỪNG BẠN QUAY TRỞ LẠI" />
                </AbsoluteFill>
            </Sequence>
        </AbsoluteFill>
    );
};

export const VNOutro: React.FC = () => {
    return (
        <AbsoluteFill style={{ backgroundColor: "black" }}>
            <Sequence durationInFrames={600}>
                <Sequence from={36}>
                    <Audio
                        src={staticFile("audio/outro-vn.mp3")}
                        volume={1}
                    />
                </Sequence>
                <CyberBackground src="images/intro-bg-vn.png" />
                <AbsoluteFill style={{
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <NeonTitle text="GIA NHẬP CỘNG ĐỒNG" color="#FFD700" subText="LINK DƯỚI PHẦN MÔ TẢ" />
                </AbsoluteFill>
            </Sequence>
        </AbsoluteFill>
    );
};

export const VN_Automation: React.FC = () => {
    return (
        <AbsoluteFill style={{ backgroundColor: "black" }}>
            <Series>
                {/* Intro 20s @ 24fps = 480 frames */}
                <Series.Sequence durationInFrames={480}>
                    <VNIntro />
                </Series.Sequence>

                {/* Main Content (8m 01s @ 24fps = 11553 frames) */}
                <Series.Sequence durationInFrames={11553}>
                    <BreathingVideo src={staticFile("video/Cuộc_Cách_Mạng_Tự_Động_Hóa_AI.mp4")} />
                    <CTAOverlay text="🎁 Quy trình Miễn Phí - Link dưới Mô tả & Bình luận" color="#FFD700" />
                </Series.Sequence>

                {/* Outro 25s @ 24fps = 600 frames */}
                <Series.Sequence durationInFrames={600}>
                    <VNOutro />
                </Series.Sequence>
            </Series>
        </AbsoluteFill>
    );
};
