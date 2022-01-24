function GlobalStyle(){

  return(

    <style globaljsx>{`
    
      * {

        background: black;

      }

    `}</style>
  )

}



function Title(props) {

  console.log(props);
  const Tag = props.tag;
  return (

    <>
      <Tag>{props.children}</Tag>
     
      <style jsx>{`

        ${Tag} {

          color: red;
          font-size: 24px;
          font-weight: 600;

        }

      `}</style>

    </>

  );

}

//componente React
function HomePage() {
  
  return (
    //JSX
    <div>
      
      <GlobalStyle></GlobalStyle>
      <Title tag="h2">Boas vindas de volta!</Title>
      <h2>Discord - Sonobe Matrix</h2>
  
    </div>

  ); 
  
}

export default HomePage