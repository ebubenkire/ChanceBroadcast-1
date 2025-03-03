import { useState, useEffect, useRef } from 'react';
import { streamingService } from '../services/streamingService';
import './Streaming.css';

const Streaming = () => {
  const [streams, setStreams] = useState([]);
  const [selectedStream, setSelectedStream] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [viewers, setViewers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    const fetchStreams = async () => {
      try {
        const data = await streamingService.getLiveStreams();
        setStreams(data);
      } catch (err) {
        setError(err.response?.data?.msg || 'Failed to load streams');
      } finally {
        setLoading(false);
      }
    };

    fetchStreams();

    // Cleanup on unmount
    return () => {
      if (selectedStream) {
        streamingService.leaveStream(selectedStream._id);
      }
      streamingService.disconnect();
    };
  }, []);

  useEffect(() => {
    if (selectedStream) {
      // Join stream and set up socket listeners
      streamingService.joinStream(selectedStream._id, (updatedViewers) => {
        setViewers(updatedViewers);
      });

      streamingService.onChatMessage((message) => {
        setChatMessages((prev) => [...prev, message]);
      });

      streamingService.onViewerUpdate((updatedViewers) => {
        setViewers(updatedViewers);
      });
    }
  }, [selectedStream]);

  useEffect(() => {
    // Auto-scroll chat to bottom
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleStreamSelect = async (stream) => {
    if (selectedStream) {
      streamingService.leaveStream(selectedStream._id);
    }
    setSelectedStream(stream);
    setChatMessages([]);
    
    try {
      const streamData = await streamingService.getStream(stream._id);
      setChatMessages(streamData.chat);
      setViewers(streamData.viewers);
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to load stream data');
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim() || !selectedStream) return;

    streamingService.sendChatMessage(selectedStream._id, messageInput);
    setMessageInput('');
  };

  if (loading) return <div className="loading">Loading streams...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="streaming-container">
      <div className="streams-list">
        <h2>Live Streams</h2>
        {streams.map((stream) => (
          <div
            key={stream._id}
            className={`stream-item ${selectedStream?._id === stream._id ? 'active' : ''}`}
            onClick={() => handleStreamSelect(stream)}
          >
            <img src={stream.thumbnail} alt={stream.title} />
            <div className="stream-info">
              <h3>{stream.title}</h3>
              <p>{stream.description}</p>
              <span className="viewer-count">
                {stream.viewers.length} watching
              </span>
            </div>
          </div>
        ))}
      </div>

      {selectedStream && (
        <div className="stream-view">
          <div className="video-container">
            {/* Add your video player component here */}
            <iframe
              src={selectedStream.streamUrl}
              title={selectedStream.title}
              allowFullScreen
            ></iframe>
          </div>

          <div className="chat-container">
            <div className="chat-messages" ref={chatContainerRef}>
              {chatMessages.map((msg, index) => (
                <div key={index} className="chat-message">
                  <span className="username">{msg.user.name}:</span>
                  <span className="message">{msg.message}</span>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="chat-input">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Type a message..."
              />
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Streaming; 