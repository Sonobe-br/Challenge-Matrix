import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import { useEffect, useState } from 'react';
import defaultImage from '../img/imagemDefault4.png';
import{ useRouter } from 'next/router'; //sistema de roteamento do Next
import appConfig from '../config.json';
import React from 'react';

function Titulo(props) {

  console.log(props);
  const Tag = props.tag || "h1";
  return (

    <>
      <Tag>{props.children}</Tag>

      <style jsx>{`

        ${Tag} {

          color: ${appConfig.theme.colors.neutrals['000']};
          font-size: 24px;
          font-weight: 600;

        }

      `}</style>

    </>

  );

}

//componente React
/* function HomePage() {
  
  return (
    //JSX
    <div>
      
      <GlobalStyle></GlobalStyle>
      <Titulo tag="h2">Boas vindas de volta!</Titulo>
      <h2>Discord - SKYNET</h2>
  
    </div>

  ); 
  
}

export default HomePage */

export default function PaginaInicial() {
  //const username = 'sonobe-br';
  const [username, setUsername] = React.useState(''); //deixando a array sempre vazia para o login
  const user = username.length > 2 ? username : '';
  const [name, setName] = useState('');
  const [counter, setCounter] = useState(0);

  const root = useRouter();
  /* o setUsername e o useRouter é um hook do Next */

  let timer = null; // variavel para armazenar nosso timer

  useEffect(() => {
    
    user ? fetch(`https://api.github.com/users/${user}`)
    .then(response => response.json())
    .then(data => setName(data.name)) : setName('');

  }, [counter]);
  
  return (

    <>
      
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.primary[98],
          backgroundImage: 'url(https://assets-eu-01.kc-usercontent.com/80e06f8f-fc39-0158-c90c-a3da02f900f2/1fdb2b65-723a-4d75-ad81-155a235201fe/Earth%20from%20space%20title.jpg)',
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
         
        }} 
        
      >

      <Box
        styleSheet={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          
          flexDirection: {
            xs: 'column',
            sm: 'row',
          },
          //caixa de login
          width: '100%', maxWidth: '700px',
          borderRadius: '5px', padding: '32px', margin: '16px',
          boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
          backgroundColor: appConfig.theme.colors.neutrals[700],
          
        }}

      >

      {/* Formulário */}
      <Box
        as="form"
        onSubmit = { function(infosDoEvento) {
        infosDoEvento.preventDefault();  
          if(name){

            root.push(`/chat?username=${username}`);
          
          } else {
          
            root.push(`/`);
          
          }
         /*  infosDoEvento.preventDefault();  
          console.log('Alguém submeteu o form');
          roteamento.push(`/chat?username = ${username}`); */ /* >>> sistema de roteamento do Next que corrigiu o detalhe de reloaded da página */
          
          /* window.location.href = '/chat'; */
          
        }} 
        
        styleSheet = {{
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
        }}
        
      >

      <Titulo tag="h2">Welcome to Spacial Chat</Titulo>
      <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
      {appConfig.name}
      </Text>

      {/*   <input
        type="text"
        value = {username}
        onChange = {function (eventInfo){
          
        console.log('O usuário digitou', eventInfo.target.value);
        
        const valor = eventInfo.target.value;
        setUsername(valor);
          
        }}
        
      /> */}
        
          <TextField
            placeholder="Enter your Github login 🐈 ..." 
            value = {username}
            onChange = {function (eventInfo){   
              console.log('O usuário digitou', eventInfo.target.value);
              const valor = eventInfo.target.value;
              setUsername(valor);
              // limpando a função timer 
              clearTimeout(timer);
              //guardando o timer  
              timer = setTimeout(function () {
                setCounter(counter + 1)
              }, 2000);
            
            }}
          
            fullWidth
            textFieldColors={{
              neutral: {
                textColor: appConfig.theme.colors.neutrals[200],
                mainColor: appConfig.theme.colors.neutrals[900],
                mainColorHighlight: appConfig.theme.colors.primary[500],
                backgroundColor: appConfig.theme.colors.neutrals[800],
              },
            }}
          />
      
          <Button
            type='submit'
            label='Enter'
            fullWidth
            buttonColors={{
              contrastColor: appConfig.theme.colors.neutrals["000"],
              mainColor: appConfig.theme.colors.primary[500],
              mainColorLight: appConfig.theme.colors.primary[400],
              mainColorStrong: appConfig.theme.colors.primary[600],
            }}
          />
      
      </Box>
      
      {/* Formulário */}

      {/* Photo Area */}
      
      <Box
        styleSheet={{ 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: '200px',
          padding: '15px',
          backgroundColor: appConfig.theme.colors.neutrals[800],
          border: '1px solid',
          borderColor: appConfig.theme.colors.neutrals[999],
          borderRadius: '5px',
          flex: 1,
          minHeight: '240px',
        }}
        
        >
        
        <Image
      
          styleSheet={{
            maxWidth: '180px',
            borderRadius: '4%',
            marginBottom: '16px',
            minHeight: '162px',
          
          }}

          src={name ? `https://github.com/${user}.png` : defaultImage.src}
      
        />

        <Text

          variant="body4"
            styleSheet={{

              color: appConfig.theme.colors.neutrals[300],
              backgroundColor: appConfig.theme.colors.neutrals[900],
              padding: '3px 10px',
              borderRadius: '1200px'
              
            }}
        >     
          {/* texto abaixo do png */}
          {!user ? ' 🤖 Skynet 🤖 ' : name ? name : user}

        </Text>

            </Box>

            {/* Photo Area */}
           {/* código do Theme/Color 500 green - config.json = #3F9142 */}
      
        </Box>
      
      </Box>

    </>
  );
}