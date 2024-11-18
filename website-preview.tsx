import React, { useState } from 'react';
import { Camera, Menu, X } from 'lucide-react';

const WebsitePreview = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About Me', id: 'about' },
    { name: 'Resume', id: 'resume' },
    { name: 'Projects', id: 'projects' },
    { name: 'Game', id: 'game' },
    { name: 'Discovery', id: 'discovery' },
    { name: 'Contact', id: 'contact' }
  ];

  const HomePage = () => (
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <div className="w-48 h-48 mx-auto mb-6 rounded-full bg-gray-200 flex items-center justify-center">
          <Camera size={48} className="text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold mb-4 text-blue-800">Welcome to My Website!</h2>
        <p className="text-gray-600">Hi, I'm Max Rossiter, a student at the University of Minnesota Duluth. I'm passionate about technology and innovation, always eager to learn and create something new.</p>
      </div>
      <div className="bg-gray-100 p-6 rounded-lg">
        <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg flex items-center justify-center">
          <Camera size={48} className="text-gray-400" />
        </div>
      </div>
    </div>
  );

  const AboutPage = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold mb-4 text-blue-800">About Me</h3>
        <p className="text-gray-600 mb-4">I'm a Computer Science student passionate about technology and its potential to make a positive impact. When I'm not coding, you can find me exploring the beautiful trails around Duluth or working on photography projects.</p>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-gray-100 p-4 rounded">
            <div className="h-32 bg-gray-200 rounded mb-2 flex items-center justify-center">
              <Camera size={32} className="text-gray-400" />
            </div>
            <p className="text-sm text-gray-600">Photography</p>
          </div>
          <div className="bg-gray-100 p-4 rounded">
            <div className="h-32 bg-gray-200 rounded mb-2 flex items-center justify-center">
              <Camera size={32} className="text-gray-400" />
            </div>
            <p className="text-sm text-gray-600">Rock Climbing</p>
          </div>
          <div className="bg-gray-100 p-4 rounded">
            <div className="h-32 bg-gray-200 rounded mb-2 flex items-center justify-center">
              <Camera size={32} className="text-gray-400" />
            </div>
            <p className="text-sm text-gray-600">Coding</p>
          </div>
        </div>
      </div>
    </div>
  );

  const ResumePage = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-blue-800">Resume</h3>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Download PDF</button>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-bold mb-2">Education</h4>
            <div className="mb-4">
              <p className="font-semibold">University of Minnesota Duluth</p>
              <p className="text-gray-600">Bachelor of Science in Computer Science</p>
              <p className="text-gray-600">Expected Graduation: May 2025</p>
              <p className="text-gray-600">GPA: 3.8/4.0</p>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-2">Experience</h4>
            <div className="mb-4">
              <p className="font-semibold">Web Development Intern</p>
              <p className="text-gray-600">Local Tech Solutions, Duluth, MN</p>
              <p className="text-gray-600">June 2023 - August 2023</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const GamePage = () => {
    const [gameState, setGameState] = useState({
      score: 0,
      level: 1,
      health: 100,
      currentQuestion: null,
      gameStarted: false,
      showFeedback: false,
      feedback: { text: '', explanation: '' }
    });

    const questions = [
      {
        question: "What does HTML stand for?",
        options: [
          "Hyper Text Markup Language",
          "High Tech Modern Language",
          "Hyper Transfer Markup Language",
          "Hybrid Text Making Language"
        ],
        correct: 0,
        explanation: "HTML (Hyper Text Markup Language) is the standard markup language for creating web pages."
      },
      {
        question: "Which programming language is known as the 'language of the web'?",
        options: [
          "Python",
          "Java",
          "JavaScript",
          "C++"
        ],
        correct: 2,
        explanation: "JavaScript is widely known as the 'language of the web' because it's the primary language used for client-side web development."
      },
      {
        question: "What is the time complexity of binary search?",
        options: [
          "O(n)",
          "O(log n)",
          "O(n²)",
          "O(1)"
        ],
        correct: 1,
        explanation: "Binary search has a time complexity of O(log n) because it divides the search interval in half with each step."
      }
    ];

    const startGame = () => {
      setGameState({
        ...gameState,
        gameStarted: true,
        health: 100,
        score: 0,
        level: 1,
        currentQuestion: questions[Math.floor(Math.random() * questions.length)],
        showFeedback: false
      });
    };

    const checkAnswer = (selectedIndex) => {
      const isCorrect = selectedIndex === gameState.currentQuestion.correct;
      
      setGameState({
        ...gameState,
        score: isCorrect ? gameState.score + (10 * gameState.level) : gameState.score,
        health: isCorrect ? gameState.health : gameState.health - 20,
        showFeedback: true,
        feedback: {
          text: isCorrect ? "Correct!" : "Incorrect.",
          explanation: gameState.currentQuestion.explanation
        }
      });

      setTimeout(() => {
        if (gameState.health <= 20) {
          setGameState({
            ...gameState,
            gameStarted: false,
            showFeedback: false
          });
        } else {
          setGameState(prev => ({
            ...prev,
            currentQuestion: questions[Math.floor(Math.random() * questions.length)],
            showFeedback: false
          }));
        }
      }, 2000);
    };

    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Tech Trivia Challenge</h2>
          <p className="mb-6">Test your knowledge of technology and computer science with this AI-powered quiz game!</p>
          
          {!gameState.gameStarted ? (
            <div className="text-center">
              <button 
                onClick={startGame}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
              >
                Start Game
              </button>
            </div>
          ) : (
            <div>
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span>Score: {gameState.score}</span>
                  <span>Level: {gameState.level}</span>
                </div>
                <div className="w-full h-4 bg-gray-200 rounded-full">
                  <div 
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${gameState.health}%`,
                      backgroundColor: gameState.health > 50 ? '#4CAF50' : 
                                    gameState.health > 20 ? '#FFC107' : '#F44336'
                    }}
                  />
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold mb-4">{gameState.currentQuestion.question}</h3>
                <div className="space-y-2">
                  {gameState.currentQuestion.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => !gameState.showFeedback && checkAnswer(index)}
                      className="w-full text-left p-3 rounded border hover:bg-blue-50 transition-colors"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {gameState.showFeedback && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="font-bold mb-2">{gameState.feedback.text}</p>
                  <p>{gameState.feedback.explanation}</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <h3 className="text-xl font-bold mb-4">How to Play</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Answer technology-related questions correctly to score points</li>
            <li>Each correct answer increases your score and may level you up</li>
            <li>Wrong answers decrease your health bar</li>
            <li>The game ends when your health reaches zero</li>
            <li>Questions get harder as you progress through levels</li>
          </ul>
        </div>
      </div>
    );
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'about':
        return <AboutPage />;
      case 'resume':
        return <ResumePage />;
      case 'game':
        return <GamePage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <header className="bg-blue-800 text-white fixed w-full top-0 z-50">
        <nav className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold">Max Rossiter</h1>
            
            {/* Mobile menu button */}
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Desktop navigation */}
            <ul className="hidden md:flex space-x-6">
              {navLinks.map(link => (
                <li key={link.id}>
                  <button 
                    onClick={() => setCurrentPage(link.id)}
                    className={`hover:text-blue-200 ${currentPage === link.id ? 'text-blue-200' : ''}`}
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile navigation */}
          {menuOpen && (
            <ul className="md:hidden py-4">
              {navLinks.map(link => (
                <li key={link.id}>
                  <button 
                    onClick={() => {
                      setCurrentPage(link.id);
                      setMenuOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-2 hover:bg-blue-700 ${currentPage === link.id ? 'bg-blue-700' : ''}`}
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </nav>
      </header>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 pt-24 pb-16">
        {renderPage()}
      </main>

      {/* Footer */}
      <footer className="bg-blue-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; 2024 Max Rossiter. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-blue-200">
                <Camera size={24} />
              </a>
              <a href="#" className="hover:text-blue-200">
                <Camera size={24} />
              </a>
              <a href="#" className="hover:text-blue-200">
                <Camera size={24} />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Music player */}
      <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4">
        <audio controls className="w-48">
          <source src="#" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
};

export default WebsitePreview;