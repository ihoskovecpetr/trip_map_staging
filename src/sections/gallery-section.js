/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Container, Grid } from 'theme-ui'
import Gallery from 'react-grid-gallery'
import { useIsMobile } from 'Hooks/useIsMobile'

import SectionHeader from '../components/section-header'
import { useTranslation } from 'Hooks/useTranslation'

const Italy_red = {
    src: 'https://res.cloudinary.com/dkyt8girl/image/upload/h_1200,c_scale/Finished%20Interiers/interier_italy_to3eh3.png',
    thumbnail:
        'https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/Finished%20Interiers/interier_italy_to3eh3.png',
    lazy: true
}

const Manhattan_bike = {
    src: 'https://res.cloudinary.com/dkyt8girl/image/upload/h_1200,c_scale/Finished%20Interiers/interier_bike_manhattan_efjydx.png',
    thumbnail:
        'https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/Finished%20Interiers/interier_bike_manhattan_efjydx.png'
}
const Manhattan_red = {
    src: 'https://res.cloudinary.com/dkyt8girl/image/upload/h_1200,c_scale/Finished%20Interiers/manhattan_interier_gtjmvf.png',
    thumbnail:
        'https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/Finished%20Interiers/manhattan_interier_gtjmvf.png'
}
const Boston = {
    src: 'https://res.cloudinary.com/dkyt8girl/image/upload/h_1200,c_scale/Finished%20Interiers/boston_interior_wqaik4.png',
    thumbnail:
        'https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/Finished%20Interiers/boston_interior_wqaik4.png'
}
const Germany = {
    src: 'https://res.cloudinary.com/dkyt8girl/image/upload/h_1200,c_scale/Finished%20Interiers/germany_interier_gbfpx0.png',
    thumbnail:
        'https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/Finished%20Interiers/germany_interier_gbfpx0.png'
}
const USA_white = {
    src: 'https://res.cloudinary.com/dkyt8girl/image/upload/h_1200,c_scale/Finished%20Interiers/sf_interier_cmicv0.png',
    thumbnail:
        'https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/Finished%20Interiers/sf_interier_cmicv0.png'
}

const Rio = {
    src: 'https://res.cloudinary.com/dkyt8girl/image/upload/h_1200,c_scale/Finished%20Interiers/rio_inteiror_pcyfvn.png',
    thumbnail:
        'https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/Finished%20Interiers/rio_inteiror_pcyfvn.png'
}

const Europe = {
    src: 'https://res.cloudinary.com/dkyt8girl/image/upload/h_1200,c_scale/Finished%20Interiers/europe_interier_yigx87.png',
    thumbnail:
        'https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/Finished%20Interiers/europe_interier_yigx87.png'
}

const usa_orange = {
    src: 'https://res.cloudinary.com/dkyt8girl/image/upload/h_1200,c_scale/Finished%20Interiers/west_coast_interier_reg6xp.png',
    thumbnail:
        'https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/Finished%20Interiers/west_coast_interier_reg6xp.png'
}

const Germany_raw = {
    src: 'https://res.cloudinary.com/dkyt8girl/image/upload/h_1200,c_scale/Finished%20Interiers/tikgnbf0tbpbwr7gvgur_j7vd3t.png',
    thumbnail:
        'https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/Finished%20Interiers/tikgnbf0tbpbwr7gvgur_j7vd3t.png'
}

const SF_raw = {
    src: 'https://res.cloudinary.com/dkyt8girl/image/upload/h_1200,c_scale/Finished%20Interiers/rwghzpbzg2y0zopelixq_zl7ycj.png',
    thumbnail:
        'https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/Finished%20Interiers/rwghzpbzg2y0zopelixq_zl7ycj.png'
}

const Boston_raw = {
    src: 'https://res.cloudinary.com/dkyt8girl/image/upload/h_1200,c_scale/Finished%20Interiers/wlp3foetpovddrayv8lg_mkwacc.png',
    thumbnail:
        'https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/Finished%20Interiers/wlp3foetpovddrayv8lg_mkwacc.png'
}

const Rio_raw = {
    src: 'https://res.cloudinary.com/dkyt8girl/image/upload/h_1200,c_scale/Finished%20Interiers/vjhinvhzjn899ggmzump_kp1qod.png',
    thumbnail:
        'https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/Finished%20Interiers/vjhinvhzjn899ggmzump_kp1qod.png'
}

const Iceland_raw = {
    src: 'https://res.cloudinary.com/dkyt8girl/image/upload/h_1200,c_scale/Finished%20Interiers/uglvlfai2fq8lchme4wp_buypfb.png',
    thumbnail:
        'https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/Finished%20Interiers/uglvlfai2fq8lchme4wp_buypfb.png'
}

const Italy_raw = {
    src: 'https://res.cloudinary.com/dkyt8girl/image/upload/h_1200,c_scale/Finished%20Interiers/gf1jm14plchoamspzptk_xgbgnn.png',
    thumbnail:
        'https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/Finished%20Interiers/gf1jm14plchoamspzptk_xgbgnn.png'
}

const HK_raw = {
    src: 'https://res.cloudinary.com/dkyt8girl/image/upload/h_1200,c_scale/Finished%20Interiers/odeeqtbwvf1b1q1f39yx_voqcxk.png',
    thumbnail:
        'https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/Finished%20Interiers/odeeqtbwvf1b1q1f39yx_voqcxk.png'
}

const USA_orange_raw = {
    src: 'https://res.cloudinary.com/dkyt8girl/image/upload/h_1200,c_scale/Finished%20Interiers/ngpzm691vxwhi5d0rhsy_vze8oz.png',
    thumbnail:
        'https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/Finished%20Interiers/ngpzm691vxwhi5d0rhsy_vze8oz.png'
}

const Europe_raw = {
    src: 'https://res.cloudinary.com/dkyt8girl/image/upload/h_1200,c_scale/Finished%20Interiers/itudrg12doxje12oesok_nl1ute.png',
    thumbnail:
        'https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/Finished%20Interiers/itudrg12doxje12oesok_nl1ute.png'
}

const Japan_raw = {
    src: 'https://res.cloudinary.com/dkyt8girl/image/upload/h_1200,c_scale/Finished%20Interiers/d6adrdzjq3qwe9u5miud_xjymcg.png',
    thumbnail:
        'https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/Finished%20Interiers/d6adrdzjq3qwe9u5miud_xjymcg.png'
}

const Manhattan_raw = {
    src: 'https://res.cloudinary.com/dkyt8girl/image/upload/h_1200,c_scale/Finished%20Interiers/lqnhdmlihoa7pi3juwtd_ojfoli.png',
    thumbnail:
        'https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/Finished%20Interiers/lqnhdmlihoa7pi3juwtd_ojfoli.png'
}

const USA_white_raw = {
    src: 'https://res.cloudinary.com/dkyt8girl/image/upload/h_1200,c_scale/Finished%20Interiers/p7uqqjlidnycsdlbpibv_afzbms.png',
    thumbnail:
        'https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/Finished%20Interiers/p7uqqjlidnycsdlbpibv_afzbms.png'
}

const imagesArr = [
    Boston,
    Boston_raw,
    Japan_raw,
    usa_orange,
    USA_orange_raw,
    Italy_red,
    Italy_raw,
    Manhattan_bike,
    Manhattan_raw,
    Germany,
    Germany_raw,
    Manhattan_red,
    USA_white,
    USA_white_raw,
    Rio,
    Rio_raw,
    Europe,
    Europe_raw,
    SF_raw,
    Iceland_raw,
    HK_raw
]

const imagesWithOptions = imagesArr.map(image => ({
    ...image
    // thumbnailHeight: 124,
    // thumbnailWidth: 250,
}))

export default function KeyFeature() {
    const { isMobile } = useIsMobile()
    const t = useTranslation()

    return (
        <section sx={{ variant: 'section.keyFeature' }} id="feature">
            <Container sx={styles.containerThemUI}>
                <SectionHeader slogan={t('gallery.subtitle')} title={t('gallery.title')} />
                <Grid sx={styles.gridCenter}>
                    <Gallery
                        images={imagesWithOptions}
                        backdropClosesModal={true}
                        rowHeight={isMobile ? 120 : 180}
                        thumbnailImageComponent={({ imageProps }) => <img {...imageProps} loading="lazy" />}
                    />
                </Grid>
            </Container>
        </section>
    )
}

const styles = {
    containerThemUI: {
        px: [0, null, null, '40px', null, '80px']
    },
    grid: {
        'px': [0, null, null, '40px', null, '80px'],
        'pt': [0, null, null, null, null, null, null, 3],
        'gridGap': ['35px 0', null, '40px 0'],
        'gridTemplateColumns': ['repeat(1,1fr)', null, 'repeat(2,1fr)', null, 'repeat(3,1fr)'],
        'width': ['100%', '80%', '100%'],
        'mx': 'auto',
        '& > div': {
            px: [0, '15px', null, '25px', null, '30px', '40px', '60px']
        }
    },
    gridCenter: {
        width: ['100%', '100%', '100%'],
        // px: [null, null, null, "40px", null, "80px"],
        overflow: 'hidden'
    }
}
