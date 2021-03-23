import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'

function users(props) {
  
  const langHandler = () =>{
    props.setLang( props.lang === "en" ? "fr" : "en") 
  }
  return (
    <div >
      <Head>
        <title>Abou | Users</title>
        <meta name="description" content={`this page for listing name of the 10 users`} />
      </Head>

      <main>

       

        {props.serverProps.map((user)=>{
          return (
         
            <div className={""} key={user.id}>
              <Link href={`/users/user/${user.id}`}>
                <a>{user.name}</a>
              </Link>
            </div>
        
          )
        })}
        
        <br/>
        
        

      </main>

    
    </div>
  )
}


export async function getServerSideProps() {
  // Fetch data from external API
  const res = await axios.get("https://jsonplaceholder.typicode.com/users")
  const data = await res.data

  // Pass data to the page via props
  return { props: { serverProps : data } }
}
export default users;