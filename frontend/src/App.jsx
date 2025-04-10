import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import './ZapCard.css'; // <- importar nuevo estilo

const socket = io('http://localhost:7777');

export default function App() {
    const [zaps, setZaps] = useState([]);

    useEffect(() => {
        fetch('http://localhost:7777/api/zaps')
            .then(res => res.json())
            .then(data => setZaps(data));

        socket.on('new_zap', (zap) => {
            setZaps(prev => [zap, ...prev]);
        });

        return () => socket.disconnect();
    }, []);

    return (
        <div className="container">
            <h1 className="title">⚡ Zaps en tiempo real</h1>
            {zaps.map((zap, index) => (
                <div key={index} className="zap-card">
                    <div className="user-name">{zap.user}</div>
                    <div className="amount">{zap.amount} sats</div>
                    <div className="comment">{zap.comment}</div>
                    <div className="event">{zap.event}</div>
                    <div className="timestamp">{new Date(zap.timestamp).toLocaleString()}</div>
                </div>
            ))}
        </div>
    );
}
