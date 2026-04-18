import 'dotenv/config';
import app from './app';  

//Import routes here below 

//import database connection here as well 


const PORT = process.env.PORT || 5400;    

app.listen(PORT, () => { 
    console.log(`Server successfully running on http://localhost:${PORT}`) 
}); 

