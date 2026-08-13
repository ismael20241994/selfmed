import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import routes from './routes/userRoutes.js';

const app = express();
app.use(express.json());
app.use(helmet());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});


app.use(express.urlencoded({extended: true}));
app.use("/uploads", express.static("uploads"));
app.use(cors({
  origin: function (origin, callback){
    const allowed = ['http://localhost:5174',
      'http://192.168.43.132:5174',
      'https://selfmed.online'
    ];
    
    if(!origin || allowed.includes(origin)){
      callback(null, true);
    }else{
      calback(new Error('Não autorizado pelo CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use('/api',(routes));
    



export default app;