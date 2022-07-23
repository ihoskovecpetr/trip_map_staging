/** @jsx jsx */
import { jsx, Container, Flex } from 'theme-ui'
import SectionHeader from 'components/section-header'
import PatternBG from 'assets/patternBG.png'
import styled from 'styled-components'
import { useTranslation } from 'Hooks/useTranslation'
import useIntersectionObserver from '@react-hook/intersection-observer'

export default function VideoFull() {
    const t = useTranslation()

    return (
        <section id="packages" sx={styles.packages}>
            <Container>
                <SectionHeader slogan={t('videoFull.subtitle')} title={t('videoFull.title')} isWhite={true} />
                <Flex
                    sx={{
                        justifyContent: 'center',
                        flexWrap: ['wrap', null, null, 'nowrap']
                    }}
                >
                    <VideoContainer>
                        <IFrameWrap>
                            <StyledIFrame
                                frameBorder="0"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                loading="lazy"
                                src="https://www.youtube.com/embed/KelrjOJTALA?&mute=1" //autoplay=1 TODO: autoplay when scrolled into the view
                            />
                        </IFrameWrap>
                    </VideoContainer>
                </Flex>
            </Container>
        </section>
    )
}

const styles = {
    packages: {
        'backgroundColor': 'primary',
        'backgroundImage': `url(${PatternBG})`,
        'backgroundRepeat': `no-repeat`,
        'backgroundPosition': 'center center',
        'backgroundSize': 'cover',
        'py': [8, null, 9, null, null, 10],
        'position': 'relative',
        '&::before': {
            // position: "absolute",
            // content: '""',
            // top: 0,
            // right: 0,
            // background:
            //   "linear-gradient(-45deg, rgba(42,72,125, 0.3) 25%, transparent 25%, transparent 50%, rgba(42,72,125, 0.3) 50%, rgba(42,72,125, 0.3) 75%, transparent 75%, transparent)",
            // width: "100%",
            // backgroundSize: "350px 350px",
            // height: "100%",
            // opacity: 0.3,
            // zIndex: 0,
        }
    }
}

const VideoContainer = styled.div`
    width: 100%;
    height: auto;
`

const IFrameWrap = styled.div`
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
`

const StyledIFrame = styled.iframe`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`
