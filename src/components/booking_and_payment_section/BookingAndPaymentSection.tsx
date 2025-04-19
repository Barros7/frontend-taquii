"use client";
import { useState } from "react";
import "./BookingAndPaymentSection.css";
import { FaCalendarAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const horarios = {
  Manhã: ["08:00", "09:00", "10:00", "11:00"],
  Tarde: ["12:00", "13:00", "14:00", "15:00", "16:00", "17:00"],
  Noite: ["18:00", "19:00", "20:00", "21:00"],
};

const BookingAndPaymentSection = () => {
  const [data, setData] = useState("2024-01-10");
  const [horaSelecionada, setHoraSelecionada] = useState("");
  const [cliente, setCliente] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const [agenda, setAgenda] = useState<{ [key: string]: string }>({
    "11:00": "Ryan Dorwart",
    "13:00": "Livia Curtis",
    "14:00": "Randy Calzoni",
    "16:00": "Marley Franci",
    "17:00": "Jaylon Korsgaard",
    "21:00": "Maria Herwitz",
  });
  

  const handleAgendar = () => {
    if (horaSelecionada && cliente) {
      setAgenda({ ...agenda, [horaSelecionada]: cliente });
      setCliente("");
      setHoraSelecionada("");
    }
  };

  return (
    <section className="container">
      <div className="row">
        <div className="booking col-md-4">
          <h4 className="text-white">Agende um atendimento</h4>
          <p className="text-description">Selecione data, horário e informe o nome do cliente para criar o agendamento</p>
          <form>
            <div className="form-group">
              <div className="form-label text-white">Data</div>
              <div className="relative w-full max-w-sm border rounded-xl border-gray-700 bg-black p-2 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <FaCalendarAlt className="text-yellow-600" />
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="dd/MM/yyyy"
          className="bg-transparent text-gray-300 focus:outline-none cursor-pointer"
        />
      </div>
      <span className="text-gray-400">▼</span>
    </div>
            </div>
            <div>
              <div className="form-label mt-4 text-white">Horários</div>
              {Object.entries(horarios).map(([periodo, horas]) => (
                <div key={periodo}>
                    <span className="text-white text-period">{periodo}</span>
                    <div className="mb-3">
                        <div className="d-flex flex-wrap gap-2">
                            {horas.map((hora) => (
                                <button
                                    key={hora}
                                    onClick={() => setHoraSelecionada(hora)}
                                    disabled={!!agenda[hora]}
                                    className="button-time"
                                >
                                    {hora}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
              ))}x
            </div>
            <div className="mt-4">
                <div className="form-label mt-3 text-white">Serviços</div>
                <select className="form-select form-select-sm mb-3" aria-label="Small select example">
                    <option selected>Escolha o Serviço</option>
                    <option value="1">Pediatria</option>
                    <option value="2">Clinica Geral</option>
                    <option value="3">Ginecologia e Obstetrícia</option>
                    <option value="3">Urologia</option>
                </select>
            </div>
            <button className="btn btn-primary w-100" type="button">Agendar</button>
          </form>
        </div>
        <div className="schedule col-md-8">
          <h4>Sua agenda</h4>
          {Object.entries(horarios).map(([periodo, horas]) => (
            <div key={periodo}>
              <strong>{periodo}</strong>
              <ul>
                {horas.map((hora) => (
                  agenda[hora] && <li key={hora}>{hora} - {agenda[hora]}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BookingAndPaymentSection;
