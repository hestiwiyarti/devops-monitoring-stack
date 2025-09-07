import express from "express";
import client from "prom-client";

const app = express();
const register = new client.Registry();
client.collectDefaultMetrics({ register });

const httpRequestCounter = new client.Counter({
  name: "http_requests_total",
  help: "Total HTTP requests",
  labelNames: ["method","route","status"],
});
register.registerMetric(httpRequestCounter);

const httpDuration = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "HTTP request duration",
  labelNames: ["method","route","status"],
  buckets: [0.05,0.1,0.2,0.5,1,2]
});
register.registerMetric(httpDuration);

app.use((req,res,next)=>{
  const end = httpDuration.startTimer({ method:req.method, route:req.path });
  res.on("finish", ()=>{
    const labels = { method:req.method, route:req.path, status:String(res.statusCode) };
    httpRequestCounter.inc(labels);
    end({ status:String(res.statusCode) });
  });
  next();
});

app.get("/", (req,res)=> res.json({message:"Hello from portfolio app"}));
app.get("/healthz", (req,res)=> res.status(200).send("ok"));
app.get("/metrics", async (req,res)=> {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`App listening on :${port}`));
