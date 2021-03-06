import React, { useState } from 'react'
import { Box, Card, Text, Flex, Heading, Image } from 'theme-ui'
import List from './list'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styled from 'styled-components'

import UnderlineLoader from './UnderlineLoader'
import { useDisplayPNG } from 'Hooks/useDisplayPNG'
import { useTranslation } from 'Hooks/useTranslation'
import Button from 'components/Button'
import { color } from 'utils'

export default function PriceCard({
    data: {
        header,
        imgPNG,
        imgWebp,
        name,
        description,
        priceWithUnit,
        buttonText = 'Start Free Trial',
        buttonUri = '/studio',
        points
    },
    deliveryPrice,
    priceFresh,
    isLoadingPrices
}) {
    const { displayPNG } = useDisplayPNG()
    const { locale } = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const t = useTranslation()

    return (
        <Card className={header ? 'active' : null} sx={styles.packageBox}>
            {header && <Text sx={styles.header}>{t(header)}</Text>}
            {
                <Link href={buttonUri} locale={locale}>
                    <Image
                        // src={displayPNG ? imgPNG : imgWebp}
                        src={imgPNG}
                        alt={'item.title'}
                        // onClick={() => {
                        //   window.location = window.location.href + buttonUri;
                        // }}
                        style={{ cursor: 'pointer' }}
                    />
                </Link>
            }
            <Box>
                <Flex sx={styles.pricingHeader}>
                    <Flex1>
                        <Heading className="package__name" sx={styles.heading}>
                            {t(name)}
                        </Heading>
                        <Text
                            as="p"
                            sx={{
                                opacity: header ? 1 : 0.7,
                                color: header ? 'text' : 'white',
                                fontSize: [1, 2],
                                lineHeight: 1.3
                            }}
                        >
                            {t(description)}
                        </Text>
                    </Flex1>
                    <Flex1>
                        {isLoadingPrices ? (
                            <Text className="package__price" sx={styles.price}>
                                <span>{t('packages.priceFrom')}</span>
                                <div className="price">{priceFresh}</div>
                                <div className="deliveryPrice">{deliveryPrice}</div>
                            </Text>
                        ) : (
                            <CenteredText>...loading</CenteredText>
                        )}
                    </Flex1>
                </Flex>
                <List items={points} childStyle={styles.listItem} />
                <Box
                    sx={{
                        textAlign: 'center',
                        mt: ['40px', null, null, null, null, '70px']
                    }}
                >
                    <StyledButton
                        variant={header ? 'primary' : 'whiteButton'}
                        aria-label={t(buttonText)}
                        onClick={() => {
                            window.location = window.location.href + buttonUri
                            setIsLoading(true)
                        }}
                    >
                        <StyledText>
                            {t(buttonText)} {isLoading && <UnderlineLoader />}
                        </StyledText>
                    </StyledButton>
                </Box>
            </Box>
        </Card>
    )
}

const styles = {
    packageBox: {
        'flex': ['0 1 100%', null, null, '0 1 50%', '0 1 45%', '0 1 40%', '0 1 38.5%'],
        'background': 'rgba(255,255,255,0.1)',
        'borderRadius': 10,
        'ml': [0, null, null, 5],
        'position': 'relative',
        'mt': ['40px', null, null, 0],
        'p': ['50px 15px 50px', null, '62px 25px 50px 25px', null, '62px 70px 50px 40px'],
        '@media screen and (min-width: 420px) and (max-width: 767px)': {
            maxWidth: '380px'
        },
        '&:first-of-type': {
            ml: 0,
            mt: 0
        },
        '&.active': {
            'backgroundColor': 'white',
            '.package__name': {
                color: 'heading_secondary'
            },
            '.package__price > span': {
                color: 'text'
            },
            '.open': {
                color: 'text'
            },
            '.closed': {
                color: 'text',
                opacity: 0.6
            }
        }
    },
    header: {
        height: ['28px', null, null, null, '32px'],
        backgroundColor: '#EF9E48',
        borderRadius: '5px',
        fontWeight: 'bold',
        fontSize: '14px',
        lineHeight: '18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#FFFFFF',
        position: 'absolute',
        top: [3, null, 4],
        letterSpacing: '-.14px',
        px: '10px'
    },

    heading: {
        fontWeight: 'bold',
        fontSize: [4, null, null, null, 5],
        lineHeight: '23px',
        color: '#ffffff',
        marginBottom: [1, null, '12px']
    },
    pricingHeader: {
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        mb: ['35px', null, null, null, null, '50px']
    },
    price: {
        'fontWeight': 'bold',
        'fontSize': [4, null, 5, null, '26px'],
        'lineHeight': 1,
        'display': 'flex',
        'letterSpacing': '-0.5px',
        'color': '#0F2137',
        'marginBottom': 0,
        'flexWrap': 'wrap',
        'flexDirection': 'column',
        'textAlign': 'right',
        'mt': ['-3px', null, '2px'],
        '> span': {
            fontWeight: 'body',
            fontSize: [1, 2],
            lineHeight: 1.25,
            display: 'block',
            marginBottom: '10px',
            color: 'white'
        },
        '> .price': {
            'marginBottom': '5px',
            'color': 'secondary',
            '> sub': {
                position: 'relative',
                bottom: '6px'
            }
        },
        '> .deliveryPrice': {
            marginBottom: 0,
            color: 'muted',
            fontSize: [1, null, 2, null, '14px']
        }
    },
    listItem: {
        'fontStyle': 'normal',
        'fontWeight': 'normal',
        'fontSize': [1, null, null, null, 2],
        'lineHeight': [1.7, null, 1.65],
        'marginBottom': [3, '22px'],
        'alignItems': 'flex-start',
        'color': 'white',
        'pr': [2, null, null, null, 0, 6],
        '&.closed': {
            opacity: 0.55,
            button: {
                color: '#788FB5'
            }
        }
    }
}

const StyledButton = styled(Button)`
    pointer-events: all;
    background-color: rgb(239, 17, 67);
    color: white;
`

const StyledText = styled.p`
    display: inline-block;
    margin: 0;
    transform: translateX(0);
`

const Flex1 = styled.div`
    flex: 1;
`

const CenteredText = styled.p`
    width: 100%;
    text-align: center;
    color: ${color('secondary')};
`
