import {createServer} from 'http';
import app from './src/app.js';

// Create a server object
const server = createServer(app);
 /*   
  //console.log(query)
  //console.log(pathname)
  //console.log(method);
  //console.log(url)

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // definicao de preflit
  if (method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  let db = [];
  // Set the response HTTP header with HTTP status and Content type
  if(method === 'POST' && pathname === '/'){
    
    let body = '';
    try{
          req.on('data', chunck =>{
        body += chunck.toString()
      });

      req.on('end', ()=>{
        const dado = JSON.parse(body)
        
        console.log('db1:', dado.file);
        
      })
       
      res.writeHead(201,{'content-Type': 'text/plain'});
      res.end('Dados foram salvos com sucesso!');
    }catch(err){
      res.writeHead(400,{'Content-Type': 'text/plain'});
      res.end('Erro ao salvar dados!')
    }

  };
  
  if(method === "GET" && pathname === "/rx"){
    
    const obj = Object.fromEntries(query);
    const nid = obj.nid;
    //console.log(obj.nid)
    //console.log(nid)
    
    try{
      const result =  await findDB(nid);
      if(!result.status){
        res.writeHead(400,{'content-type':'text/plain'});
        res.end('Resultado não encontra');
        return;
      }
        
      res.writeHead(200,{'content-type':'text/plain'});
      res.end(result.user.file)
      //console.log(result)
       
    }catch(err){
      console.log('err:', err.message)
    }
    
  }*/

// Define the port to listen on const PORT = 3000;
const PORT = 3000;
// Start the server and listen on the specified port
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});