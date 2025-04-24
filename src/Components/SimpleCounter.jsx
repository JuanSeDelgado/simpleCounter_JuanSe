import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';

function SimpleCounter() {

    const [isRunning, setIsRunning] = useState(true);

    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);


    const startTimer = () => setIsRunning(true);
    const stopTimer = () => setIsRunning(false);
    const resetTimer = () => {
        setIsRunning(false);
        setSeconds(0);
        setMinutes(0);
        setHours(0);
    };

    useEffect(() => {

        if (!isRunning) return;

        const interval = setInterval(() => {
            setSeconds((prevSeconds) => {
                if (prevSeconds === 59) {
                    setMinutes((prevMinutes) => {
                        if (prevMinutes === 59) {
                            setHours((prevHours) => (prevHours + 1) % 24); // Actualizar horas y reiniciar
                        }
                        return (prevMinutes + 1) % 60; // Si llega a 60 minutos, reinicia a 0
                    });
                    return 0; // Si llega a 60 segundos, reinicia a 0
                }
                return prevSeconds + 1; // Incrementar segundos
            });
        }, 1000); // Actualiza cada segundo
        return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
    }, [isRunning]);

    const digitOne = seconds % 10; // Unidades de segundos
    const digitTwo = Math.floor(seconds / 10); // Decenas de segundos
    const digitThree = minutes % 10; // Unidades de minutos
    const digitFour = Math.floor(minutes / 10); // Decenas de minutos
    const digitFive = hours % 10; // Unidades de horas
    const digitSix = Math.floor(hours / 10); // Decenas de horas

    return (
        <>
            <div className="container-fluid bg-dark rounded p-4" style={{ width: "100vh" }}>
                <div className="d-inline-flex justify-content-center gap-3 p-3">
                    <div className="card bg-primary d-flex justify-content-center align-items-center" style={{ width: "80px", height: "120px" }}>
                        <FontAwesomeIcon icon={faClock} size="2xl" style={{ color: "#ffffff", width: "40px", height: "60px" }} />
                    </div>
                    <div className="card bg-secondary justify-content-center align-items-center fs-3" style={{ width: "80px", height: "120px" }}>{digitSix}</div>
                    <div className="card bg-secondary justify-content-center align-items-center fs-3" style={{ width: "80px", height: "120px" }}>{digitFive}</div>
                    <div className="card bg-secondary justify-content-center align-items-center fs-3" style={{ width: "80px", height: "120px" }}>{digitFour}</div>
                    <div className="card bg-secondary justify-content-center align-items-center fs-3" style={{ width: "80px", height: "120px" }}>{digitThree}</div>
                    <div className="card bg-secondary justify-content-center align-items-center fs-3" style={{ width: "80px", height: "120px" }}>{digitTwo}</div>
                    <div className="card bg-secondary justify-content-center align-items-center fs-3" style={{ width: "80px", height: "120px" }}>{digitOne}</div>
                </div>
                <div className="d-flex justify-content-center gap-3 mt-3">
                    <button className="btn btn-success" onClick={startTimer}>Start</button>
                    <button className="btn btn-danger" onClick={stopTimer}>Stop</button>
                    <button className="btn btn-secondary" onClick={resetTimer}>Reset</button>
                </div>
            </div>
        </>
    );
}


export default SimpleCounter;