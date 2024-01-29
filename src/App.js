import { useEffect, useState } from 'react';
import { AiOutlineDelete } from "react-icons/ai";
import './App.css';

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allEvents, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [eventDateTime, setEventDateTime] = useState(""); // Nueva variable para la fecha y hora del evento
  const [numToShow, setNumToShow] = useState(5);

  const handleAddEvent = () => {
    let newEventItem = {
      title: newEvent,
      description: newDescription,
      eventDateTime: new Date(eventDateTime).toISOString(), // Agrega la fecha y hora del evento
    };
    let updateEventArr = [...allEvents];
    updateEventArr.push(newEventItem);
    setEvents(updateEventArr);
    localStorage.setItem('eventlist', JSON.stringify(updateEventArr));
  };

  const handleDeleteEvent = (index) => {
    let reducedEvents = [...allEvents];
    reducedEvents.splice(index, 1);
    localStorage.setItem('eventlist', JSON.stringify(reducedEvents));
    setEvents(reducedEvents);
  };

  useEffect(() => {
    let savedEvent = JSON.parse(localStorage.getItem('eventlist'));
    if (savedEvent) {
      setEvents(savedEvent);
    }
  }, []);

  const filteredEvents = allEvents
    .filter((event) => {
      return isCompleteScreen ? event.completed : !event.completed;
    })
    .sort((a, b) => {
      return new Date(a.eventDateTime) - new Date(b.eventDateTime); // Ordena por fecha y hora del evento
    })
    .slice(0, numToShow);

  return (
    <div className='App'>
      <h1>My events</h1>
      <div className='events-wrapper'>
        <div className='events-input'>
          <div className='event-input-item'>
            <label>Title</label>
            <input type="text" value={newEvent} onChange={(e) => setNewEvent(e.target.value)} placeholder="Event title" />
          </div>
          <div className='event-input-item'>
            <label>Description</label>
            <input type="text" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} placeholder="Event description" />
          </div>
          <div className='event-input-item'>
            <label>Date and Time</label>
            <input type="datetime-local" value={eventDateTime} onChange={(e) => setEventDateTime(e.target.value)} placeholder="Chosse a date"/>
          </div>
          <div className='event-input-item'>
            <button type="button" onClick={handleAddEvent} className="primaryBtn">Add</button>
          </div>
        </div>

        <div className='btn-area'>
          <button className={`secondaryBtn ${!isCompleteScreen && 'active'}`} onClick={() => setIsCompleteScreen(false)}>In Comming</button>
        </div>

        <div className='event-list'>
          {filteredEvents.map((item, index) => (
            <div className='event-list-item' key={index}>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <p>Event Time: {new Date(item.eventDateTime).toLocaleString()}</p>
              </div>
              <div>
                <AiOutlineDelete className='icon' onClick={() => handleDeleteEvent(index)} title="Delete?" />
              </div>
            </div>
          ))}
        </div>
        <div>
          <label>Number of Events to Show:</label>
          <input
            type="number"
            value={numToShow}
            onChange={(e) => setNumToShow(e.target.value)}
            min="1"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
