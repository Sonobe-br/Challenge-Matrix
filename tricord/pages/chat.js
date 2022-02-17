import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import { ButtonSendSticker } from '../src/Componentes/ButtonSendSticker';
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/router'; 
import appConfig from '../config.json';
import React from 'react';

// Como fazer AJAX: https://medium.com/@omariosouto/entendendo-como-fazer-ajax-com-a-fetchapi-977ff20da3c6
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzMxMDg5OCwiZXhwIjoxOTU4ODg2ODk4fQ.6-BY7f9a-5Vqa87K4Z-B-PrPzNelNOEPeiRKhXjh9kM';
const SUPABASE_URL = 'https://kxftkbecsmitbmdwmpmn.supabase.co';
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function getRealTimeChat(adicionaMensagem) {
    return supabaseClient
      .from('mensagens')
      .on('INSERT', (respostaLive) => {
        adicionaMensagem(respostaLive.new);
        console.log('Houve uma nova mensagem', respostaLive)
      })
      .subscribe();
    }

  

export default function ChatPage() {
    const roteamento = useRouter();
    const usuarioLogado = roteamento.query.username;
   
    const [mensagem, setMensagem] = React.useState('');
    const [listaDeMensagens, setListaDeMensagens] = React.useState([]);
    
    //back-end
    React.useEffect(() => {
        supabaseClient
            .from('mensagens')
            .select('*')
            .order('id', { ascending: false })
            .then(({ data }) => { 
        
                console.log('Dados da consulta: ', data);
                setListaDeMensagens(data);    

            }); 
            
            const subscription = getRealTimeChat((novaMensagem) => {
                console.log('Nova mensagem:', novaMensagem);
                console.log('listaDeMensagens:', listaDeMensagens);
                // Quero reusar um valor de referencia (objeto/array) 
                // Passar uma função pro setState
          
                // setListaDeMensagens([
                //     novaMensagem,
                //     ...listaDeMensagens
                // ])
                setListaDeMensagens((valorAtualDaLista) => {
                  console.log('valorAtualDaLista:', valorAtualDaLista);
                  return [
                    novaMensagem,
                    ...valorAtualDaLista,
                  ]
                });
            });
          
            return () => {
            subscription.unsubscribe();
            }
            
            getRealTimeChat((novaMensagem) => {
                console.log('Nova Mensagem:', novaMensagem);
                setListaDeMensagens(() => {
                    return[
                        novaMensagem,
                        ...listaDeMensagens,
                    ]
                    
                });
            });
        }, []);
        

    function handleNovaMensagem(novaMensagem) {
        const mensagem = {
            /* id: listaDeMensagens.length + 1, */
            de: usuarioLogado,
            texto: novaMensagem,
        };

        supabaseClient
            .from('mensagens')
            .insert([
                // tem que ser um objeto com os MESMOS CAMPOS escritos no supabase
                mensagem
            ])
            .then(({ data }) => {

                console.log('Criando mensagem: ', data);

            });


        setMensagem('');
    }

    return (
        
        <Box
            
            styleSheet={{
            
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[100],
                backgroundImage: `url(https://scwcontent.affino.com/AcuCustom/Sitename/DAM/025/Mars2.jpeg)`,
                //backgroundImage: `url(https://wallpaperaccess.com/full/2881108.jpg)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
                
            }}
        >
            <Box
                
                styleSheet={{
                    position: 'relative',
                    left: '-26px',    
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[900],

                    opacity: 0.9,
                    height: '100%',
                    maxWidth: '55%',
                    maxHeight: '70vh',
                    padding: '32px',
                
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    
                    }}
                
                >
               <MessageList mensagens = {listaDeMensagens} />
                    {/* I'm a bot, how can I help you? {mensagem} */}

                  {/*  {listaDeMensagens.map((mensagemAtual) => {
                        return (
                            <li key={mensagemAtual.id}>
                                {mensagemAtual.de}: {mensagemAtual.texto}
                            </li>
                        )
                    })}  */} 

                    <Box
                        as="form"
                        styleSheet={{
                           
                            display: 'flex',
                            alignItems: 'center',
                        
                        }}

                    >
                        <TextField
                            value = {mensagem}
                            onChange = {(event) => {
                                const valor = event.target.value;        
                                setMensagem(valor);

                            }}

                            //função responsavél pelo 'enter' do teclado    
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault();
                                    handleNovaMensagem(mensagem);
                                    
                                    console.log(event);
                                }

                            }} 
                            
                            
                            placeholder="Enter your message..."
                            type="textarea"
                           
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}

                        />

                     
                          {/*   onMessageClick = {() => {
                                console.log('Nova mensagem:', novaMensagem);
                                console.log('listaDeMensagens:', listaDeMensagens);
                            }}  */}
                            
                     
                                
                        {/* <button name = "button" addEventListener="alert('Enviar')" class="enviar_msn"> Enviar </button> */}
                        
                 
                        <ButtonSendSticker 
                            onStickerClick = {(sticker) => {
                                console.log('[USANDO UM COMPONENTE] Manda este sticker para o back-end', sticker);
                                handleNovaMensagem(':sticker:' + sticker); 
                            
                            }}
                        />

                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box 
                styleSheet={{ 
                    width: '100%', 
                    marginBottom: '16px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between' 
                }} 
            
            > 
            
                <Text variant='heading5'>Chat</Text>
        
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
                
            </Box>
        </>
    );
}


function MessageList(props) {
    console.log(props);
    return (  
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        
        >

            {props.mensagens.map((mensagem) => {
                return (
                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                            backgroundColor: appConfig.theme.colors.neutrals[700],
                            },
                        }}
                        >
                        <Box
                            styleSheet={{
                             marginBottom: '8px',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/${mensagem.de}.png`}
                            />

                            <Text tag="strong">
                                {mensagem.de}
                            </Text>
                            
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[300],
                                }}

                                tag="span"

                            >

                                {(new Date().toLocaleDateString())}
                            </Text>
                        
                        {/* <button onclick="alert()" class="tecla_deletar"> Deletar </button> */}

                        </Box>
                        {/* Condicional: {mensagem.texto.startsWith(':sticker:').toString()} */}
                        {mensagem.texto.startsWith(':sticker:') 
                        
                            ? (
                                <Image src = {mensagem.texto.replace(':sticker:', '')} />
                            )
                            : (
                                mensagem.texto
                            )}        

                        {/* {mensagem.texto} */}

                    </Text>
            
                );
                
            })}

        </Box>
    )
}