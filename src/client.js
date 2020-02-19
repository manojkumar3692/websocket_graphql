import io from 'socket.io-client';
import React, { Component,useEffect, useState } from 'react';
import ReactDom from 'react-dom';
import { LineChart, Line, XAxis, YAxis, AreaChart, Area, linearGradient, defs,CartesianGrid  } from 'recharts';
const socket = io('http://localhost:3000',{
    transports: ['websocket','polling']
})



 const App = () => {

    const [data,setData] = useState([])

    useEffect(() => {
        socket.on('cpu',cpuPercent => {
            setData(currentData => [...currentData,cpuPercent])
        })
    },[]);

    return (
        <div style={{paddingTop: '2rem'}}>
            <AreaChart width={700} height={300} data={data}>
            <defs>
    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
    </linearGradient>
    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
    </linearGradient>
  </defs>
            <XAxis dataKey="name"/>
            <YAxis/>
            <CartesianGrid strokeDasharray="3 3" />
            <Area type="monotone" dataKey="value" stroke="#8884d8" fillOpacity={0.5} fill="#4568dc" />
            </AreaChart>
            <div>

              <h1>Github Api Data </h1>
            </div>
        </div>
    )

 }

ReactDom.render(<App/>,document.getElementById('root'))