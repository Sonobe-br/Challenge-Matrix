import React from 'react';
import { Box, Button, Text, Image } from '@skynexui/components';
import appConfig from '../../config.json';

export function ButtonSendSticker(props) {
  const [isOpen, setOpenState] = React.useState('');

  return (
    <Box
      styleSheet={{
        position: 'relative',
      }}
    >
      <Button
        styleSheet={{
          position: 'relative',
          borderRadius: '8%',
          padding: '0 3px 0 0',
          minWidth: '43px',
          minHeight: '43px',
          fontSize: '20px',
          marginBottom: '8px',
          lineHeight: '0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.neutrals[300],
          filter: isOpen ? 'grayscale(0)' : 'grayscale(1)',
          hover: {
            filter: 'grayscale(0)',
          }
        }}
        label="🪐"
        onClick={() => setOpenState(!isOpen)} //lógica do botão dos stickers 

      />

      
      {isOpen && (
        <Box
          styleSheet={{
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '5px',
            position: 'absolute',
            backgroundColor: appConfig.theme.colors.neutrals[500],
            width: {
              xs: '200px',
              sm: '290px',
            },
            height: '310px',
            right: '5px',
            bottom: '30px',
            padding: '16px',
            boxShadow: 'rgba(4, 4, 5, 0.15) 0px 0px 0px 1px, rgba(0, 0, 0, 0.24) 0px 8px 16px 0px',
          }}
          onClick={() => setOpenState(false)}
        >
          <Text // texto dos stickers
            styleSheet={{
              color: appConfig.theme.colors.neutrals["000"],
              fontWeight: 'bold',
            }}
          >
            Stickers
          </Text>
          <Box
            tag="ul"
            styleSheet={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              flex: 1,
              paddingTop: '8px',
              overflow: 'scroll',
            }}
          >


            {/* REVISÃO DO CÓDIGO A PARTIR DAQUI */}
            {appConfig.stickers.map((sticker) => (
              <Text
                onClick={() => {
                  /* console.log('[DENTRO DO COMPONENTE] Clicou no sticker:', sticker); */
                  if (Boolean(props.onStickerClick)) {
                    props.onStickerClick(sticker);
                  }
                }}

                tag="li" key={sticker}
                styleSheet={{
                  width: '50%',
                  borderRadius: '5px',
                  padding: '10px',
                  focus: {
                    backgroundColor: appConfig.theme.colors.neutrals[600],
                  },
                  hover: {
                    backgroundColor: appConfig.theme.colors.neutrals[600],
                  }
                }}
              >
                <Image src={sticker} />
              </Text>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  )
}